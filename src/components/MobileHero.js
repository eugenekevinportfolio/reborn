import React, { Component } from "react";
import $ from "jquery";
import "../styles/Hero.css";
import intro from "../img/Intro.jpg";

export default class MobileHero extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTag: 0,
      passedIntro: false,
      focus: false
    };
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      const { currentTag } = this.state;
      this.setState({ currentTag: (currentTag + 1) % 3 });
    }, 3000);
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }

  onImageLoaded() {
    this.setState({ passedIntro: true });
  }

  render() {
    const { hasScrolled } = this.props;
    const { currentTag, passedIntro, focus } = this.state;

    return (
      <div id="hero" className="section hero">
        {/* <img
          alt="Loader"
          className="image-loader"
          src={intro}
          onLoad={() => this.onImageLoaded()}
        /> */}
        <div className="max-width hero-flex">
          <div className="hero-intro">
            <div className="hero-tags-container">
              <h2
                className={
                  "hero-tag " +
                  (currentTag !== 0 ? "hero-tag--transparent" : "")
                }
              >
                Designer
              </h2>
              <h2
                className={
                  "hero-tag " +
                  (currentTag !== 1 ? "hero-tag--transparent" : "")
                }
              >
                Engineer
              </h2>
              <h2
                className={
                  "hero-tag " +
                  (currentTag !== 2 ? "hero-tag--transparent" : "")
                }
              >
                Storywriter
              </h2>
            </div>
            <p className="hero-description">
              Making monitoring fun at{" "}
              <a
                className="hero-link"
                href="https://www.datadoghq.com/blog/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Datadog
              </a>
              .
            </p>
            {/* <button
              onClick={() => {
                $([document.documentElement, document.body]).animate(
                  {
                    scrollTop: $("#articles").offset().top
                  },
                  800
                );
              }}
              onMouseEnter={() => this.setState({ focus: true })}
              onMouseLeave={() => this.setState({ focus: false })}
              className="button"
            >
              Get Started
            </button> */}
          </div>
          {/* <div
            className={
              "intro-image " +
              (hasScrolled ? "intro-image--transparent" : "") +
              (!passedIntro ? "intro-image--before-intro" : "") +
              (focus ? "intro-image--focused" : "")
            }
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5), white), url(" +
                intro +
                ")"
            }}
          /> */}
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
