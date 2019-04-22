import React, { Component } from "react";
import logo from "../img/Logo.svg";
import "../styles/Header.css";
import linkedin from "../img/Linkedin.svg";
import twitter from "../img/Twitter.svg";
import resume from "../img/Resume.pdf";
import MediaQuery from "react-responsive";
import MobileMenu from "./MobileMenu";

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="logo-container">
          <img src={logo} className="logo" alt="Logo" />
          <h1>Kevin Eugene</h1>
        </div>
        <MediaQuery minWidth={650}>
          <ul>
            <a href={resume} target="_blank" rel="noopener noreferrer">
              Resume
            </a>
            <a href="mailto:kevin.eugene@hec.edu">Say Hi</a>
            <a
              href="https://www.linkedin.com/in/eugenekevin/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img alt="linkedin" id="linkedin" src={linkedin} />
            </a>
            <a
              href="https://twitter.com/Kekakou20"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img alt="twitter" id="twitter" src={twitter} />
            </a>
          </ul>
        </MediaQuery>
        <MediaQuery maxWidth={649}>
          <MobileMenu />
        </MediaQuery>
      </div>
    );
  }
}
