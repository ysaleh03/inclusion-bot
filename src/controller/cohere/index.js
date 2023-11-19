const { CohereClient, CohereTimeoutError, CohereError } = require("cohere-ai");

require("dotenv").config();

const cohereClient = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

function getExamples() {
  return [
    { text: "yo how are you", label: "benign" },
    { text: "PUDGE MID!", label: "benign" },
    { text: "I WILL REMEMBER THIS FOREVER", label: "benign" },
    { text: "I think I saw it first", label: "benign" },
    { text: "bring me a potion", label: "benign" },
    { text: "I will honestly kill you", label: "toxic" },
    { text: "get rekt moron", label: "toxic" },
    { text: "go to hell", label: "toxic" },
    { text: "f*a*g*o*t", label: "toxic" },
    { text: "you are hot trash", label: "toxic" },
  ];
}

async function classify(inputs) {
  try {
    const response = await cohereClient.classify({
      model: "small",
      inputs: inputs,
      examples: getExamples(),
    });

    return response.classifications;
  } catch (err) {
    if (err instanceof CohereTimeoutError) {
      console.log("Timed out!");
      return err;
    } else if (err instanceof CohereError) {
      console.err("Cohere error:");
      return err;
    }
  }
}

module.exports = {
  classify,
};
