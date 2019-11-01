import React, { Component } from "react";
import $ from "jquery";
import "../styles/Hero.css";
import intro from "../img/Intro.jpg";

export default class MobileHero extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passedIntro: false
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ passedIntro: true });
    }, 800);
  }

  render() {
    const { hasScrolled } = this.props;
    const { passedIntro } = this.state;

    return (
      <div id="hero" className="section hero">
        <div className="max-width hero-flex">
          <h2
            className={"hero-tag " + (passedIntro ? "hero-tag--visible " : "")}
          >
            <span>Making </span>
            <span>monitoring </span>
            <span>fun </span>
            <span>at </span>
            <span>
              <a
                className="hero-link"
                href="https://www.datadoghq.com/blog/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Datadog
              </a>
            </span>
            <span>.</span>
          </h2>
        </div>

        <div
          onClick={() => {
            $([document.documentElement, document.body]).animate(
              {
                scrollTop: $("#articles").offset().top
              },
              800
            );
          }}
          className={
            "scroll-container " +
            (hasScrolled ? "scroll-container--transparent" : "")
          }
        >
          <p className="scroll-text">Scroll for more love</p>
          <div className="scroll-bar" />
        </div>
      </div>
    );
  }
}
