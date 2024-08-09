const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/weather", async (req, res) => {
  const city = req.query.city;

  console.log(city);

  if (!city) {
    res.status(404).json({
      message: "Please enter a city name",
    });
  }

  try {
    const apiURL = `${process.env.API_URL}${city}&appid=${process.env.API_KEY}`;

    const response = await axios.get(apiURL);
    // console.log(response);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json({ message: "Invalid city name" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at Port ${PORT}`);
});
