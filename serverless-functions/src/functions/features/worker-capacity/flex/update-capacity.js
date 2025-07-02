const { prepareFlexFunction, extractStandardResponse, twilioExecute } = require(Runtime.getFunctions()[
  'common/helpers/function-helper'
].path);

const fetchSyncDoc = (client, syncServiceSid, syncDocName) => {
  return (syncDoc = client.sync.v1.services(syncServiceSid).documents(syncDocName).fetch());
};

const createSyncDoc = (client, syncServiceSid, syncDocName, data) => {
  console.error(JSON.stringify(data));

  return client.sync.v1.services(syncServiceSid).documents.create({
    uniqueName: syncDocName,
    data,
  });
};

const updateSyncDoc = (client, syncServiceSid, syncDoc) => {
  return client.sync.v1.services(syncServiceSid).documents(syncDoc.uniqueName).update({ data: syncDoc.data });
};

const requiredParameters = [{ key: 'workerSid', purpose: 'agent worker sid' }];

exports.handler = prepareFlexFunction(requiredParameters, async (context, event, callback, response, handleError) => {
  const client = context.getTwilioClient();
  const syncServiceSid = context.TWILIO_FLEX_SYNC_SID;
  try {
    const { workerSid } = event;

    const workerChannels = await client.taskrouter.v1
      .workspaces(context.TWILIO_FLEX_WORKSPACE_SID)
      .workers(workerSid)
      .workerChannels.list({ limit: 20 });

    const syncData = workerChannels
      .filter((wc) => ['voice', 'chat', 'sms', 'email'].indexOf(wc.taskChannelUniqueName) > -1)
      .map((wc) => {
        return {
          channel: wc.taskChannelUniqueName,
          total: wc.configuredCapacity,
          available: wc.configuredCapacity - wc.assignedTasks,
        };
      })
      .reduce((a, c) => {
        return { ...a, [c.channel]: { total: c.total, available: c.available } };
      }, {});

    // Update worker capacity sync doc
    const syncDocName = `worker-capacity-${workerSid}`;
    let syncDoc = null;
    try {
      syncDoc = await fetchSyncDoc(client, syncServiceSid, syncDocName);
      syncDoc.data = { channels: syncData };
      await updateSyncDoc(client, syncServiceSid, syncDoc);
    } catch (error) {
      syncDoc = await createSyncDoc(client, syncServiceSid, syncDocName, { channels: syncData });
    }

    response.setBody(syncDoc.data);

    return callback(null, response);
  } catch (parkingError) {
    return handleError(parkingError);
  }
});
