import React, { Component } from "react";
import map from "lodash/map";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import "../styles/TechPress.css";
import out from "../img/Out.svg";

class TechPress extends Component {
  renderTechLinks() {
    const { techPress } = this.props;

    return map(techPress, (techLink, index) => {
      return (
        <a
          key={index}
          href={techLink.link}
          className="tech-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="tech-link-main">{techLink.main}</p>
          <p className="tech-link-website">
            {techLink.website}
            <span className="out-icon">
              <img src={out} alt="out" />
            </span>
          </p>
        </a>
      );
    });
  }
  render() {
    return (
      <div id="techpress" className="section">
        <div className="max-width">
          <p className="section-sub">They talk about my ideas</p>
          <h3 className="section-title">In the Tech Press</h3>
          <div className="tech-links-grid">{this.renderTechLinks()}</div>
        </div>
      </div>
    );
  }
}

const selector = createSelector(
  state => state["techPress"],
  techPress => {
    return {
      techPress
    };
  }
);

export default connect(selector)(TechPress);
