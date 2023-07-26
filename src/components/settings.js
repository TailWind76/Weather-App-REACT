import React from 'react';
import { useState, useEffect } from 'react';
const Settings = () => {
    const [notificationOn, setNotificationOn] = useState(false);
    const [timeisOn, setTimeIsOn] = useState(false);
  
    const handleToggleNotification = () => {
        setNotificationOn((prevIsOn) => !prevIsOn);
    }

    const handleToggle = () => {
        setTimeIsOn((prevIsOn) => {
          
          const newTimeFormat = !prevIsOn ? '12-hour' : '24-hour';
          localStorage.setItem('timeFormat', newTimeFormat);
          return !prevIsOn;
        });
      };


   
    const [temperatureUnit, setTemperatureUnit] = useState('Celsius');
    const [windSpeedUnit, setWindSpeedUnit] = useState('km/h');
    const [pressureUnit, setPressureUnit] = useState('hPa');
    const [precipitationUnit, setPrecipitationUnit] = useState('Millimeters');
    const [distanceUnit, setDistanceUnit] = useState('Kilometers');
  
 
    const handleTemperatureUnitClick = (unit) => {
      setTemperatureUnit(unit);
      localStorage.setItem('temperatureUnit', unit);
    };
  
 
    const handleWindSpeedUnitClick = (unit) => {
      setWindSpeedUnit(unit);
      localStorage.setItem('windSpeedUnit', unit);
    };
  
    
    const handlePressureUnitClick = (unit) => {
      setPressureUnit(unit);
      localStorage.setItem('pressureUnit', unit);
    };
  
 
    const handlePrecipitationUnitClick = (unit) => {
      setPrecipitationUnit(unit);
      localStorage.setItem('precipitationUnit', unit);
    };
  

    const handleDistanceUnitClick = (unit) => {
      setDistanceUnit(unit);
      localStorage.setItem('distanceUnit', unit);
    };
  
    
    useEffect(() => {
      const temperature = localStorage.getItem('temperatureUnit');
      const windSpeed = localStorage.getItem('windSpeedUnit');
      const pressure = localStorage.getItem('pressureUnit');
      const precipitation = localStorage.getItem('precipitationUnit');
      const distance = localStorage.getItem('distanceUnit');
      const timeFormat = localStorage.getItem('timeFormat');

      if (temperature) setTemperatureUnit(temperature);
      if (windSpeed) setWindSpeedUnit(windSpeed);
      if (pressure) setPressureUnit(pressure);
      if (precipitation) setPrecipitationUnit(precipitation);
      if (distance) setDistanceUnit(distance);
      if (timeFormat) setTimeIsOn(timeFormat === '12-hour');
    }, []);





  return (
    <div className='Settings'>


    <div className="settings_wrapper">


    <section className='units_wrapper'>
          <h2>Units</h2>
          <div className='units__settings'>

           
            <div className='units_item'>
              <h3>TEMPERATURE</h3>
              <div className='units__item_setting'>
                <div
                  className={`units__item_option ${temperatureUnit === 'Celsius' ? 'active' : ''}`}
                  onClick={() => handleTemperatureUnitClick('Celsius')}
                >
                  <p>Celsius</p>
                </div>
                <div
                  className={`units__item_option ${temperatureUnit === 'Fahrenheit' ? 'active' : ''}`}
                  onClick={() => handleTemperatureUnitClick('Fahrenheit')}
                >
                  <p>Fahrenheit</p>
                </div>
              </div>
            </div>

         
            <div className='units_item'>
              <h3>WIND SPEED</h3>
              <div className='units__item_setting'>
                <div
                  className={`units__item_option ${windSpeedUnit === 'km/h' ? 'active' : ''}`}
                  onClick={() => handleWindSpeedUnitClick('km/h')}
                >
                  <p>km/h</p>
                </div>
                <div
                  className={`units__item_option ${windSpeedUnit === 'm/s' ? 'active' : ''}`}
                  onClick={() => handleWindSpeedUnitClick('m/s')}
                >
                  <p>m/s</p>
                </div>
                <div
                  className={`units__item_option ${windSpeedUnit === 'Knots' ? 'active' : ''}`}
                  onClick={() => handleWindSpeedUnitClick('Knots')}
                >
                  <p>Knots</p>
                </div>
              </div>
            </div>

          
            <div className='units_item'>
              <h3>PRESSURE</h3>
              <div className='units__item_setting'>
                <div
                  className={`units__item_option ${pressureUnit === 'hPa' ? 'active' : ''}`}
                  onClick={() => handlePressureUnitClick('hPa')}
                >
                  <p>hPa</p>
                </div>
                <div
                  className={`units__item_option ${pressureUnit === 'Inches' ? 'active' : ''}`}
                  onClick={() => handlePressureUnitClick('Inches')}
                >
                  <p>Inches</p>
                </div>
                <div
                  className={`units__item_option ${pressureUnit === 'kPa' ? 'active' : ''}`}
                  onClick={() => handlePressureUnitClick('kPa')}
                >
                  <p>kPa</p>
                </div>
                <div
                  className={`units__item_option ${pressureUnit === 'mm' ? 'active' : ''}`}
                  onClick={() => handlePressureUnitClick('mm')}
                >
                  <p>mm</p>
                </div>
              </div>
            </div>

       
            <div className='units_item'>
              <h3>PRECIPITATION</h3>
              <div className='units__item_setting'>
                <div
                  className={`units__item_option ${precipitationUnit === 'Millimeters' ? 'active' : ''}`}
                  onClick={() => handlePrecipitationUnitClick('Millimeters')}
                >
                  <p>Millimeters</p>
                </div>
                <div
                  className={`units__item_option ${precipitationUnit === 'Inches' ? 'active' : ''}`}
                  onClick={() => handlePrecipitationUnitClick('Inches')}
                >
                  <p>Inches</p>
                </div>
              </div>
            </div>

       
            <div className='units_item'>
              <h3>Distance</h3>
              <div className='units__item_setting'>
                <div
                  className={`units__item_option ${distanceUnit === 'Kilometers' ? 'active' : ''}`}
                  onClick={() => handleDistanceUnitClick('Kilometers')}
                >
                  <p>Kilometers</p>
                </div>
                <div
                  className={`units__item_option ${distanceUnit === 'Miles' ? 'active' : ''}`}
                  onClick={() => handleDistanceUnitClick('Miles')}
                >
                  <p>Miles</p>
                </div>
              </div>
            </div>

          </div>
        </section>


        <section className='notification_wrapper settingWrapper'>
                <h2>Notifications</h2>

                <div className='notification_settings mainSettings'>
                    <div className='notification_text textSettings'>
                            <h3>Notifications</h3>

                            <p>Be aware of the weather</p>

                    </div>

                    <span className='notification_toggle toggler'>

                    <div className={`toggle-switch ${notificationOn ? "on" : "off"}`} onClick={handleToggleNotification}>
                          <div className="switch"></div>
                         </div>


                    </span>

                </div>


        </section>

        <section className='ganeral_wrapper settingWrapper'>
                <h2>General</h2>

                <div className='general_settings mainSettings'>
                    <div className='general_text textSettings'>
                            <h3>12-Hour Time</h3>

                            

                    </div>

                    <span className='general_toggle toggler'>

                    <div className={`toggle-switch ${timeisOn ? "on" : "off"}`} onClick={handleToggle}>
                          <div className="switch"></div>
                         </div>


                    </span>

                </div>


        </section>

    
    </div>

  
         <section className='premium_plan'>
            <h2>Advanced</h2>

            <h3>Get new expirience</h3>
            
            <ul>

                <li>Ad free</li>
                <li>Health activities overview</li>
                <li>Severe weather notifications</li>
            </ul>

            <button>$5.99 <p>/month</p> </button>

         </section>
         <section className='github_page'>
            <h2>Newer forget your umbrella!</h2>

            <p>Liked the app? Rate others in my github profile</p>
            <a href='https://github.com/TailWind76'>   <button> View my github page </button></a> 

         </section>


    </div>
  );
};

export default Settings;