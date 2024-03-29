const express = require("express");
var cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get("/myforecast", async (req, res, next) => {
  // dark sky request here....

  //   console.log(req);
  // access query params here from req to get latitude and longitude
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  //   const latitude = 52.8324435;
  //   const longitude = -6.943708;

  //   console.log(req.query);

  //   console.log(latitude);
  if (latitude !== undefined && longitude !== undefined) {
    try {
      const weatherData = await axios.get(
        `https://api.darksky.net/forecast/${process.env.REACT_APP_DARKSKY_KEY}/${latitude},${longitude}?units=si`
      );

      // console.log(weatherData);
      res.send(weatherData.data);
    } catch (err) {
      next(err);
    }
  }
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
