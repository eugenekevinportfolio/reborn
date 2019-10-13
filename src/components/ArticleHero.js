import React, { Component } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import $ from "jquery";
import youtubeArticle from "../img/YoutubeArticle.jpg";
import "../styles/ArticleHero.css";

class ArticleHero extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passedIntro: false
    };
  }

  onImageLoaded() {
    this.setState({ passedIntro: true });
  }

  componentWillUnmount() {
    this.setState({ passedIntro: false });
  }

  render() {
    const { hasScrolled, concepts, selected_concept } = this.props;
    const { passedIntro } = this.state;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const img_article =
      selected_concept && concepts[selected_concept].img_article;
    const darkMode = selected_concept && concepts[selected_concept].darkMode;

    return (
      <div id="hero" className="section hero">
        <img
          alt="Loader"
          className="image-loader"
          src={img_article}
          onLoad={() => this.onImageLoaded()}
        />

        <div
          className={
            "hero-image-container " +
            (passedIntro ? "hero-image-container--visible" : "")
          }
        >
          <div
            className={
              "hero-image-gradient " +
              (darkMode ? "hero-image-gradient--dark" : "")
            }
          />
          <div
            style={{
              backgroundImage: darkMode
                ? `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${img_article})`
                : `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), url(${img_article})`
            }}
            className="hero-image"
          />
        </div>

        {/* <div
          alt="Article Thumbnail"
          style={{
            backgroundImage: darkMode
              ? `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 80%), url(${img_article})`
              : `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 80%), url(${img_article})`
          }}
          className={
            "article-hero-image " +
            (hasScrolled ? "article-hero-image--transparent " : "") +
            (hasScrolled && isSafari
              ? "article-hero-image--transparent--safari "
              : "") +
            (!passedIntro ? "article-hero-image--before-intro" : "")
          }
        /> */}

        <div className="max-width">
          <div className="article-title-container">
            <p
              className={
                "article-type " +
                (darkMode ? "article-type--dark " : "") +
                (passedIntro ? "article-type--visible" : "")
              }
            >
              Case Study
            </p>
            <h1
              className={
                "article-title " +
                (darkMode ? "text--dark " : "") +
                (passedIntro ? "article-title--visible" : "")
              }
            >
              {selected_concept && concepts[selected_concept].title}
            </h1>
            {/* <p
              className={
                "article-description " + (darkMode ? "text--dark" : "")
              }
            >
              {selected_concept && concepts[selected_concept].sub}
            </p> */}
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
            <p
              className={"scroll-text " + (darkMode ? "scroll-text--dark" : "")}
            >
              {selected_concept && concepts[selected_concept].scroll}
            </p>
            <div
              className={"scroll-bar " + (darkMode ? "scroll-bar--dark" : "")}
            />
          </div>
        </div>
      </div>
    );
  }
}

const selector = createSelector(
  state => state["concepts"],
  state => state["selected_concept"],
  (concepts, selected_concept) => {
    return {
      concepts,
      selected_concept
    };
  }
);

export default connect(selector)(ArticleHero);
