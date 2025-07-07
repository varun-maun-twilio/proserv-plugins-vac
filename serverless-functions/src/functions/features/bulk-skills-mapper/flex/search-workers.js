const { prepareFlexFunction, extractStandardResponse, twilioExecute } = require(Runtime.getFunctions()[
  'common/helpers/function-helper'
].path);

const axios = require('axios');

const requiredParameters = [];

const buildQueryString = (reqObj) => {
  let queryStr = '';
  for (const k of Object.keys(reqObj)) {
    if (reqObj[k] && `${reqObj[k]}` !== '') queryStr += `${(queryStr.length === 0 ? '?' : '&') + k}=${reqObj[k]}`;
  }
  return queryStr;
};

exports.handler = prepareFlexFunction(requiredParameters, async (context, event, callback, response, handleError) => {
  try {
    const { ActivityName, Available, TaskQueueName, Ordering, PageSize, Page, PageToken } = event;

    const queryStr = buildQueryString({
      ActivityName,
      Available,
      TaskQueueName,
      Ordering,
      PageSize,
      Page,
      PageToken,
    });

    const apiResponse = await axios
      .get(`https://taskrouter.twilio.com/v1/Workspaces/${process.env.TWILIO_FLEX_WORKSPACE_SID}/Workers${queryStr}`, {
        auth: {
          username: process.env.ACCOUNT_SID,
          password: process.env.AUTH_TOKEN,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((d) => d.data)
      .catch((e) => {
        console.error(e);
        return { meta: { error: e.message }, workers: [] };
      });

    response.setBody(apiResponse);

    return callback(null, response);
  } catch (searchError) {
    return handleError(searchError);
  }
});
