const { prepareFlexFunction, extractStandardResponse, twilioExecute } = require(Runtime.getFunctions()[
  'common/helpers/function-helper'
].path);

const requiredParameters = [{ key: 'queueName', purpose: 'queue friendly name' }];

exports.handler = prepareFlexFunction(requiredParameters, async (context, event, callback, response, handleError) => {
  const client = context.getTwilioClient();

  try {
    const { queueName } = event;

    const workers = await client.taskrouter.v1.workspaces(context.TWILIO_FLEX_WORKSPACE_SID).workers.list({
      limit: 400,
      taskQueueName: queueName,
    });

    response.setBody(workers);

    return callback(null, response);
  } catch (parkingError) {
    return handleError(parkingError);
  }
});
