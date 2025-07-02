const { extractStandardResponse, twilioExecute } = require(Runtime.getFunctions()['common/helpers/function-helper']
  .path);

exports.unparkInteraction = async (context, conversationSid, webhookSid, routeToSameWorker) => {
  // Remove webhook so it doesn't keep triggering if parked more than once
  const webhookResult = await twilioExecute(context, (client) =>
    client.conversations.v1.conversations(conversationSid).webhooks(webhookSid).remove(),
  );
  if (!webhookResult.success) throw webhookResult.message;

  // Fetch the conversation attributes updated when parked
  const conversation = await twilioExecute(context, (client) =>
    client.conversations.v1.conversations(conversationSid).fetch(),
  );
  if (!conversation.success) throw conversation.message;
  const {
    interactionSid,
    channelSid,
    taskAttributes,
    taskChannelUniqueName,
    queueName,
    queueSid,
    workerSid,
    workflowSid,
  } = JSON.parse(conversation.data.attributes);

  // Create a new task through the invites endpoint. Alternatively you can pass
  // a queue_sid and a worker_sid inside properties to add a specific agent back to the interaction

  const additionalProperties = {};
  const client = context.getTwilioClient();
  try {
    const newInvite = await client.flexApi.v1
      .interaction(interactionSid)
      .channels(channelSid)
      .invites.create({
        routing: {
          properties: {
            workspace_sid: context.TWILIO_FLEX_WORKSPACE_SID,
            workflow_sid: workflowSid,
            ...additionalProperties,
            task_channel_unique_name: taskChannelUniqueName,
            attributes: { ...JSON.parse(taskAttributes), originalRouting: { queueName, queueSid, workerSid } },
          },
        },
      });
  } catch (e) {
    if (e.status === 404) {
      const newInteraction = await client.flexApi.v1.interaction.create({
        channel: {
          type: 'chat',
          initiated_by: 'Customer',
          properties: {
            type: 'chat',
            media_channel_sid: threadConversation.sid,
          },
        },
        routing: {
          type: 'TaskRouter',
          properties: {
            workspace_sid: workspace,
            workflow_sid: workflowSid,
            task_channel_unique_name: conversationAttributes.taskChannelUniqueName || 'chat',
            attributes: { ...JSON.parse(taskAttributes), originalRouting: { queueName, queueSid, workerSid } },
          },
        },
      });
    } else {
      // Fail Gracefully
      // Create the webhook
      const recreateWebhookResult = await twilioExecute(context, (twilioClient) =>
        twilioClient.conversations.v1.conversations(conversationSid).webhooks.create({
          'configuration.method': 'POST',
          'configuration.filters': ['onMessageAdded'],
          'configuration.url': `https://${context.DOMAIN_NAME}/features/park-interaction/common/unpark-interaction`,
          target: 'webhook',
        }),
      );
      const { data: webhook, status } = recreateWebhookResult;
      if (recreateWebhookResult.success) {
        // update conversation attributes
        const attributes = {
          ...conversation.data.attributes,
          webhookSid: webhook.sid,
        };

        const updateAttributesResponse = await twilioExecute(context, (twilioClient) =>
          twilioClient.conversations.v1
            .conversations(conversationSid)
            .update({ attributes: JSON.stringify(attributes) }),
        );
        if (!updateAttributesResponse.success) throw updateAttributesResponse.message;
      }
    }
  }

  const { data: participantInvite, status } = result;
  return { status, participantInvite, ...extractStandardResponse(result) };
};
