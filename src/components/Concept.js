import React, { Component } from "react";
import out from "../img/Out.svg";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import "../styles/Concept.css";

class Concept extends Component {
  render() {
    const {
      img_url,
      title,
      description,
      id,
      selected_concept,
      credits,
      medium
    } = this.props;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    return (
      <div
        id={id}
        className="concept-container"
        style={{ backgroundImage: "url(" + img_url + ")" }}
      >
        <div
          className={
            "concept-background " +
            (selected_concept === id ? "selected-concept-background " : "") +
            (selected_concept === id && isSafari
              ? "selected-concept-background-safari"
              : "")
          }
        >
          <div
            className={
              "concept-intro-container " +
              (selected_concept === id ? "selected-concept" : "")
            }
          >
            <h2>{title}</h2>
            <p>{description}</p>

            <a
              href={medium}
              target="_blank"
              rel="noopener noreferrer"
              ref={ref => (this.readOnMedium = ref)}
              className="read-on-medium"
            >
              <p>Read on Medium</p>
              <img src={out} alt="out" />
            </a>
          </div>
          {credits && <p className="credits">{credits}</p>}
        </div>
      </div>
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
