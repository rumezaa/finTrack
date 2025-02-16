const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs-node");

const fs = require("fs");
const Papa = require("papaparse");

// Read the CSV file
const filePath = "/Users/aaronarellano/finTrack/src/ml/data/dataset.csv";
const csvData = fs.readFileSync(filePath, "utf8");

// Parse CSV data using PapaParse
const parsedData = Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true,
  dynamicTyping: true,
});

const data = parsedData.data;

const features = data.map((item) => [
  item.age,
  item.gender,
  item.yearly_income,
  item.product_category,
  item.debt_comfort_level,
  item.online_purchase_frequency,
]);

const labels = data.map((item) => item.financial_risk_assessment);

console.log(labels);

const xs = tf.tensor2d(features, [20000, 6]);
const ys = tf.tensor2d(labels, [20000, 1]);

console.log(xs);
console.log("\n\n\n\n\n");

// Compile the model
const model = tf.sequential();
model.add(tf.layers.dense({ units: 6, inputShape: [6], activation: "relu" }));
model.add(tf.layers.dense({ units: 16, activation: "relu" }));
model.add(tf.layers.dense({ units: 1 }));

model.compile({
  optimizer: tf.train.adam(0.01),
  loss: "meanSquaredError",
  metrics: ["mae"],
});

// Train the model
async function trainModel() {
  await model.fit(xs, ys, {
    epochs: 100,
    batchSize: 64,
    shuffle: true,
    callbacks: {
      onEpochEnd: (epoch, logs) =>
        console.log(
          `Epoch ${epoch + 1}: Loss = ${logs.loss}, MAE = ${logs.mae}`
        ),
    },
  });

  model.save("file://./model");
  console.log("Model saved to disk");

  console.log("Training Complete");
}

trainModel();
