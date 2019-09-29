import React, { Component } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { bindActionCreators } from "redux";
import $ from "jquery";
import "../styles/Header.css";
import MediaQuery from "react-responsive";
import Burger from "./Burger";
import map from "lodash/map";
import me from "../img/Me.jpeg";
import MobileMenu from "./MobileMenu";
import { openPanel } from "../actions/index.js";

class Header extends Component {
  onCarouselItemClick(section) {
    const { panel } = this.props;

    if (!panel.isOpen) {
      $([document.documentElement, document.body]).animate(
        {
          scrollTop: $("#" + section).offset().top
        },
        800
      );
    } else {
      this.props.openPanel(false);
      document.body.style.height = "unset";
      document.body.style.overflow = "unset";
    }
  }

  renderCarouselItems() {
    const { current_section } = this.props;
    const carouselItems = [
      {
        copy: "Kevin Eugene",
        id: "hero"
      },
      {
        copy: "Case Studies",
        id: "articles"
      },
      {
        copy: "Connect",
        id: "connect"
      }
    ];
    const current_section_index = carouselItems.findIndex(item => {
      return item.id === current_section;
    });
    const translationValue =
      -current_section_index * 100 +
      "% + " +
      -current_section_index * 12 +
      "px";

    return map(carouselItems, (item, index) => (
      <h1
        key={index}
        onClick={() => this.onCarouselItemClick(item.id)}
        className={
          "header-carousel-item " +
          (index !== current_section_index
            ? "header-carousel-item--hidden"
            : "")
        }
        style={{ transform: `translateY(calc(${translationValue}))` }}
      >
        {item.copy}
      </h1>
    ));
  }

  render() {
    const { hasScrolled, antiHeader, panel, isPreviewOn } = this.props;
    return (
      <>
        <div
          className={
            "header-container " +
            (hasScrolled ? "header-container--border " : "") +
            (antiHeader ? "header-container--anti " : "") +
            (isPreviewOn ? "header-container--invisible " : "")
          }
        >
          <div className="max-width header-flex">
            <div className="header-carousel">{this.renderCarouselItems()}</div>
            <MediaQuery minWidth={710}>
              <ul className="header-links">
                <li
                  className="header-link"
                  onClick={() => {
                    this.props.openPanel(!panel.isOpen);
                    if (!panel.isOpen) {
                      document.body.style.height = "100%";
                      document.body.style.overflow = "hidden";
                    } else {
                      document.body.style.height = "unset";
                      document.body.style.overflow = "unset";
                    }
                  }}
                >
                  Resume
                </li>
                <a
                  className={
                    "header-link highlight-text " +
                    (panel.isOpen ? "header-link--faded" : "")
                  }
                  href="mailto:kevin.eugene@hec.edu"
                >
                  Say Hi!
                </a>
                <div
                  onClick={() => {
                    $([document.documentElement, document.body]).animate(
                      {
                        scrollTop: $("#connect").offset().top
                      },
                      800
                    );
                  }}
                  className={
                    "small-avatar " + (panel.isOpen ? "header-link--faded" : "")
                  }
                  style={{ backgroundImage: "url(" + me + ")" }}
                />
              </ul>
            </MediaQuery>
            <MediaQuery maxWidth={709}>
              <Burger />
            </MediaQuery>
          </div>
        </div>
        <MediaQuery maxWidth={709}>
          <MobileMenu antiHeader={antiHeader} />
        </MediaQuery>
      </>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      openPanel
    },
    dispatch
  );
}

const selector = createSelector(
  state => state["panel"],
  state => state["current_section"],
  state => state["isPreviewOn"],
  (panel, current_section, isPreviewOn) => {
    return {
      panel,
      current_section,
      isPreviewOn
    };
  }
);

export default connect(
  selector,
  matchDispatchToProps
)(Header);
