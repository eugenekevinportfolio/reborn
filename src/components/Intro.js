import React, { Component } from "react";

export default class Intro extends Component {
  render() {
    const { content, show, disappear, lastIntro } = this.props;

    if (!lastIntro) {
      return (
        <p
          className={
            "intro " +
            (show ? "shown-intro " : "") +
            (disappear ? "disappeared-intro" : "")
          }
        >
          {content}
        </p>
      );
    }
    return (
      <a
        href="mailto:kevin.eugene@hec.edu"
        className={
          "intro " +
          (show ? "shown-intro " : "") +
          (disappear ? "disappeared-intro" : "")
        }
      >
        {content}
      </a>
    );
  }
}
