const express = require("express");
const axios = require("axios");

const app = express();
const port = 3001;

app.get("/myforecast", async (req, res, next) => {
  // dark sky request here....

  //   console.log(req);
  // access query params here from req to get latitude and longitude
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;

//   console.log(req.query);

  //   console.log(latitude);
  if (latitude !== undefined && longitude !== undefined) {
    console.log("requesting");
    try {
      const weatherData = await axios.get(
        `https://api.darksky.net/forecast/${process.env.REACT_APP_DARKSKY_KEY}/${latitude},${longitude}?units=si`
      );

      console.log(weatherData);
      res.send(weatherData);
    } catch (err) {
      next(err);
    }
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
