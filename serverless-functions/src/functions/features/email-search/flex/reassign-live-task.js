const { prepareFlexFunction, twilioExecute } = require(Runtime.getFunctions()['common/helpers/function-helper'].path);

const requiredParameters = [
  {
    key: 'taskSid',
    purpose: 'task sid of transferring task',
  },
  {
    key: 'workerEmail',
    purpose: 'email of worker for transferring task',
  },
];

exports.handler = prepareFlexFunction(requiredParameters, async (context, event, callback, response, handleError) => {
  if (!context.TWILIO_FLEX_WORKSPACE_SID) {
    response.setStatusCode(400);
    response.setBody({
      data: null,
      message: 'TWILIO_FLEX_WORKSPACE_SID is a required enviroment variable',
    });
    return callback(null, response);
  }

  try {
    const { taskSid, workerEmail } = event;

    // 1. Fetch Task
    const task = await twilioExecute(context, (client) =>
      client.taskrouter.v1.workspaces(context.TWILIO_FLEX_WORKSPACE_SID).tasks(taskSid).fetch(),
    );

    console.log(task);
    // 2. Check Status, If reserved or pending, proceed

    // 3. Fetch Attributes

    // 4. Update Attributes

    /* const taskAttributes = JSON.parse(task.attributes);
    await twilioClient.taskrouter.v1
      .workspaces(context.TWILIO_WORKSPACE_SID)
      .tasks(task.sid)
      .update({
        attributes: JSON.stringify({
          ...taskAttributes,
          allocated: true,
          assignedTo: targetWorkerEmail,
        }),
      });
*/

    response.setStatusCode(200);
    response.setBody({
      success: true,
      message: `Success`,
      task,
    });
    return callback(null, response);
  } catch (error) {
    return handleError(error);
  }
});
