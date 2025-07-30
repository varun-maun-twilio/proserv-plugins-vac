const { prepareFlexFunction, extractStandardResponse, twilioExecute } = require(Runtime.getFunctions()[
  'common/helpers/function-helper'
].path);

const axios = require('axios');

const requiredParameters = [];

exports.handler = prepareFlexFunction(requiredParameters, async (context, event, callback, response, handleError) => {
  try {
    const apiResponse = await axios
      .get(
        `https://taskrouter.twilio.com/v1/Workspaces/${process.env.TWILIO_FLEX_WORKSPACE_SID}/Activities?PageSize=50`,
        {
          auth: {
            username: process.env.ACCOUNT_SID,
            password: process.env.AUTH_TOKEN,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((d) => d.data)
      .catch((e) => {
        console.error(e);
        return { meta: { error: e.message }, activities: [] };
      });

    response.setBody(apiResponse);

    return callback(null, response);
  } catch (searchError) {
    return handleError(searchError);
  }
});
