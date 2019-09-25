import React, { Component } from "react";
import "../styles/BlockQuote.css";

export default class BlockQuote extends Component {
  render() {
    const { quote, shadow, darkMode } = this.props;
    return (
      <div className="block-quote">
        <p className={"quote " + (darkMode ? "text--dark" : "")}>{quote}</p>
        <span className={"quote-sign " + (darkMode ? "text--dark" : "")}>
          ‘’
        </span>
        <span className={"quote-shadow " + (darkMode ? "text--dark" : "")}>
          {shadow}
        </span>
      </div>
    );
  }
}
