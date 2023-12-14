"use client";

import { useLocation } from "@/context/Context";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";

function Page() {
  const [ipAddress, setIpAddress] = useState();
  const [greeting, setGreeting] = useState("Good Morning");
  const [weather, setWeather] = useState(null);
  const { location, setGlobalLocation } = useLocation();
  const iconCode = weather?.weather[0].icon;

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

  const fetchApiData = async () => {
    try {
      const res = await fetch(`https://api64.ipify.org?format=json`);
      if (!res.ok) {
        throw new Error("Failed to fetch IP address");
      }
      const data = await res.json();
      setIpAddress(data.ip);
    } catch (error) {
      console.error("Error fetching IP address:", error.message);
    }
  };

  const fetchWeather = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location[0]}&lon=${location[1]}&appid=18c792bbce0ce978661f277bff28ac0f`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await res.json();
      setWeather(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
    }
  };

  const fetchLocation = async (loc) => {
    try {
      const res = await fetch(`https://ipapi.co/${loc}/json/`);
      if (!res.ok) {
        throw new Error("Failed to fetch location data");
      }
      const data = await res.json();
      console.log(data);
      const { latitude, longitude, country_name: country } = data;
      setGlobalLocation([latitude, longitude, country, greeting]);
    } catch (error) {
      console.error("Error fetching location data:", error.message);
    }
  };
  function getGreeting() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour < 12) {
      return "Good Morning";
    } else {
      return "Good Afternoon";
    }
  }
  useEffect(() => {
    if (location === null) {
      fetchApiData();
      const greet = getGreeting();
      setGreeting(greet);
    }
  }, [location]);

  useEffect(() => {
    if (ipAddress && location === null) {
      fetchLocation(ipAddress);
    }
  }, [ipAddress, location]);

  useEffect(() => {
    if (location?.length === 4) {
      fetchWeather();
    }
  }, [location]);
  return (
    <Box className="home" sx={{height:"100%",width:"100%",display:"flex",alignItems:"center",background:"linear-gradient(90deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",color:"white",py:{xs:3,md:2}}}>
      {location && location.length === 4 ? (
        <Box sx={{ p: 3 }}>
          <Box>
            <Typography variant="h1" sx={{ fontSize: "4.5vw" }}>
              {location[3]}
            </Typography>
            <Typography variant="h1" sx={{ fontSize: "6vw" }}>
              Let's see Weather of {location[2] || "your Country"}.
            </Typography>
          </Box>
          {weather && (
            <Box sx={{ display: "grid", placeItems: "center" }}>
              <Box
                sx={{
                  display: "grid",
                  placeItems: "center",
                  p: 3,
                  width: { xs: "75%", md: "60%" },
                  gridTemplateColumns: "1fr 1fr 1fr ",
                  gridTemplateRows: "1fr 1fr",
                }}
              >
                <Box sx={{ gridColumn: "1/4", display: "flex",flexDirection:{xs:"column",md:"row"} }}>
                  <Image
                    src={iconSource}
                    height={100}
                    width={100}
                    alt="Weather Icon"
                  />
                  <Box>
                    <Typography variant="h4" sx={{fontSize:{xs:"4vw",md:"32px"}}}>
                      {weather?.name},{location[2]}
                    </Typography>
                    <Typography variant="h5" sx={{fontSize:{xs:"3.2vw",md:"26px"}}}>
                      {weather?.weather[0].main}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column",alignItems:"center" }}>
                  <Typography variant="h5" sx={{fontSize:{xs:"4vw",md:"26px"}}}>Temp</Typography>
                  <Typography
                    variant="h3"
                    sx={{ fontSize: { xs: "4.5vw", md: "36px" } }}
                  >
                    {Math.floor(weather.main.temp - 273.15)}&deg;C
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column",alignItems:"center" }}>
                  <Typography variant="h5" sx={{fontSize:{xs:"4vw",md:"26px"}}}>Humidity</Typography>
                  <Typography
                    variant="h3"
                    sx={{ fontSize: { xs: "4.5vw", md: "36px" } }}
                  >
                    {weather?.main.humidity}%
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column",alignItems:"center" }}>
                  <Typography variant="h5" sx={{fontSize:{xs:"4vw",md:"26px"}}}>Wind</Typography>
                  <Typography
                    variant="h3"
                    sx={{ fontSize: { xs: "4.5vw", md: "36px" } }}
                  >
                    {weather?.wind.speed}km/hr
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Link href={`/${weather?.id}`}><Typography variant="h5" sx={{"&:hover":{textDecoration:"underline"}}}>View Details</Typography></Link>
              </Box>
            </Box>
          )}
        </Box>
      ) : null}
    </Box>
  );
}
export default Page;

