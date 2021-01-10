import React, { Component } from "react";
import $ from "jquery";
import "../styles/Hero.css";
import intro from "../img/Intro.jpg";

export default class Hero extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passedIntro: false,
    };
  }

  onImageLoaded() {
    this.setState({ passedIntro: true });
  }

  render() {
    const { hasScrolled } = this.props;
    const { passedIntro } = this.state;

    return (
      <div id="hero" className="section hero dark-section">
        <img
          alt="Loader"
          className="image-loader"
          src={intro}
          onLoad={() => this.onImageLoaded()}
        />
        <div className="max-width hero-flex">
          <div className="hero-intro">
            <div className="hero-tags-container">
              <h2 className="hero-tag">Designer</h2>
              <h2 className="hero-tag">Engineer</h2>
              <h2 className="hero-tag">Storywriter</h2>
            </div>
            <p className="hero-description">
              Hey{" "}
              <a
                href="https://www.datadoghq.com/blog/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Datadog
              </a>
              .
            </p>
            <button
              onClick={() => {
                $([document.documentElement, document.body]).animate(
                  {
                    scrollTop: $("#articles").offset().top,
                  },
                  800
                );
              }}
              className="button"
            >
              Get Started
            </button>
          </div>
          <div
            className={
              "intro-image " +
              (hasScrolled ? "intro-image--transparent" : "") +
              (!passedIntro ? "intro-image--before-intro" : "")
            }
            style={{
              backgroundImage:
                "linear-gradient(0.25turn, white, rgba(255,255,255,0.4)), url(" +
                intro +
                ")",
            }}
          />
        </div>

        <div
          onClick={() => {
            $([document.documentElement, document.body]).animate(
              {
                scrollTop: $("#articles").offset().top,
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
