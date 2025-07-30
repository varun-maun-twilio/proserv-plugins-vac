exports.handler = async function (context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();
  const client = context.getTwilioClient();

  const SYNC_SERVICE_SID = context.SYNC_SERVICE_SID || 'default';
  const SYNC_MAP_NAME = 'survey_responses';
  const BASE_URL = context.BASE_URL;
  const callSid = event.CallSid;
  const from = event.From;
  const taskSid = event.taskSid;
  const step = event.step || '1';
  const attempts = parseInt(event.attempts || '0');
  const digits = event.Digits;
  
  // Helper: Ensure sync map exists
  const ensureSyncMap = async () => {
    try {
      await client.sync.v1.services(SYNC_SERVICE_SID).syncMaps(SYNC_MAP_NAME).fetch();
      try{
        await client.sync.v1.services(SYNC_SERVICE_SID).syncMaps(SYNC_MAP_NAME).syncMapItems(callSid).fetch();
      } catch(e){
        await client.sync.v1.services(SYNC_SERVICE_SID).syncMaps(SYNC_MAP_NAME).syncMapItems.create({data: {call_sid: callSid, phoneNumber:from},key: callSid, ttl: 3600});
      }
    } catch (e) {
      await client.sync.v1.services(SYNC_SERVICE_SID).syncMaps.create({ uniqueName: SYNC_MAP_NAME });
    }
  };

  // Helper: Save response to Sync Map Item
  const saveResponse = async (questionKey, response) => {
    const existingData = await client.sync.v1.services(SYNC_SERVICE_SID)
      .syncMaps(SYNC_MAP_NAME)
      .syncMapItems(callSid)
      .fetch()
      .then(item => item.data)
      .catch(() => ({}));

    const newData = { ...existingData, [questionKey]: response };

    await client.sync.v1.services(SYNC_SERVICE_SID)
      .syncMaps(SYNC_MAP_NAME)
      .syncMapItems
      .create({ key: callSid, data: newData })
      .catch(() => {
        return client.sync.v1.services(SYNC_SERVICE_SID)
          .syncMaps(SYNC_MAP_NAME)
          .syncMapItems(callSid)
          .update({ data: newData });
      });
  };

  const createSurveyTask = async(callSid, taskSid, phoneNumber, questionKey, response) => {
    let conversations = {
      conversation_id: taskSid,
      kind: "Survey",
      communication_channel : "Survey",
      virtual: "Yes",
      abandoned: "No",
      conversation_measure_8: Number(response)
    }
    let customers = {
      phone: phoneNumber
    }
    if(questionKey === '1'){
      conversations.content = 'courteous';
    } else if (questionKey === '2') {
      conversations.content = 'knowledgeable';
    }
    
    const task = await client.taskrouter.v1
    .workspaces(context.TWILIO_FLEX_WORKSPACE_SID)
    .tasks.create({
      attributes: JSON.stringify({ conversations, customers }),
      workflowSid: context.TWILIO_SURVEY_WORKFLOW_SID,
      taskChannelSid: context.TWILIO_SURVEY_CHANNEL_SID,
      timeout: 10
    });
  }

  await ensureSyncMap();
  // Step 1 (ask next question)
  if (step === '1' && !digits) {
    twiml.play(`${BASE_URL}/short_survey.mp3`);
    const gather = twiml.gather({
      numDigits: 1,
      timeout: 10,
      action: `${BASE_URL}?step=1&attempts=0&taskSid=${taskSid}`,
      method: 'POST',
    });
    // gather.say('Welcome. For question one, press 1 for Yes, 0 for No.');
    gather.play(`${BASE_URL}/agent_curteous.mp3`);
    return callback(null, twiml);
  }

  // Step 2 (ask next question)
  if (step === '2' && !digits) {
    const gather = twiml.gather({
      numDigits: 1,
      timeout: 10,
      action: `${BASE_URL}?step=2&attempts=0&taskSid=${taskSid}`,
      method: 'POST',
    });
    // gather.say('Thank you. For question two, press 1 for Satisfied, 0 for Unsatisfied.');
    gather.play(`${BASE_URL}/agent_knowledgable.mp3`);
    return callback(null, twiml);
  }

  // Handle invalid/valid input
  if (digits) {
    if (digits !== '0' && digits !== '1') {
      if (attempts < 1) {
        const retryTwiml = new Twilio.twiml.VoiceResponse();
        const retryGather = retryTwiml.gather({
          numDigits: 1,
          timeout: 10,
          action: `${BASE_URL}?step=${step}&attempts=1&taskSid=${taskSid}`,
          method: 'POST',
        });
        // retryGather.say('Invalid input. Please press 1 or 0.');
        retryGather.play(`${BASE_URL}/sorry_you_are_having_trouble.mp3`);
        return callback(null, retryTwiml);
      } else {
        // twiml.say('You have entered wrong or no input multiple times. Thank you.');
        twiml.play(`${BASE_URL}/sorry_you_are_having_trouble.mp3`);
        twiml.hangup();
        return callback(null, twiml);
      }
    }

    // Valid response
    await saveResponse(`question_${step}`, digits);
    await createSurveyTask(callSid, taskSid, from, step, digits);

    if (step === '1') {
      const gather = twiml.gather({
        numDigits: 1,
        timeout: 10,
        action: `${BASE_URL}?step=2&attempts=0&taskSid=${taskSid}`,
        method: 'POST',
      });
    //   gather.say('Thank you. For question two, press 1 for Satisfied, 0 for Unsatisfied.');
        gather.play(`${BASE_URL}/agent_knowledgable.mp3`);
      return callback(null, twiml);
    } else {
    //   twiml.say('Thank you for your responses. Goodbye.');
        twiml.play(`${BASE_URL}/thanks_for_input.mp3`);
      twiml.hangup();
      return callback(null, twiml);
    }
  }

  // Fallback
  twiml.say('Unexpected error occurred. Goodbye.');
  twiml.hangup();
  return callback(null, twiml);
};