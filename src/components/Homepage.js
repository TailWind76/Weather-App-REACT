import React, { useState, useEffect } from 'react';
import sunny from './icons/sunny.svg';
import cloudy from './icons/cloudy.svg';
import temperatupe from './icons/temperature.svg';
import drop from './icons/drop.svg';
import wind from './icons/wind.svg';
import sun from './icons/sun.svg';
import thunderstorm from './icons/thunderstorm.svg'
import rainy from './icons/rainy.svg';
import visibilitySVG from './icons/visibility.svg';
import pressureSVG from './icons/pressure.svg';
import humiditySVG from './icons/Humidity.svg';
import sunset from './icons/sunset.svg';
import axios from 'axios';


function Homepage() {
  const [temperature, setTemperature] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [fiveDayForecast, setFiveDayForecast] = useState([]);
  const [city, setCity] = useState('London');
  const [realFeel, setRealFeel] = useState(null);
  const [rainChance, setRainChance] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [visibility, setVisibility] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [sunsetTime, setSunsetTime] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [show, setShowed] = useState(false);
 

 

  useEffect(() => {
    const apiKey = '9f5b903ee57126cbe1b2c6ccd4ef62ea';

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;


    const selectedCityFromStorage = localStorage.getItem('selectedCity');

    if (selectedCityFromStorage) {
      setCity(selectedCityFromStorage);
    }


    axios
      .all([axios.get(currentWeatherUrl), axios.get(forecastUrl)])
      .then(
        axios.spread((currentWeatherRes, forecastRes) => {
          setTemperature(currentWeatherRes.data.main.temp);
          setWindSpeed(currentWeatherRes.data.wind.speed);
          setRealFeel(currentWeatherRes.data.main.feels_like);
          setRainChance(forecastRes.data.list[0].pop);
          setWeatherIcon(currentWeatherRes.data.weather[0].icon);
          setVisibility(currentWeatherRes.data.visibility);
          setPressure(currentWeatherRes.data.main.pressure);
          setSunsetTime(currentWeatherRes.data.sys.sunset);
          setHumidity(currentWeatherRes.data.main.humidity);

          const forecastItems = forecastRes.data.list;
          const forecastNext24Hours = forecastItems.filter((item) => {
            const forecastDate = new Date(item.dt * 1000);
            const currentDate = new Date();
            const timeDifference = forecastDate.getTime() - currentDate.getTime();
            const hoursDifference = timeDifference / (1000 * 3600);

            return hoursDifference >= 0 && hoursDifference <= 24;
          });
          setForecastData(forecastNext24Hours);

          const nextFiveDays = forecastItems.filter((item, index, arr) => {
            const forecastDate = new Date(item.dt * 1000);
            const currentDate = new Date();
            return (
              forecastDate.getTime() >= currentDate.getTime() &&
              arr.findIndex((i) => new Date(i.dt * 1000).getDate() === forecastDate.getDate()) === index
            );
          });
          setFiveDayForecast(nextFiveDays);
        })
      )
      .catch((error) => {
        console.error('Error while fetching weather data:', error);
      });
  }, [city]);

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setCity(selectedCity);
    localStorage.setItem('selectedCity', selectedCity);


  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  

  function getWeatherIcon(weatherType) {
    switch (weatherType) {
      case 'Rain':
        return rainy;
      case 'Clouds':
        return cloudy;
      case 'Clear':
        return sunny;
      case 'Wind':
        return cloudy;
        case 'Thunderstorm':
          return thunderstorm;
      default:
        return sunny;
    }
  }

  const getWeatherIconPath = (weatherCode) => {
    switch (weatherCode) {
      case '01d':
        return sunny;
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        return cloudy;
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        return rainy;
      case '11d':
      case '11n':
        return thunderstorm;
      default:
        return sunny;
    }
  };
  
  const getWeatherIconForHour = (weatherCode) => {
    switch (weatherCode) {
      case '01d':
        return sunny;
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        return cloudy;
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        return rainy;
      case '11d':
      case '11n':
        return thunderstorm;
      default:
        return sunny;
    }
  };
  

  


  const convertTemperatureToFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32;
  };

  const convertRealFeelToFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32;
  };

  const convertWindSpeedToMetersPerSecond = (kmh) => {
    return kmh * 0.277778;
  };

  const convertPressureToInchesOfMercury = (hPa) => {
    return hPa * 0.02953;
  };
  const convertPressureToKilopascals = (hPa) => {
    return hPa / 10;
  };
 
  
  const convertWindSpeedToKilometersPerHour = (kmh) => {
    return kmh;
  };
  
  const convertKilometersPerHourToKnots = (kmh) => {
    return kmh * 0.53996;
  };
  
  const convertPressureToMillimetersOfMercury = (hPa) => {
    return hPa * 0.750062;
  };
  

  const convertVisibilityToMiles = (meters) => {
    return meters * 0.000621371;
  };

  const convertVisibilityToKilometers = (meters) => {
    return meters / 1000;
  };
 

  const getTemperatureValue = () => {
    const temperatureUnit = localStorage.getItem('temperatureUnit');
    if (temperature !== null && temperature !== undefined) {
      if (temperatureUnit === 'Fahrenheit') {
        return Math.floor(convertTemperatureToFahrenheit(temperature)) + '°F';
      } else {
        return Math.floor(temperature) + '°C';
      }
    } else {
      return ''; 
    }
  };

  const getWindSpeedValue = () => {
    const windSpeedUnit = localStorage.getItem('windSpeedUnit');
    if (windSpeedUnit === 'm/s') {
      return Math.floor(convertWindSpeedToMetersPerSecond(windSpeed)) + 'm/s';
    } if (windSpeedUnit === 'km/h') {
        return Math.floor(convertWindSpeedToKilometersPerHour(windSpeed)) + 'km/h';
      } if (windSpeedUnit === 'Knots') {
        return Math.floor(convertKilometersPerHourToKnots(windSpeed)) + 'Knots';
      } else {
      return Math.floor(windSpeed) + 'km/h';
    }
  };

  const getPressureValue = () => {
    const pressureUnit = localStorage.getItem('pressureUnit');
    if (pressureUnit === 'Inches') {
      return convertPressureToInchesOfMercury(pressure).toFixed(2) + ' Inches';
    } else if (pressureUnit === 'kPa') {
      return convertPressureToKilopascals(pressure).toFixed(2) + ' kPa';
    } else if (pressureUnit === 'mm') {
      return convertPressureToMillimetersOfMercury(pressure).toFixed(2) + ' mm';
    } else {
      return Math.floor(pressure) + ' hPa';
    }
  };
  const getRealFeelValue = () => {
    const temperatureUnit = localStorage.getItem('temperatureUnit');
    if (realFeel !== null && realFeel !== undefined) {
      if (temperatureUnit === 'Fahrenheit') {
        return Math.floor(convertRealFeelToFahrenheit(realFeel)) + '°F';
      } else {
        return Math.floor(realFeel) + '°C';
      }
    } else {
      return ''; 
    }
  };

  const getVisibilityValue = () => {
    const distanceUnit = localStorage.getItem('distanceUnit');
    if (distanceUnit === 'Miles') {
      return convertVisibilityToMiles(visibility).toFixed(2) + ' miles';
    } else if (distanceUnit === 'Kilometers') {
      return  Math.floor(convertVisibilityToKilometers(visibility).toFixed(2)) + ' km';
    } else {
      return visibility + ' m';
    }
  };
    
  const getForecastTemperatureValue = (temperature) => {
    const temperatureUnit = localStorage.getItem('temperatureUnit');
    if (temperatureUnit === 'Fahrenheit') {
        return Math.floor(convertTemperatureToFahrenheit(temperature)) + '°F';
    } else {
      
      return Math.floor(temperature) + '°C';
    }
  };

  const getWeekForecastTemperatureValue = (temperature) => {
    const temperatureUnit = localStorage.getItem('temperatureUnit');
    if (temperatureUnit === 'Fahrenheit') {
      return Math.floor(convertTemperatureToFahrenheit(temperature)) + '°F';
    } else {
      return Math.floor(temperature) + '°C';
    }
  };
  

  const renderSunsetTime = (sunsetTime) => {
    const timeFormat = localStorage.getItem('timeFormat') || '12-hours';
    const time = new Date(sunsetTime);
    let hours = time.getHours();
    let minutes = time.getMinutes();

    if (timeFormat === '12-hours') {
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
    } else {
      return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    }
  }

  const timeFormat = localStorage.getItem("timeFormat");



  
    return (
        <section className='MainPage_wrapper'>
      <form className='City_search__form' onSubmit={handleFormSubmit}>
        <input
          name='city_value'
          type='search'
          placeholder='Search for cities'
          value={city}
          onChange={handleCityChange}
        ></input>
      </form>

      <div className='MainInfo_section'>
        <div className='MainPage__city_info'>
          <section className='City_info__text'>
            <h2 className='city_name'>{city}</h2>
            <p className='RainChanse'>Chanse of rain {Math.round(rainChance * 100)}%</p>
            <p className='city_Temperature'>{getTemperatureValue()}</p>
          </section>
          {weatherIcon && <img className='city_info__image' src={getWeatherIconPath(weatherIcon)} alt='Weather Icon' />}
        </div>

        <div className={show == true ? 'forecast_today_info hiddenBlock' : 'forecast_today_info'}>
          <p>TODAY'S FORECAST</p>
          <div className='forecast_today_main'>
            {forecastData.map((forecastItem, index) => (
              <div className='forecast_today__item' key={index}>
                <p className='forecast_today__time'>
                {new Date(forecastItem.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: timeFormat === '12-hours' })}
                </p>
                <img src={getWeatherIcon(forecastItem.weather[0].main)} alt='Weather Icon' />
                <p className='forecast_today__temperature'>{getForecastTemperatureValue(forecastItem.main.temp)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={show == true ? 'air_condition expanded' : 'air_condition'}>
          <p>AIR CONDITION'S</p>
          <button onClick={() => setShowed(!show)}>{show == true ? `close` : `See more`}</button>
          <div className='air_condition__main'>
            <div className='air_condition__item'>
              <img src={temperatupe} />
              <div className='air_condition_item__text'>
                <p className='air_condition__title'>Real Feel </p>
                <p className='air_condition__value'>{getRealFeelValue()}</p>
              </div>
            </div>
            <div className='air_condition__item'>
              <img src={wind} />
              <div className='air_condition_item__text'>
                <p className='air_condition__title'>Wind</p>
                <p className='air_condition__value'>{getWindSpeedValue()}</p>
              </div>
            </div>
            <div className='air_condition__item'>
              <img src={drop} />
              <div className='air_condition_item__text'>
                <p className='air_condition__title'>Chance of rain</p>
                <p className='air_condition__value'>{Math.round(rainChance * 100)}%</p>
              </div>
            </div>
            <div className='air_condition__item'>
              <img src={sun} />
              <div className='air_condition_item__text'>
                <p className='air_condition__title'> UV Index</p>
                <p className='air_condition__value'>3</p>
              </div>
            </div>
            <div className={show == true ? 'air_condition__item' : 'air_condition__item blockHidden'}>
              <img src={visibilitySVG} />
              <div className='air_condition_item__text'>
                <p className='air_condition__title'>Visibility</p>
                <p className='air_condition__value'>{getVisibilityValue()}</p>
              </div>
            </div>
            <div className={show == true ? 'air_condition__item' : 'air_condition__item blockHidden'}>
              <img src={sunset} />
              <div className='air_condition_item__text'>
                <p className='air_condition__title'> Sunset time</p>
                <p className='air_condition__value'>{renderSunsetTime(sunsetTime)}</p>
              </div>
            </div>
            <div className={show == true ? 'air_condition__item' : 'air_condition__item blockHidden'}>
              <img src={pressureSVG} />
              <div className='air_condition_item__text'>
                <p className='air_condition__title'> Pressure</p>
                <p className='air_condition__value'>{getPressureValue()} </p>
              </div>
            </div>
            <div className={show == true ? 'air_condition__item' : 'air_condition__item blockHidden'}>
              <img src={humiditySVG} />
              <div className='air_condition_item__text'>
                <p className='air_condition__title'> Humidity</p>
                <p className='air_condition__value'>{humidity}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='weekForecast'>
  <p className='weekForecast_title'>6-DAY FORECAST</p>
  {fiveDayForecast.map((forecastItem, index) => (
    <div className='weekForecast_item' key={index}>
      <p className='weekForecast_item__day'>
        {new Date(forecastItem.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}
      </p>
      <div className='weekForecast_item__weatherInfo'>
        <img src={getWeatherIcon(forecastItem.weather[0].main)} alt='Weather Icon' />
        <p>{forecastItem.weather[0].main}</p>
      </div>
      <span className='weekForecast_item__temperature'>
        <p className='MaxTemperature'>{getWeekForecastTemperatureValue(forecastItem.main.temp_max)}</p>
        <p className='MinTemperature'> / {getWeekForecastTemperatureValue(forecastItem.main.temp_min)}</p>
      </span>
    </div>
  ))}
</div>


    </section>
  );
}










export default Homepage;



