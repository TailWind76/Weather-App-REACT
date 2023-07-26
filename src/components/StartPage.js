import image from './images/rainyWindow.jpg';
import logo from './icons/logo.svg';
import { useState } from 'react';

function StartPage() {
  const [hidden, setHidden] = useState(false);
  const [deactivated, setDeactivated] = useState(false);

  const handleButtonClick = () => {
    setHidden(!hidden);
    setTimeout(() => {
      setDeactivated(true);
    }, 1000); 
  };

  return (
    <section className={hidden ? `Homepage_wrapper hidden ${deactivated ? "deactivated" : ""}` : `Homepage_wrapper ${deactivated ? "deactivated" : ""}`}>
      <img src={image} className="Homepage_image" alt="Rainy Window" />

      <div className='Homepage_title'>
        <img src={logo} alt="Logo" />
        <h1>Breeze</h1>
        <p>Weather App</p>
        <button onClick={handleButtonClick}>Get started</button>
      </div>
    </section>
  );
}

export default StartPage;