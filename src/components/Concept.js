import React, { Component } from "react";
import out from "../img/Out.svg";
import read from "../img/Read.svg";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import "../styles/Concept.css";

class Concept extends Component {
  render() {
    const {
      img_url,
      title,
      description,
      medium,
      gif,
      id,
      local,
      link
    } = this.props;
    const readText = local ? "Read Case Study" : "Read on Medium";
    const readIcon = local ? read : out;
    const readLink = local ? link : medium;

    return (
      <a
        href={readLink}
        target={local ? "" : "_blank"}
        rel="noopener noreferrer"
        className="concept-container"
      >
        <div
          style={{
            backgroundImage: "url(" + img_url + ")",
            backgroundPosition: id === "ipadOS" && "bottom"
          }}
          className="concept-image"
        >
          {gif && <span className="gif-info">GIF</span>}
        </div>
        <h2 className="concept-title">{title}</h2>
        <p className="concept-description">{description}</p>
        <p className="medium-text">
          {readText}
          <span className="out-icon">
            <img src={readIcon} alt="out" />
          </span>
        </p>
      </a>
    );
  }
}

const selector = createSelector(
  state => state["selected_concept"],
  selected_concept => {
    return {
      selected_concept
    };
  }
);

export default connect(selector)(Concept);
