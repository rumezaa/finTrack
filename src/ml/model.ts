import * as tf from "@tensorflow/tfjs-node";

async function loadModel(): Promise<tf.LayersModel> {
  try {
    const model = await tf.loadLayersModel("file://./model/model.json");
    console.log("Model loaded successfully");
    return model;
  } catch (error) {
    console.error("Error loading the model:", error);
    throw error;
  }
}

type PredictionInput = {
  age: number;
  gender: number;
  income: number;
  categories: number;
  debt_comfort_level: number;
  online_purchase_frequency: number;
};

export async function predict({
  age,
  gender,
  income,
  categories,
  debt_comfort_level,
  online_purchase_frequency,
}: PredictionInput): Promise<number> {
  try {
    const model = await loadModel();

    // Create a tensor from the input values
    const inputTensor = tf.tensor2d(
      [[age, gender, income, categories, debt_comfort_level, online_purchase_frequency]],
      [1, 6]
    );

    // Predict using the model
    const outputTensor = model.predict(inputTensor) as tf.Tensor;

    // Extract the result from the tensor and return it
    const result = outputTensor.dataSync()[0];
    console.log("Prediction result:", result);
    return result;
  } catch (error) {
    console.error("Error during prediction:", error);
    throw error;
  }
}

// Example usage
predict({
  age: 1,
  gender: 2,
  income: 3,
  categories: 4,
  debt_comfort_level: 5,
  online_purchase_frequency: 7,
})
  .then((result) => {
    console.log("Final prediction:", result);
  })
  .catch((error) => {
    console.error("Prediction failed:", error);
  });
