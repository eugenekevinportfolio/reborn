import React, { Component } from "react";
import map from "lodash/map";
import Concept from "./Concept";
import { connect } from "react-redux";
import { createSelector } from "reselect";

class Articles extends Component {
  renderArticles() {
    const { concepts } = this.props;
    return map(concepts, (concept, id) => (
      <Concept key={id} id={id} {...concept} />
    ));
  }

  render() {
    return (
      <div id="articles" className="section dark-section">
        <div className="max-width">
          <p className="section-sub">Case Studies</p>
          <h3 className="section-title">Articles</h3>
          <div className="concepts-grid">{this.renderArticles()}</div>
        </div>
      </div>
    );
  }
}

const selector = createSelector(
  state => state["concepts"],
  concepts => {
    return {
      concepts
    };
  }
);

export default connect(selector)(Articles);
