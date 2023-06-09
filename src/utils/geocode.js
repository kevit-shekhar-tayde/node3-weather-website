const geocode = async (req, res) => {
  if (!req.query.address && !req.query.latitude && !req.query.longitude) {
    return res.status(400).json({
      error: "You must provide an address.",
    });
  }
  let forecastData;
  if (req.query.latitude && req.query.longitude && !req.query.address) {
    const url = `http://api.weatherstack.com/current?access_key=30088fb36eb2dda3c83bd80f4267d4f3&query=${req.query.latitude},${req.query.longitude}`;
    try {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          forecastData = data;
        });
      if (forecastData.error) {
        return res.status(400).json({
          error: "Unable to find location. Try another search.",
        });
      }
    } catch (err) {
      return res.status(400).json({
        error: "Unable to connect to weather service.",
      });
    }
  } else {
    const url = `http://api.weatherstack.com/current?access_key=30088fb36eb2dda3c83bd80f4267d4f3&query=${req.query.address}`;
    try {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          forecastData = data;
        });
      if (forecastData.error) {
        return res.status(400).json({
          error: "Unable to find location. Try another search.",
        });
      }
    } catch (err) {
      return res.status(400).json({
        error: "Unable to connect to weather service.",
      });
    }
  }

  res.status(200).json({
    place: `${forecastData.location.name}, ${forecastData.location.region}, ${forecastData.location.country}.`,
    forecastData: `It is ${forecastData.current.weather_descriptions[0]} outside with ${forecastData.current.temperature} degrees and ${forecastData.current.precip}% chance of rain.`,
  });
};

module.exports = geocode;
