import React, { Component } from "react";
import out from "../img/Out.svg";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import "../styles/Concept.css";

class Concept extends Component {
  render() {
    const { img_url, title, description, medium, gif } = this.props;

    return (
      <a
        href={medium}
        target="_blank"
        rel="noopener noreferrer"
        className="concept-container"
      >
        <div
          style={{ backgroundImage: "url(" + img_url + ")" }}
          className="concept-image"
        >
          {gif && <span className="gif-info">GIF</span>}
        </div>
        <h2 className="concept-title">{title}</h2>
        <p className="concept-description">{description}</p>
        <p className="medium-text">
          Read on Medium
          <span className="out-icon">
            <img src={out} alt="out" />
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
