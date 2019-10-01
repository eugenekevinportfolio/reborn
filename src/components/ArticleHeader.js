import React, { Component } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { withRouter } from "react-router-dom";
import $ from "jquery";
import back from "../img/Back.svg";
import { Link } from "react-router-dom";

class ArticleHeader extends Component {
  render() {
    const {
      hasScrolled,
      hasScrolledFast,
      concepts,
      selected_concept
    } = this.props;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const darkMode = selected_concept && concepts[selected_concept].darkMode;

    return (
      <div
        className={
          "header-container--article " +
          (hasScrolled && !darkMode ? "header-container--border " : "") +
          (hasScrolled && darkMode ? "header-container--border--dark " : "") +
          (hasScrolledFast ? "header-container--hidden " : "") +
          (isSafari && hasScrolled && darkMode
            ? "header-container--border--dark--safari "
            : "") +
          (isSafari && hasScrolled && !darkMode
            ? "header-container--border--safari "
            : "")
        }
      >
        <div className="max-width header-flex">
          <Link className="header-left-side" to="/">
            <button
              className={
                "button button--round " + (darkMode ? "button--dark" : "")
              }
            >
              <img alt="back" src={back} />
            </button>
            <p className={"back-to-home " + (darkMode ? "text--dark" : "")}>
              Back to Home
            </p>
          </Link>
          <p
            onClick={() => {
              $([document.documentElement, document.body]).animate(
                {
                  scrollTop: $("#hero").offset().top
                },
                800
              );
            }}
            className={
              "article-chapter " + (darkMode ? "article-chapter--dark" : "")
            }
          >
            {selected_concept && concepts[selected_concept].title}
            <span>
              {selected_concept && concepts[selected_concept].subheader}
            </span>
          </p>
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

export default withRouter(connect(selector)(ArticleHeader));
