import { NextResponse } from "next/server";
import multer from "multer";
import sharp from "sharp";
import * as tf from "@tensorflow/tfjs";
import mobilenet from "@tensorflow-models/mobilenet";
import fs from "fs/promises";
import path from "path";

// Configure Multer for File Uploads
const upload = multer({ dest: "/tmp" });

// Convert Multer to Promise-based Middleware
const processUpload = (req) =>
  new Promise((resolve, reject) => {
    upload.single("image")(req, {}, (err) => {
      if (err) reject(err);
      else resolve(req.file);
    });
  });

// Load MobileNet Model Once (for efficiency)
let model;
const loadModel = async () => {
  if (!model) {
    model = await mobilenet.load();
  }
  return model;
};

// Extract Image Features
const extractFeatures = async (imagePath) => {
  const buffer = await fs.readFile(imagePath);
  const tensor = tf.browser.fromPixels(new ImageData(new Uint8ClampedArray(buffer), 224, 224));


  const model = await loadModel();
  const features = model.infer(tensor, true);
  return features.arraySync();
};

// Handle API Requests
export async function POST(req) {
  try {
    const file = await processUpload(req);

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Process Image
    const optimizedImagePath = `/tmp/${file.filename}.jpg`;
    await sharp(file.path).resize(224, 224).toFile(optimizedImagePath);

    // Extract Features
    const features = await extractFeatures(optimizedImagePath);

    // 🚀 TODO: Compare with Database of Products (We'll do this next!)
    return NextResponse.json({ success: true, features });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
