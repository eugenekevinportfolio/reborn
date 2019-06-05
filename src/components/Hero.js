import React, { Component } from "react";
import $ from "jquery";
import "../styles/Hero.css";
import intro from "../img/Intro.jpeg";

export default class Hero extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passedIntro: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ passedIntro: true });
    }, 1);
  }

  render() {
    const { hasScrolled } = this.props;
    const { passedIntro } = this.state;

    return (
      <div id="hero" className="section hero">
        <div className="max-width hero-flex">
          <div className="hero-intro">
            <div className="hero-tags-container">
              <h2 className="hero-tag">Designer</h2>
              <h2 className="hero-tag">Engineer</h2>
              <h2 className="hero-tag">Storywriter</h2>
            </div>
            <p className="hero-description">
              Crafting delight at Avanade.
              <br /> Spending most of my free time writing and designing.
            </p>
            <button
              onClick={() => {
                $([document.documentElement, document.body]).animate(
                  {
                    scrollTop: $("#articles").offset().top
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
                ")"
            }}
          />
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
