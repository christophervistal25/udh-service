import mongoose from "mongoose";
const { MONGODB_URI } = require("../config");
export function connection(): Promise<void> {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(MONGODB_URI)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}
