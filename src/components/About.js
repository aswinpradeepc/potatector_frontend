import React from 'react';
import happyFarmerImage from './happiepotato.jpg'; // Add the path to the happy farmer image

const About = () => {
    return (
        <div className="container center" style={{ backgroundColor: '#D9EDBF' }}>
            <div className="about" >

                <div className="about__content">
                    <h2 className="about__title">About Potato Disease Detector</h2>
                    <p>
                        Welcome to Potato Disease Detector, a sophisticated platform designed for the professional
                        assessment of potato health. Our cutting-edge solution harnesses advanced technologies,
                        including TensorFlow for precise image recognition, FastAPI for streamlined user interaction,
                        React for an intuitive interface, and MySQL for robust data management.
                    </p>
                    <p>
                        With Potato Disease Detector, agricultural professionals can effortlessly upload images and
                        receive rapid, accurate results, empowering them to swiftly identify common ailments such as
                        late blight, early blight, blackleg, and more. Whether you're a seasoned farmer, agricultural
                        consultant, or researcher, Potato Disease Detector provides the essential insights necessary for
                        effective crop management and disease prevention.
                    </p>
                    <p>
                        Experience the reliability and efficiency of Potato Disease Detector today, and elevate your
                        potato crop management strategies with confidence and professionalism.
                    </p>
                </div>
                <div className="about__image">
                    <img src={happyFarmerImage} alt="Happy Potato Farmer"
                         style={{ height: '60%'}}/>
                </div>
            </div>
        </div>
    );
};

export default About;

