import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import out from "../img/Out.svg";
import read from "../img/Read.svg";
import map from "lodash/map";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { bindActionCreators } from "redux";
import { selectConcept, previewConcept } from "../actions/index.js";
import "../styles/Concept.css";
import ExternalLink from "./ExternalLink";

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
      link,
      history,
      img_article
    } = this.props;
    const readIcon = local ? read : out;
    const readLink = local ? link : medium;

    return (
      <div className="concept-container" id={id}>
        <div
          className={
            "concept-preview-container " +
            (activatePreview ? "concept-preview-container--visible" : "")
          }
        >
          <div className="concept-preview-gradient" />
          <div
            style={{ backgroundImage: "url(" + img_article + ")" }}
            className="concept-preview"
          />
        </div>
        <div className="concept-content">
          <div className="concept-content-left">
            <h2 className="concept-title">{title}</h2>
            <p className="concept-type">Case Study</p>
            <div className="concept-links-container">
              {this.renderExternalLinks()}
            </div>
          </div>
          <div className="concept-content-right">
            <p className="concept-description">{description}</p>
            <a
              href={readLink}
              target={local ? "" : "_blank"}
              rel="noopener noreferrer"
              className="read-btn"
              onMouseEnter={() => {
                this.props.previewConcept(true);
                this.setState({ activatePreview: true });
              }}
              onMouseLeave={() => {
                this.props.previewConcept(false);
                this.setState({ activatePreview: false });
              }}
              onClick={e => {
                this.props.selectConcept(id);
                if (local) {
                  e.preventDefault();
                  history.push("/articles/" + id);
                }
              }}
            >
              <img
                id={local ? "read-local-icon" : ""}
                className="read-icon"
                src={readIcon}
                alt="out"
              />
            </a>
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
      previewConcept
    },
    dispatch
  );
}

const selector = createSelector(
  state => state["selected_concept"],
  selected_concept => {
    return {
      selected_concept
    };
  }
);

export default withRouter(
  connect(
    selector,
    matchDispatchToProps
  )(Concept)
);
