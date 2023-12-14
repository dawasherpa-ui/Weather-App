"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

function Weather({ params }) {
  const [weatherData, setWeatherData] = useState(null);
  const iconCode = weatherData?.weather[0].icon;

  // Define a function to map icon codes to corresponding image paths
  const getIconPath = (code) => {
    switch (code) {
      case "01d":
      case "01n":
        return "clear.png";
      case "02d":
      case "02n":
        return "clouds.png";
      case "03d":
      case "03n":
        return "clouds.png";
      case "04d":
      case "04n":
        return "clouds.png";
      case "09d":
      case "09n":
        return "drizzle.png";
      case "10d":
      case "10n":
        return "rain.png";
      case "11d":
      case "11n":
        return "rain.png";
      case "13d":
      case "13n":
        return "snow.png";
      case "50d":
      case "50n":
        return "mist.png";
      default:
        return "clear.png";
    }
  };

  const iconSource = `/images/${getIconPath(iconCode)}`;

  useEffect(() => {
    const fetchData = async () => {
      const cityId = params.id;
      const apiKey = "18c792bbce0ce978661f277bff28ac0f";
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}`;

      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    };

    fetchData();
  }, [params.id]);

  if (!weatherData) {
    return <div></div>;
  }

  const getTime = (stamp) => {
    const date = new Date(stamp * 1000); // Multiply by 1000 to convert from seconds to milliseconds

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
  };
  return (
    <Box sx={{height:"100%", p: 3,}}>
      <Typography variant="h3" sx={{ textAlign: "center", fontSize: { xs: "4vw", md: "32px" },marginBottom:{xs:"5px",md:"10px"} }}>
        Current Weather
      </Typography>
      <Box>
      {weatherData && (
        <Box sx={{ display: "flex", justifyContent: "center",alignItems:"center",flexDirection:"column" }}>
          <Box
            sx={{
              display: "grid",
              placeItems: "center",
              width: { xs: "75%", md: "60%" },
              gridTemplateColumns: "1fr 1fr 1fr ",
              gridTemplateRows: "1fr 1fr",
            }}
          >
            <Box
              sx={{
                gridColumn: "1/4",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Image
                src={iconSource}
                height={100}
                width={100}
                alt="Weather Icon"
              />
              <Box>
                <Typography
                  variant="h4"
                  sx={{ fontSize: { xs: "4vw", md: "32px" } }}
                >
                  {weatherData?.name},{" "}{weatherData?.sys.country}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontSize: { xs: "3.2vw", md: "26px" } }}
                >
                  {weatherData?.weather[0].main}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontSize: { xs: "4vw", md: "26px" } }}
              >
                Temp
              </Typography>
              <Typography
                variant="h3"
                sx={{ fontSize: { xs: "4.5vw", md: "36px" } }}
              >
                {Math.floor(weatherData.main.temp - 273.15)}&deg;C
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontSize: { xs: "4vw", md: "26px" } }}
              >
                Humidity
              </Typography>
              <Typography
                variant="h3"
                sx={{ fontSize: { xs: "4.5vw", md: "36px" } }}
              >
                {weatherData?.main.humidity}%
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontSize: { xs: "4vw", md: "26px" } }}
              >
                Wind
              </Typography>
              <Typography
                variant="h3"
                sx={{ fontSize: { xs: "4.5vw", md: "36px" } }}
              >
                {weatherData?.wind.speed}km/hr
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              placeItems:"center",
              width:{xs:"70%",sm:"55%",lg:"40%"},
              gridTemplateRows: "repeat(5,1fr)",
            }}
          >
            <Box sx={{ gridColumn: "1/3" }}>
            <Typography variant="h4"    sx={{ fontSize: { xs: "4vw", md: "32px" } }}>
              Other Details
            </Typography>
            </Box>
            <Box>
            <Typography variant="subtitle"  sx={{ fontSize: { xs: "4vw", md: "26px" } }}>Wind Direction</Typography>
            </Box>
            <Box>
            <Typography variant="subtitle"  sx={{ fontSize: { xs: "4vw", md: "26px" } }}>{weatherData?.wind.deg}&deg;</Typography>
            </Box>
            <Box>
            <Typography variant="subtitle"  sx={{ fontSize: { xs: "4vw", md: "26px" } }}>Pressure</Typography>
            </Box>
            <Box>
            <Typography variant="subtitle"  sx={{ fontSize: { xs: "4vw", md: "26px" } }}>{weatherData?.main.pressure}</Typography>
            </Box>
            <Box>
            <Typography variant="subtitle"  sx={{ fontSize: { xs: "4vw", md: "26px" } }}>Sunrise</Typography>
            </Box>
            <Box>
            <Typography variant="subtitle"  sx={{ fontSize: { xs: "4vw", md: "26px" } }}>{getTime(weatherData?.sys.sunrise)} AM</Typography>
            </Box>
            <Box>
            <Typography variant="subtitle"  sx={{ fontSize: { xs: "4vw", md: "26px" } }}>Sunset</Typography>
            </Box>
            <Box>
            <Typography variant="subtitle"  sx={{ fontSize: { xs: "4vw", md: "26px" } }}>{getTime(weatherData?.sys.sunset)} PM</Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
    </Box>
  );
}

export default Weather;
