const { prepareFlexFunction, extractStandardResponse, twilioExecute } = require(Runtime.getFunctions()[
  'common/helpers/function-helper'
].path);

const requiredParameters = [
  {
    key: 'operation',
    purpose: 'One of Add, Disable, Delete & Overwrite',
  },
  {
    key: 'workerSid',
    purpose: 'WKxxx sid for worker API',
  },
  {
    key: 'skills',
    purpose: 'list of skills with associated value',
  },
];

const dedupeList = (strList) => {
  return [...(strList || [])].reduce((acc, current) => {
    const x = acc.find((item) => item === current);
    if (!x) {
      return acc.concat([current]);
    }
    return acc;
  }, []);
};

const subtractList = (strList, removeList) => {
  return [...(strList || [])].filter((x) => removeList.indexOf(x) === -1);
};

const subtractObjectKeys = (orig, removeObj) => {
  const newObj = { ...orig };
  for (const k of Object.keys(removeObj)) {
    delete newObj[k];
  }
  return newObj;
};

const extractObject = (orig, extractionObj) => {
  const newObj = {};
  for (const k of Object.keys(extractionObj)) {
    if (orig[k]) {
      newObj[k] = orig[k];
    } else {
      newObj[k] = extractionObj[k];
    }
  }
  return newObj;
};

const updateSkills = (operation, prevRouting, prevDisabled, regularSkills, multiValueSkills) => {
  const updatedRouting = { ...prevRouting };
  const updatedDisabled = { ...prevDisabled };

  if (operation === 'Add') {
    updatedRouting.skills = dedupeList([...updatedRouting.skills, ...regularSkills, ...Object.keys(multiValueSkills)]);
    updatedRouting.levels = {
      ...updatedRouting.levels,
      ...multiValueSkills,
    };
    updatedDisabled.skills = subtractList(updatedDisabled.skills, regularSkills);
    updatedDisabled.levels = subtractObjectKeys(updatedDisabled.levels, multiValueSkills);
  } else if (operation === 'Disable') {
    updatedRouting.skills = subtractList(updatedRouting.skills, [...regularSkills, ...Object.keys(multiValueSkills)]);
    updatedDisabled.skills = dedupeList([
      ...updatedDisabled.skills,
      ...regularSkills,
      ...Object.keys(multiValueSkills),
    ]);
    updatedDisabled.levels = {
      ...updatedDisabled.levels,
      ...extractObject(updatedRouting.levels, multiValueSkills),
    };
    updatedRouting.levels = subtractObjectKeys(updatedRouting.levels, multiValueSkills);
  } else if (operation === 'Delete') {
    updatedRouting.skills = subtractList(updatedRouting.skills, [...regularSkills, ...Object.keys(multiValueSkills)]);
    updatedDisabled.skills = subtractList(updatedDisabled.skills, [...regularSkills, ...Object.keys(multiValueSkills)]);
    updatedRouting.levels = subtractObjectKeys(updatedRouting.levels, multiValueSkills);
    updatedDisabled.levels = subtractObjectKeys(updatedDisabled.levels, multiValueSkills);
  } else if (operation === 'Overwrite') {
    updatedRouting.skills = [...regularSkills, ...Object.keys(multiValueSkills)];
    updatedDisabled.skills = [];
    updatedRouting.levels = multiValueSkills;
    updatedDisabled.levels = {};
  }

  return {
    routing: updatedRouting,
    disabled_skills: updatedDisabled,
  };
};

exports.handler = prepareFlexFunction(requiredParameters, async (context, event, callback, response, handleError) => {
  try {
    const { operation, workerSid, skills, activity } = event;
    console.error({ operation, workerSid, skills, activity });
    if (['Add', 'Disable', 'Delete', 'Replace', 'Overwrite'].indexOf(operation) === -1) {
      response.setStatusCode(400);
      response.setBody({
        status: 'not ok',
        error: 'operation should be one of Add, Disable, Delete, Replace & Overwrite',
      });
      return callback(null, response);
    }

    if (activity === undefined && (skills.length === 0 || JSON.parse(skills).length === 0)) {
      response.setStatusCode(400);
      response.setBody({
        status: 'not ok',
        error: 'skills or activity missing for operation',
      });
      return callback(null, response);
    }

    const skillList = JSON.parse(skills);
    const multiValueSkills = skillList
      .filter((s) => s.multivalue === true)
      .reduce((accumulator, currentObject) => {
        accumulator[currentObject.name] = currentObject.assigned || currentObject.minimum;
        return accumulator;
      }, {});
    const regularSkills = skillList.filter((s) => s.multivalue !== true).map((s) => s.name);

    const worker = await twilioExecute(context, (client) =>
      client.taskrouter.v1.workspaces(process.env.TWILIO_FLEX_WORKSPACE_SID).workers(workerSid).fetch(),
    );

    if (!worker.success) {
      response.setStatusCode(400);
      response.setBody({
        status: 'not ok',
        error: 'worker not found',
      });
      return callback(null, response);
    }

    const { routing: prevRouting, disabled_skills: prevDisabled } = JSON.parse(worker.data.attributes);

    const { routing: newRouting, disabled_skills: newDisabled } = updateSkills(
      operation,
      prevRouting,
      prevDisabled,
      regularSkills,
      multiValueSkills,
    );

    const newAttributes = {
      ...JSON.parse(worker.data.attributes),
      routing: newRouting,
      disabled_skills: newDisabled,
    };

    await twilioExecute(context, (client) =>
      client.taskrouter.v1
        .workspaces(process.env.TWILIO_FLEX_WORKSPACE_SID)
        .workers(workerSid)
        .update({ attributes: JSON.stringify(newAttributes), activitySid: activity }),
    );

    response.setBody({ status: 'ok', newRouting, newDisabled });

    return callback(null, response);
  } catch (updateError) {
    return handleError(updateError);
  }
});
