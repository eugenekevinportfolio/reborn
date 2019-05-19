import React, { Component } from "react";
import "../styles/Connect.css";
import me from "../img/Me.jpeg";
import twitter from "../img/Twitter.svg";
import linkedin from "../img/Linkedin.svg";
import medium from "../img/Medium.svg";

export default class Connect extends Component {
  render() {
    const { showBubble } = this.props;
    return (
      <div id="connect" className="section dark-section connect">
        <div className="max-width">
          <a
            id="avatar"
            href="mailto:kevin.eugene@hec.edu"
            className="avatar"
            style={{ backgroundImage: "url(" + me + ")" }}
          >
            <p
              className={
                "button bubble " + (showBubble ? "bubble--visible" : "")
              }
            >
              Send some love!
            </p>
          </a>
          <p className="section-sub section-sub--centered">Get in touch</p>
          <h3 className="section-title section-title--centered">
            Let's connect
          </h3>
          <p className="description--centered">
            Thank you for visiting my website. If you liked some of my ideas,
            and feel like talking to a young creative and motivated designer,
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
          <p className="credits">
            © All rights reserved — Designed and coded with love and passion by
            Kevin Eugene.
          </p>
        </div>
      </div>
    );
  }
}
