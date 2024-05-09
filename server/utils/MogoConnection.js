import mongoose from "mongoose";

export const mongoConnect = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/firstDb")
    .then(() => {
      console.log("Connected to Compass");
    })
    .catch((err) => {
      console.log(err);
    });
};
