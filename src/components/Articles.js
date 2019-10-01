import React, { Component } from "react";
import map from "lodash/map";
import Concept from "./Concept";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import Breadcrumb from "./Breadcrumb";
import MediaQuery from "react-responsive";

class Articles extends Component {
  renderArticles() {
    const { concepts } = this.props;
    return map(concepts, (concept, id) => (
      <Concept key={id} id={id} {...concept} />
    ));
  }

  render() {
    return (
      <div id="articles" className="section max-width">
        {this.renderArticles()}
        <MediaQuery minWidth={710}>
          <Breadcrumb />
        </MediaQuery>
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
