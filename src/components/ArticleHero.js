import React, { Component } from "react";
import $ from "jquery";
import youtubeArticle from "../img/YoutubeArticle.jpg";
import "../styles/ArticleHero.css";

export default class ArticleHero extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passedIntro: false
    };
  }

  onImageLoaded() {
    this.setState({ passedIntro: true });
  }

  render() {
    const { hasScrolled } = this.props;
    const { passedIntro } = this.state;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    return (
      <div id="hero" className="section hero">
        <img
          alt="Loader"
          className="image-loader"
          src={youtubeArticle}
          onLoad={() => this.onImageLoaded()}
        />
        <div
          alt="Article Thumbnail"
          className={
            "article-hero-image " +
            (hasScrolled ? "article-hero-image--transparent " : "") +
            (hasScrolled && isSafari
              ? "article-hero-image--transparent--safari "
              : "") +
            (!passedIntro ? "article-hero-image--before-intro" : "")
          }
        />
        <div className="max-width">
          <div className="article-title-container">
            <p className="article-type">Case Study</p>
            <h1 className="article-title">Youtube 2.0</h1>
            <p className="article-description">
              Designing a modern streaming platform
            </p>
          </div>
          <div
            onClick={() => {
              $([document.documentElement, document.body]).animate(
                {
                  scrollTop: $("#article-body").offset().top
                },
                800
              );
            }}
            className={
              "scroll-container " +
              (hasScrolled ? "scroll-container--transparent" : "")
            }
          >
            <p className="scroll-text scroll-text--dark">
              Grab a seat and some popcorn
            </p>
            <div className="scroll-bar scroll-bar--dark" />
          </div>
        </div>
      </div>
    );
  }
}
