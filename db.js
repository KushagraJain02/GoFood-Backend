const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://gofood:gofood%4002@cluster0.oewve2q.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0";
const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB");

    const fetched_Data = await mongoose.connection.db
      .collection("food_items")
      .find({})
      .toArray();
    const food_Cat = await mongoose.connection.db
      .collection("foodCategory")
      .find({})
      .toArray();

    global.food_items = fetched_Data;
    global.foodCategory = food_Cat;

    // console.log("✅ Data loaded: ", {
    //   foodItems: fetched_Data.length,
    //   foodCategory: food_Cat.length,
    // });

    
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = mongoDB;
