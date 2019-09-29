import React, { Component } from "react";
import out from "../img/Out.svg";

export default class ExternalLink extends Component {
  render() {
    const { index, main, website, link } = this.props;
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="external-link"
      >
        <p className="external-link-main">{main}</p>
        <p className="external-link-website">{website}</p>
        <img className="out-icon" src={out} alt="out" />
      </a>
    );
  }
}
