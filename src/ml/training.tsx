import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-node";
import * as fs from "fs";
import * as Papa from "papaparse";

interface DataItem {
  age: number;
  gender: number;
  yearly_income: number;
  product_category: number;
  debt_comfort_level: number;
  online_purchase_frequency: number;
  financial_risk_assessment: number;
}


// Read the CSV file
const filePath: string = "/Users/aaronarellano/finTrack/src/ml/data/dataset.csv";
const csvData: string = fs.readFileSync(filePath, "utf8");

// Parse CSV data using PapaParse
const parsedData = Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true,
  dynamicTyping: true,
});

const data: DataItem[] = parsedData.data as DataItem[];


const features: number[][] = data.map((item) => [
  item.age,
  item.gender,
  item.yearly_income,
  item.product_category,
  item.debt_comfort_level,
  item.online_purchase_frequency,
]);

const labels: number[] = data.map((item) => item.financial_risk_assessment);

console.log(labels);

const xs: tf.Tensor = tf.tensor2d(features, [20000, 6]);
const ys: tf.Tensor = tf.tensor2d(labels, [20000, 1]);

console.log(xs);
console.log("\n\n\n\n\n");

// Compile the model
const model: tf.Sequential = tf.sequential();
model.add(tf.layers.dense({ units: 6, inputShape: [6], activation: "relu" }));
model.add(tf.layers.dense({ units: 16, activation: "relu" }));
model.add(tf.layers.dense({ units: 1 }));

model.compile({
  optimizer: tf.train.adam(0.01),
  loss: "meanSquaredError",
  metrics: ["mae"],
});

// Train the model
async function trainModel(): Promise<void> {
  await model.fit(xs, ys, {
    epochs: 100,
    batchSize: 64,
    shuffle: true,
    callbacks: {
      onEpochEnd: (epoch, logs) =>
        console.log(
          `Epoch ${epoch + 1}: Loss = ${logs?.loss}, MAE = ${logs?.mae}`
        ),
    },
  });

  await model.save("file://./model");
  console.log("Model saved to disk");

  console.log("Training Complete");
}

trainModel();

