const { CohereClient, CohereTimeoutError, CohereError } = require("cohere-ai");

class CohereModel {
  client;
  modelLabel;
  modelType;

  constructor(token, modelLabel, modelType) {
    this.client = new CohereClient({ token: token });
    this.modelLabel = modelLabel;
    this.modelType = modelType;
  }

  async getClassifications(inputs) {
    try {
      const cohereResponse = await this.client.classify({
        model: this.modelLabel,
        inputs: inputs,
        examples: [],
      });

      return await Promise.all(
        cohereResponse.classifications.map((classification) =>
          this.parseResponseIntoClassification(classification),
        ),
      );
    } catch (err) {
      if (err instanceof CohereTimeoutError) {
        console.log(err);
      } else if (err instanceof CohereError) {
        console.log(err);
      } else {
        console.log(err);
      }
    }
  }

  async parseResponseIntoClassification(response) {
    if (!response) {
      console.log(response);
      return;
    }

    const isHateful = response.predictions[0] === "hate";

    if (isHateful) {
      const typeResponse = await this.client.classify({
        model: this.modelType,
        inputs: [response.input],
        examples: [],
      });

      const typePrediction = typeResponse.classifications[0];

      console.log(typePrediction);

      return {
        input: response.input,
        isHateful: true,
        confidence: response.confidences[0],
        type: typePrediction.predictions[0],
        typeConfidence: typePrediction.confidences[0],
      };
    } else {
      return {
        input: response.input,
        isHateful: false,
        confidence: response.confidences[0],
      };
    }
  }
}

module.exports = {
  CohereModel,
};
