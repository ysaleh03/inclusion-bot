const { CohereModel } = require("./CohereModel");
require("dotenv").config();

const cohereClient = new CohereModel(
  process.env.COHERE_API_KEY,
  process.env.COHERE_TEXT_TO_LABEL_MODEL_KEY,
  process.env.COHERE_TEXT_TO_TYPE_MODEL_KEY,
);

function classify(inputs) {
  return cohereClient.getClassifications(inputs);
}

/**
 * Determines if a message is hateful, and returns its confidence
 *
 * @param inputs: string[]                  The array of messages to check hateful-ness
 * @returns MessageClassification[]         The array containing whether a message is hateful, and its confidence
 */
async function isHate(inputs) {
  return cohereClient.getClassifications(inputs);
}

module.exports = {
  classify,
  isHate,
};
