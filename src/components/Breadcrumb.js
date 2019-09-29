import React, { Component } from "react";
import map from "lodash/map";
import $ from "jquery";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import "../styles/Breadcrumb.css";

class Breadcrumb extends Component {
  onBreadcrumbLinkClick(section) {
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $("#" + section).offset().top
      },
      800
    );
  }

  renderBreadcrumbLinks() {
    const { concepts, selected_concept, current_section } = this.props;
    const conceptsKeys = Object.keys(concepts);
    const selected_concept_index = conceptsKeys.findIndex(
      key => key === selected_concept
    );
    const translationValue =
      selected_concept_index * 100 +
      "%" +
      " + " +
      selected_concept_index * 24 +
      "px";

    return map(concepts, (concept, id) => (
      <p
        key={id}
        onClick={() => this.onBreadcrumbLinkClick(id)}
        className={
          "breadcrumb-link " +
          (selected_concept !== id ? "breadcrumb-link--not-selected " : "") +
          (current_section !== "articles" ? "breadcrumb-link--hidden" : "")
        }
        style={{ transform: `translate(calc(${translationValue}))` }}
      >
        {concept.title}
      </p>
    ));
  }

  render() {
    const { current_section } = this.props;
    return (
      <div className="breadcrumb-container">
        <div
          className={
            "pagination " +
            (current_section !== "articles" ? "pagination--hidden" : "")
          }
        />
        {this.renderBreadcrumbLinks()}
      </div>
    );
  }
}

const selector = createSelector(
  state => state["concepts"],
  state => state["selected_concept"],
  state => state["current_section"],
  (concepts, selected_concept, current_section) => {
    return {
      concepts,
      selected_concept,
      current_section
    };
  }
);

export default connect(selector)(Breadcrumb);
