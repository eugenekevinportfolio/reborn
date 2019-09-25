import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import mogiImg from "../img/MogiArticle.jpg";
import youtubeImg from "../img/YoutubeArticle.jpg";

class NextArticle extends Component {
  render() {
    const {
      selected_concept,
      concepts,
      isNextArticleFocused,
      window_dimensions
    } = this.props;
    const prompt =
      selected_concept === "mogi" ? "Next Article" : "Previous Article";
    const name = selected_concept === "mogi" ? "Youtube 2.0" : "iOS Mogi";
    const darkMode = selected_concept && concepts[selected_concept].darkMode;
    const image = selected_concept === "mogi" ? youtubeImg : mogiImg;
    const link = selected_concept === "mogi" ? "youtube" : "mogi";

    return (
      <a
        // href={"/articles/" + link}
        href="https://uxdesign.cc/redesigning-siri-and-adding-multitasking-features-to-ios-70c2f1a1569b"
        target="_blank"
        rel="noopener noreferrer"
        className={
          "next-article-container " +
          (isNextArticleFocused && window_dimensions.isMobile
            ? "next-article-container--focused"
            : "")
        }
        id="next-article"
      >
        <div className="next-article-image-container">
          <div
            className={
              "next-article-image-gradient " +
              (darkMode ? "next-article-image-gradient--dark" : "")
            }
          />
          <div
            style={{ backgroundImage: "url(" + image + ")" }}
            className="next-article-image"
          />
        </div>
        <p
          className={
            "next-article-prompt " +
            (darkMode ? "next-article-prompt--dark" : "")
          }
        >
          {prompt}
        </p>
        <h1 className={"next-article-name " + (darkMode ? "text--dark" : "")}>
          {name}
        </h1>
      </a>
    );
  }
}

const selector = createSelector(
  state => state["selected_concept"],
  state => state["window_dimensions"],
  state => state["concepts"],
  (selected_concept, window_dimensions, concepts) => {
    return {
      selected_concept,
      window_dimensions,
      concepts
    };
  }
);

export default withRouter(connect(selector)(NextArticle));
