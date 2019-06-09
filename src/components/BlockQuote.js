import React, { Component } from "react";
import "../styles/BlockQuote.css";

export default class BlockQuote extends Component {
  render() {
    const { quote, shadow } = this.props;
    return (
      <div className="block-quote">
        <p className="quote">{quote}</p>
        <span className="quote-sign">‘’</span>
        <span className="quote-shadow">{shadow}</span>
      </div>
    );
  }
}
