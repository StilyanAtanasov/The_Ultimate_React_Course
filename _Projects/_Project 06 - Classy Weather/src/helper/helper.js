export function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find(key => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

export function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

export async function getWeather(location) {
  try {
    // 1) Getting location (geocoding)
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}`);
    const geoData = await geoRes.json();

    if (!geoData.results) throw new Error("Location not found");

    const { latitude, longitude, timezone, name, country_code } = geoData.results.at(0);

    // 2) Getting actual weather
    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`);
    const weatherData = await weatherRes.json();

    return {
      location: `${name} ${convertToFlag(country_code)}`,
      ...weatherData.daily,
    };
  } catch (err) {
    console.error(err);
  }
}
