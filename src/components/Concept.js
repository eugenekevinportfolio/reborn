import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import out from "../img/Out.svg";
import read from "../img/Read.svg";
import map from "lodash/map";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { bindActionCreators } from "redux";
import {
  selectConcept,
  previewConcept,
  activateGlobalDarkMode
} from "../actions/index.js";
import "../styles/Concept.css";
import ExternalLink from "./ExternalLink";
import { Link } from "react-router-dom";

class Concept extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activatePreview: false
    };
  }
  renderExternalLinks() {
    const { activatePreview } = this.state;
    const { external_links } = this.props;

    return map(external_links, (link, index) => (
      <ExternalLink
        key={index}
        index={index}
        {...link}
        activatePreview={activatePreview}
      />
    ));
  }

  render() {
    const { activatePreview } = this.state;
    const {
      title,
      description,
      medium,
      id,
      local,
      history,
      img_article,
      globalDarkMode
    } = this.props;
    const readIcon = local ? read : out;

    return (
      <div className="concept-container" id={id}>
        <div
          className={
            "concept-preview-container " +
            (activatePreview ? "concept-preview-container--visible" : "")
          }
        >
          <div
            className={
              "concept-preview-gradient " +
              (globalDarkMode ? "concept-preview-gradient--dark" : "")
            }
          />
          <div
            style={{ backgroundImage: "url(" + img_article + ")" }}
            className="concept-preview"
          />
        </div>
        <div className="concept-content">
          <div className="concept-content-left">
            <h2
              className={
                "concept-title " + (globalDarkMode ? "concept-title--dark" : "")
              }
            >
              {title}
            </h2>
            <p
              className={
                "concept-type " + (globalDarkMode ? "concept-type--dark" : "")
              }
            >
              Case Study
            </p>
            <div className="concept-links-container">
              {this.renderExternalLinks()}
            </div>
          </div>
          <div className="concept-content-right">
            <p
              className={
                "concept-description " +
                (globalDarkMode ? "concept-description--dark" : "")
              }
            >
              {description}
            </p>
            {local ? (
              <Link
                to={`/articles/${id}`}
                className="read-btn"
                onMouseEnter={() => {
                  this.props.previewConcept(true);
                  this.setState({ activatePreview: true });
                }}
                onMouseLeave={() => {
                  this.props.previewConcept(false);
                  this.setState({ activatePreview: false });
                }}
              >
                <img
                  id={local ? "read-local-icon" : ""}
                  className="read-icon"
                  src={readIcon}
                  alt="out"
                />
              </Link>
            ) : (
              <a
                href={medium}
                target="_blank"
                rel="noreferrer noopener"
                className="read-btn"
                onMouseEnter={() => {
                  this.props.previewConcept(true);
                  this.setState({ activatePreview: true });
                }}
                onMouseLeave={() => {
                  this.props.previewConcept(false);
                  this.setState({ activatePreview: false });
                }}
              >
                <img
                  id={local ? "read-local-icon" : ""}
                  className="read-icon"
                  src={readIcon}
                  alt="out"
                />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectConcept,
      previewConcept,
      activateGlobalDarkMode
    },
    dispatch
  );
}

const selector = createSelector(
  state => state["selected_concept"],
  state => state["globalDarkMode"],
  (selected_concept, globalDarkMode) => {
    return {
      selected_concept,
      globalDarkMode
    };
  }
);

export default withRouter(
  connect(
    selector,
    matchDispatchToProps
  )(Concept)
);
