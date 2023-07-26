import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import sunnyMarker from './icons/sunny.svg';
import cloudyMarker from './icons/cloudy.svg';
import rainyMarker from './icons/rainy.svg';
import thunderstormMarker from './icons/thunderstorm.svg';

const initialCities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];

function CityMarker({ position, name, weather }) {
  let iconUrl;
  switch (weather) {
    case 'Clear':
      iconUrl = sunnyMarker;
      break;
    case 'Clouds':
      iconUrl = cloudyMarker;
      break;
    case 'Rain':
      iconUrl = rainyMarker;
      break;
    case 'Thunderstorm':
      iconUrl = thunderstormMarker;
      break;
    default:
      iconUrl = sunnyMarker;
  }

  const customIcon = new L.Icon({
    iconUrl,
    iconSize: [50, 50],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <Marker position={position} icon={customIcon}>
      <Popup>{name}</Popup>
    </Marker>
  );
}

function MapComponent() {
  const [city, setCity] = useState('');
  const [markers, setMarkers] = useState([]);
  const [position, setPosition] = useState([40.7128, -74.006]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  function convertToCelsius(temperatureKelvin) {
    return temperatureKelvin - 273.15;
  }

  function convertToFahrenheit(temperatureKelvin) {
    return (temperatureKelvin - 273.15) * 9 / 5 + 32;
  }

  const addMarker = () => {
    if (!city) return;

    axios
      .get(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const { lat, lon } = response.data[0];
          fetchWeatherData(city, [parseFloat(lat), parseFloat(lon)]);
          setCity('');
        }
      })
      .catch((error) => {
        console.error('Error adding marker:', error);
      });
  };

  const fetchWeatherData = async (cityName, position) => {
    const apiKey = '9f5b903ee57126cbe1b2c6ccd4ef62ea';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}`;
    try {
      const response = await axios.get(url);
      if (response.data && response.data.weather && response.data.weather.length > 0) {
        const weather = response.data.weather[0].main;
        const temperatureKelvin = response.data.main.temp;
        const temperatureUnit = localStorage.getItem('temperatureUnit');

        let temperature;
        if (temperatureUnit === 'Fahrenheit') {
          temperature = convertToFahrenheit(temperatureKelvin);
        } else {
          temperature = convertToCelsius(temperatureKelvin);
        }

        setMarkers((prevMarkers) => {
          const isExistingMarker = prevMarkers.some(
            (marker) => marker.position[0] === position[0] && marker.position[1] === position[1]
          );

          if (isExistingMarker) {
            return prevMarkers;
          } else {
            return [...prevMarkers, { name: cityName, position, weather, temperature }];
          }
        });
      }
    } catch (error) {
      console.error('Fetching data error:', error);
    }
  };

  const temperatureUnit = localStorage.getItem('temperatureUnit');
  const unitSymbol = temperatureUnit === 'Fahrenheit' ? '°F' : '°C';

  useEffect(() => {
    const fetchInitialMarkers = async () => {
      for (const city of initialCities) {
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`
          );
          if (response.data && response.data.length > 0) {
            const { lat, lon } = response.data[0];
            fetchWeatherData(city, [parseFloat(lat), parseFloat(lon)]);
          }
        } catch (error) {
          console.error('Error fetching initial markers:', error);
        }
      }
    };

    fetchInitialMarkers();
  }, []);

  return (
    <>
      <section className="map_wrapper">
        <form className="City_search__form map_search" onSubmit={(e) => e.preventDefault()}>
          <input
            name="city_value"
            type="search"
            placeholder="Search for cities"
            value={city}
            onChange={handleCityChange}
          />
          <button className='marker_button' onClick={addMarker}>Add Marker</button>
        </form>
        <div className='map_main'>
          <MapContainer center={position} zoom={4} style={{ width: '100%', height: '100%', borderRadius: '35px' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {markers.map((marker, index) => (
              <CityMarker key={index} name={marker.name} position={marker.position} weather={marker.weather} />
            ))}
          </MapContainer>
        </div>
      </section>

      <section className="city_list">
        {markers.map((marker, index) => (
          <div className="city_list__item" key={index}>
            {marker.weather === 'Clear' && <img src={sunnyMarker} alt="Sunny" />}
            {marker.weather === 'Clouds' && <img src={cloudyMarker} alt="Cloudy" />}
            {marker.weather === 'Rain' && <img src={rainyMarker} alt="Rainy" />}
            {marker.weather === 'Thunderstorm' && <img src={thunderstormMarker} alt="Thunderstorm" />}

            <div className="city_list__text">
              <h2>{marker.name}</h2>
              <p>{marker.weather}</p>
            </div>

            <p className="city_list__temperature">{Math.round(marker.temperature)}{unitSymbol}</p>
          </div>
        ))}
      </section>
    </>
  );
}

export default MapComponent;
