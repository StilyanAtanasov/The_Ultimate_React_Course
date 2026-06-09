import React from "react";
import { getWeatherIcon, formatDay, getWeather } from "../helper/helper";

export default class App extends React.Component {
  state = {
    weather: {},
    isLoading: false,
    location: "",
  };

  timeoutId = null;

  componentDidMount() {
    const location = localStorage.getItem("location");
    if (location) this.handleSearch(location);
  }

  handleSearch = async query => {
    this.setState({ location: query });
    localStorage.setItem("location", query);

    if (!query || query.trim().length < 2) {
      this.setState({ weather: null, isLoading: false, location: query });
      localStorage.setItem("location", query);
      return;
    }

    if (this.timeoutId) clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(async () => {
      this.setState({ isLoading: true });

      try {
        const weather = await getWeather(query);
        this.setState({ weather, isLoading: false });
      } catch (err) {
        console.error(err);
        this.setState({ isLoading: false, weather: null });
      }
    }, 400);
  };

  render() {
    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <div>
          <input type="text" placeholder="Search from location" onChange={e => this.handleSearch(e.target.value)} value={this.state.location || ""} />
        </div>
        {this.state.isLoading && <p className="loader">Loading ...</p>}
        {this.state.weather?.weathercode?.length > 0 && <WeatherResults weather={this.state.weather} />}
      </div>
    );
  }
}

class WeatherResults extends React.Component {
  render() {
    return (
      <div>
        <h2>Weather {this.props.weather.location}</h2>
        <ul className="weather">
          {this.props.weather.weathercode?.map((day, i) => (
            <WeatherCard
              key={i}
              weather={{
                weathercode: this.props.weather.weathercode[i],
                time: this.props.weather.time[i],
                temperature_2m_min: this.props.weather.temperature_2m_min[i],
                temperature_2m_max: this.props.weather.temperature_2m_max[i],
                isToday: i === 0,
              }}
            />
          ))}
        </ul>
      </div>
    );
  }
}

class WeatherCard extends React.Component {
  render() {
    const { weathercode, time, temperature_2m_min, temperature_2m_max, isToday } = this.props.weather;

    return (
      <li className="day">
        <span>{getWeatherIcon(weathercode)}</span>
        <p>{isToday ? "Today" : formatDay(time)}</p>
        <p>
          {temperature_2m_min.toFixed(0)}° - <strong>{temperature_2m_max.toFixed(0)}°</strong>
        </p>
      </li>
    );
  }
}
