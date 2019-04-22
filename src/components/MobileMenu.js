import React, { Component } from "react";
import linkedin from "../img/Linkedin.svg";
import twitter from "../img/Twitter.svg";
import resume from "../img/Resume.pdf";

export default class MobileMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isBurgerOpen: false
    };
  }

  render() {
    const { isBurgerOpen } = this.state;
    return (
      <div>
        <div
          onClick={() => this.setState({ isBurgerOpen: false })}
          className={
            "mobile-menu-backdrop " +
            (isBurgerOpen ? "mobile-menu-backdrop-open" : "")
          }
        />
        <div
          className="burger"
          onClick={() => this.setState({ isBurgerOpen: !isBurgerOpen })}
        >
          <div className={"top-bar " + (isBurgerOpen ? "top-bar-open" : "")} />
          <div
            className={"bottom-bar " + (isBurgerOpen ? "bottom-bar-open" : "")}
          />
        </div>
        <ul className={isBurgerOpen ? "burger-open-ul" : ""}>
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
      </div>
    );
  }
}
