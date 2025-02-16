const tf = require("@tensorflow/tfjs-node");

async function loadModel() {
  try {
    const model = tf.loadLayersModel("file://./model/model.json");
    console.log("Model loaded successfully");
    return model;
  } catch (error) {
    console.error("Error loading the model:", error);
  }
}

async function predict(
  age,
  gender,
  income,
  categories,
  debt_comfort_level,
  online_purchase_frequency
) {
  const model = await loadModel();

  const outputTensor = model.predict(
    tf.tensor2d(
      [
        age,
        gender,
        income,
        categories,
        debt_comfort_level,
        online_purchase_frequency,
      ],
      [1, 6]
    )
  );
  console.log(outputTensor.dataSync()[0]);
  return outputTensor.dataSync()[0];
}

predict(1, 2, 3, 4, 5, 7);
