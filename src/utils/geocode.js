const geocode = async (req, res) => {
  if (!req.query.address) {
    return res.status(400).json({
      error: "You must provide an address.",
    });
  }
  console.log(req.query.address);
  const url = `http://api.weatherstack.com/current?access_key=30088fb36eb2dda3c83bd80f4267d4f3&query=${req.query.address}`;
  let forecastData;
  try {
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        forecastData = data;
      });
    console.log(forecastData);
    if (forecastData.error) {
      return res.status(400).json({
        error: "Unable to find location. Try another search.",
      });
    }
  } catch (err) {
    return res.status(400).json({
      error: "Unable to connect to geo-location service.",
    });
  }
  res.status(200).json({
    place: `${forecastData.location.name}, ${forecastData.location.region}, ${forecastData.location.country}.`,
    forecastData: `It is ${forecastData.current.weather_descriptions[0]} outside with ${forecastData.current.temperature} degrees and ${forecastData.current.precip}% chance of rain.`,
  });
};

module.exports = geocode;
