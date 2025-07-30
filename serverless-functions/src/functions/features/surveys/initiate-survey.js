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

const requiredParameters = [
  { key: 'taskSid', purpose: 'voice call task sid' },
  { key: 'callSid', purpose: 'voice call sid' },
];

exports.handler = async (context, event, callback) => {
  const client = context.getTwilioClient();
  const syncServiceSid = context.TWILIO_FLEX_SYNC_SID;
  try {
    const { taskSid, callSid } = event;

    await client.sync.v1.services(syncServiceSid).syncMaps('callSurvey').syncMapItems('+13158883728').update({
      data: { callSid, taskSid },
    });

    await client.calls(callSid).update({
      twiml: `<Response><Redirect method='post'>https://survey-1403.twil.io/survey-owners?taskSid=${taskSid}</Redirect></Response>`,
    });

    response.setBody(syncDoc.data);

    return callback(null, response);
  } catch (parkingError) {
    console.error(parkingError);
    return callback(null, 'notok');
  }
};
