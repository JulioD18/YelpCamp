const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "608dfeed5b78c5c3eeac849b",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius repudiandae veniam repellat cupiditate eveniet rem labore sed necessitatibus a ipsa quis iusto enim vero impedit ea sequi, voluptatem atque doloremque!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url:
            "https://res.cloudinary.com/juliod18/image/upload/v1620195721/YelpCamp/uxojzyzinlq4gqxt2gbr.jpg",
          filename: "YelpCamp/uxojzyzinlq4gqxt2gbr",
        },
        {
          url:
            "https://res.cloudinary.com/juliod18/image/upload/v1620195721/YelpCamp/zzheuhgm72usoadnoddr.jpg",
          filename: "YelpCamp/zzheuhgm72usoadnoddr",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
