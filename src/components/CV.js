import React, { Component } from "react";
import cv from "../img/CV.jpg";
import cvPdf from "../img/Resume.pdf";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import "../styles/CV.css";

class CV extends Component {
  render() {
    const { antiHeader, panel } = this.props;
    return (
      <div
        className={
          "cv-panel " +
          (antiHeader ? "cv-panel--anti " : "") +
          (panel.isOpen ? "cv-panel--open" : "")
        }
      >
        <div className="cv-center">
          <a href={cvPdf} download="SeeYouSoon-KevinEugene">
            <img src={cv} className="cv-image" alt="cv" />
          </a>
          <a
            className="cv-button-link"
            href={cvPdf}
            download="SeeYouSoon-KevinEugene"
          >
            <button className="button cv-button">Download CV</button>
          </a>
        </div>
      </div>
    );
  }
}

const selector = createSelector(
  state => state["panel"],
  panel => {
    return {
      panel
    };
  }
);

export default connect(selector)(CV);
