const { prepareFlexFunction, extractStandardResponse, twilioExecute } = require(Runtime.getFunctions()[
  'common/helpers/function-helper'
].path);

const skillGroups = require(Runtime.getAssets()['/features/bulk-skills-mapper/skill-groups.json'].path);

const requiredParameters = [];
exports.handler = prepareFlexFunction(requiredParameters, async (context, event, callback, response, handleError) => {
  try {
    response.setBody(skillGroups || {});
    return callback(null, response);
  } catch (searchError) {
    return handleError(searchError);
  }
});
