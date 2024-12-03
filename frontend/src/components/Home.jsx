import { Link } from 'react-router-dom';

import "../styles/Home.css";
import fing from "../images/fing.svg";
import brand1 from "../images/brand1.svg";
import brand2 from "../images/brand2.svg";
import brand3 from "../images/brand3.svg";
import footer from "../images/footer.svg";
import banner from "../images/banner.jpeg";

import React from "react";
import Navbar from './Navbar';
const Home = () => {
 

  return (
    <>
      <title>Property Selling</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin ="true"/>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      />

      <div className="root">
      {<Navbar/>}

        <div className="content-holder">
          <div className="content-1">
            <div className="image-container">
              <img src={banner} alt="" />
            </div>

            <h1 className="tag">
              We spend one-third of <br />
              our life at work
            </h1>
            <div className="div-container">
              <div className="details">
                <div className="project">
                  <h1>25+</h1>
                  <h1>Total Project</h1>
                </div>
                <div className="saved">
                  <h1>4.5M</h1>
                  <h1>Emission Saved</h1>
                </div>
                <div className="partner">
                  <h1>60+</h1>
                  <h1>Stratigic Partner</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="content-2">
            <div className="sub-content-2">
              <div className="left-content">
                <div className="title-fing">
                  <img src={fing} alt="" />
                  <h1 className="title">We Are Lander</h1>
                </div>
                <p>
                  Lander is a digital agency focused on creating innovative and
                  sustainable digital solutions. We specialize in helping
                  businesses and organizations reduce their carbon footprint,
                  improve their online presence, and enhance their digital
                  experiences.
                  
                  Struggling to manage your properties ? Use Lofi – the ultimate
                  solution to streamline and simplify <br /> your property
                  management needs.
                </p>
              </div>
              <div className="right-content">
                <div className="brandImages">
                  <div>
                    <img src={brand1} alt="" />
                  </div>
                  <div>
                    <img src={brand2} alt="" />
                  </div>
                  <div>
                    <img src={brand3} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <Link href="/" className="btn">
              Learn More
            </Link>
          </div>
          <div className="content-3">
            <h1>Properties Managed</h1>
            <div className="line"></div>
            <div className="card-holder">
              <div className="card-1">
                <div className="cardimage-holder">
                  <img src={brand2} alt="" />
                </div>
                <div className="property-details">
                  <h5 className="pname">Property name</h5>
                  <h5 className="ptype">Apartment</h5>
                  <h5 className="ppurchase">Purchased Date : 20-07-2004</h5>
                  <h5 className="paddress">25 Radhe Residency</h5>
                </div>
              </div>
              <div className="card-1">
                <div className="cardimage-holder">
                  <img src={brand3} alt="" />
                </div>
                <div className="property-details">
                  <h5 className="pname">Property name</h5>
                  <h5 className="ptype">Apartment</h5>
                  <h5 className="ppurchase">Purchased Date : 20-07-2004</h5>
                  <h5 className="paddress">25 Radhe Residency</h5>
                  <a href="service.html" className="pservice">
                    Service
                  </a>
                </div>
              </div>
              <div className="card-1">
                <div className="cardimage-holder">
                  <img src={brand2} alt="" />
                </div>
                <div className="property-details">
                  <h5 className="pname">Property name</h5>
                  <h5 className="ptype">Apartment</h5>
                  <h5 className="ppurchase">Purchased Date : 20-07-2004</h5>
                  <h5 className="paddress">25 Radhe Residency</h5>
                </div>
              </div>
              <div className="card-1">
                <div className="cardimage-holder">
                  <img src={brand1} alt="" />
                </div>
                <div className="property-details">
                  <h5 className="pname">Property name</h5>
                  <h5 className="ptype">Apartment</h5>
                  <h5 className="ppurchase">Purchased Date : 20-07-2004</h5>
                  <h5 className="paddress">25 Radhe Residency</h5>
                </div>
              </div>
              <div className="card-1">
                <div className="cardimage-holder">
                  <img src={brand3} alt="" />
                </div>
                <div className="property-details">
                  <h5 className="pname">Property name</h5>
                  <h5 className="ptype">Apartment</h5>
                  <h5 className="ppurchase">Purchased Date : 20-07-2004</h5>
                  <h5 className="paddress">25 Radhe Residency</h5>
                </div>
              </div>
              <div className="card-1">
                <div className="cardimage-holder">
                  <img src={brand1} alt="" />
                </div>
                <div className="property-details">
                  <h5 className="pname">Property name</h5>
                  <h5 className="ptype">Apartment</h5>
                  <h5 className="ppurchase">Purchased Date : 20-07-2004</h5>
                  <h5 className="paddress">25 Radhe Residency</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="content-4">
            <div className="contact">
              <h1>Contact Us</h1>
              <p>
                Lander is a digital agency focused on creating innovative and
                sustainable digital solutions. We specialize in helping
                businesses and organizations reduce their carbon footprint,
                improve their online presence, and enhance their digital
                experiences.
              </p>
              <div className="form">
                <input type="text" placeholder="Name" className="name" />
                <input type="email" placeholder="Email" className="email" />
                <textarea placeholder="Message"></textarea>
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
        <div className="content-5">
          <div className="footer-blob-handler">
            <img src={footer} alt="" />
          </div>
          <div className="footer">
            <div className="left-footer">
              <h1>About Lander</h1>
              <p>
                Lander is a digital agency focused on creating innovative and
                sustainable digital solutions. We specialize in helping
                businesses and organizations reduce their carbon footprint,
                improve their online presence, and enhance their digital
                experiences.
              </p>
            </div>
            <div className="middle-footer">
              <h1>Services</h1>
              <ul>
                <li>
                  <Link to="/">Property Management</Link>
                </li>
                <li>
                  <Link to="/">Website Design</Link>
                </li>
                <li>
                  <Link to="/">Digital Marketing</Link>
                </li>
                <li>
                  <Link to="/">Branding & Identity</Link>
                </li>
              </ul>
            </div>
            <div className="right-footer">
              <h1>Contact</h1>
              <input type="email" placeholder="Email" className="email" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
