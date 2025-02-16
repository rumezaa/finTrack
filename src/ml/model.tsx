import * as tf from '@tensorflow/tfjs';

interface UserData {
  age: number,
  gender: number,
  income: number,
  categories: number,
  debt_comfort_level: number,
  online_purchase_frequency: number
}

async function loadModel() {
  try {
    const model = await tf.loadLayersModel("model/model.json");
    console.log("Model loaded successfully");
    return model;
  } catch (error) {
    console.error("Error loading the model:", error);
  }
}

export async function predict(
  data: UserData
) {
  const model = await loadModel();

  const outputTensor = model?.predict(
    tf.tensor2d(
      [
        data.age,
        data.gender,
        data.income,
        data.categories,
        data.debt_comfort_level,
        data.online_purchase_frequency,
      ],
      [1, 6]
    )
  );
  if (Array.isArray(outputTensor)) {
    console.error("Unexpected tensor array:", outputTensor);
    return null;
  } else {
    console.log(outputTensor?.dataSync()[0]);
    return outputTensor?.dataSync()[0];
  }
  
}






