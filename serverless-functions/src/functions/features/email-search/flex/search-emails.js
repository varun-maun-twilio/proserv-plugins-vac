const { prepareFlexFunction, extractStandardResponse, twilioExecute } = require(Runtime.getFunctions()[
  'common/helpers/function-helper'
].path);

const requiredParameters = [];

exports.handler = prepareFlexFunction(requiredParameters, async (context, event, callback, response, handleError) => {
  try {
    const { from, to, subject, body, dateFrom, dateTo } = event;

    const searchResponse = await axios({
      method: 'get',
      url: `${process.env.OPENSEARCH_INDEX}/_search`,
      data: {
        query: {
          match_all: {},
        },
      },
    })
      .then((r) => r.data)
      .catch((e) => {
        console.error(e);
        return [];
      });

    response.setStatusCode(200);
    response.setBody({ searchResponse });
    return callback(null, response);
  } catch (error) {
    return handleError(error);
  }
});
