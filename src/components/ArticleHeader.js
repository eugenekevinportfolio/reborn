import React, { Component } from "react";
import $ from "jquery";
import back from "../img/Back.svg";

export default class ArticleHeader extends Component {
  onBack() {
    const { history } = this.props;

    history.push("/");
  }

  render() {
    const { hasScrolled, hasScrolledFast } = this.props;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    return (
      <div
        className={
          "header-container--article " +
          (hasScrolled ? "header-container--border--dark " : "") +
          (hasScrolledFast ? "header-container--hidden " : "") +
          (isSafari && hasScrolled
            ? "header-container--border--dark--safari "
            : "")
        }
      >
        <div className="max-width header-flex">
          <div className="header-left-side" onClick={() => this.onBack()}>
            <button className="button--dark button--round">
              <img alt="back" src={back} />
            </button>
            <h1 className="logo-name logo-name--dark back-to-home">
              Back to Home
            </h1>
          </div>
          <p
            onClick={() => {
              $([document.documentElement, document.body]).animate(
                {
                  scrollTop: $("#hero").offset().top
                },
                800
              );
            }}
            className="article-chapter--dark"
          >
            Youtube 2.0
            <span>A Modern Streaming Platform</span>
          </p>
        </div>
      </div>
    );
  }
}
