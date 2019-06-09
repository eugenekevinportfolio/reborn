import React, { Component } from "react";
import "../styles/Connect.css";
import me from "../img/Me.jpeg";
import lightTwitter from "../img/Twitter.svg";
import lightLinkedin from "../img/Linkedin.svg";
import lightMedium from "../img/Medium.svg";
import darkTwitter from "../img/DarkTwitter.svg";
import darkLinkedin from "../img/DarkLinkedin.svg";
import darkMedium from "../img/DarkMedium.svg";

export default class Connect extends Component {
  render() {
    const { showBubble, darkMode } = this.props;
    const twitter = darkMode ? darkTwitter : lightTwitter;
    const linkedin = darkMode ? darkLinkedin : lightLinkedin;
    const medium = darkMode ? darkMedium : lightMedium;
    return (
      <div
        id="connect"
        className={
          "section dark-section connect " +
          (darkMode ? "section--dark connect--dark" : "")
        }
      >
        <div className="max-width">
          <a
            id="avatar"
            href="mailto:kevin.eugene@hec.edu"
            className={"avatar " + (darkMode ? "avatar--dark" : "")}
            style={{ backgroundImage: "url(" + me + ")" }}
          >
            <p
              className={
                "button bubble " +
                (showBubble ? "bubble--visible " : "") +
                (darkMode ? "button--dark bubble--dark" : "")
              }
            >
              Send some love!
            </p>
          </a>
          <p
            className={
              "section-sub section-sub--centered " +
              (darkMode ? "section-sub--dark" : "")
            }
          >
            Get in touch
          </p>
          <h3
            className={
              "section-title section-title--centered " +
              (darkMode ? "section-title--dark" : "")
            }
          >
            Let's connect
          </h3>
          <p
            className={
              "description--centered " + (darkMode ? "description--dark" : "")
            }
          >
            Thank you for visiting my website. If you liked some of my ideas,
            and feel like talking to a young creative and passionate designer,
            shoot me an email!
          </p>
          <div className="connect-links">
            <a
              href="https://www.linkedin.com/in/eugenekevin/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img alt="linkedin" id="linkedin" src={linkedin} />
            </a>
            <a
              href="https://medium.com/@Kekakou"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img alt="medium" id="medium" src={medium} />
            </a>
            <a
              href="https://twitter.com/Kekakou20"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img alt="twitter" id="twitter" src={twitter} />
            </a>
          </div>
          <p className={"credits " + (darkMode ? "credits--dark" : "")}>
            © All rights reserved — Designed and coded with love and passion by
            Kevin Eugene.
          </p>
        </div>
      </div>
    );
  }
}
