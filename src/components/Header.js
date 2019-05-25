import React, { Component } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { bindActionCreators } from "redux";
import $ from "jquery";
import "../styles/Header.css";
import MediaQuery from "react-responsive";
import Burger from "./Burger";
import me from "../img/Me.jpeg";
import MobileMenu from "./MobileMenu";
import { openPanel } from "../actions/index.js";

class Header extends Component {
  onLogoClick() {
    const { panel } = this.props;

    if (!panel.isOpen) {
      $([document.documentElement, document.body]).animate(
        {
          scrollTop: $("#hero").offset().top
        },
        800
      );
    } else {
      this.props.openPanel(false);
      document.body.style.height = "unset";
      document.body.style.overflow = "unset";
    }
  }
  render() {
    const { hasScrolled, antiHeader, panel } = this.props;
    return (
      <>
        <div
          className={
            "header-container " +
            (hasScrolled ? "header-container--border " : "") +
            (antiHeader ? "header-container--anti" : "")
          }
        >
          <div className="max-width header-flex">
            <h1 onClick={() => this.onLogoClick()} className="logo-name">
              Kevin Eugene
            </h1>
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
  panel => {
    return {
      panel
    };
  }
);

export default connect(
  selector,
  matchDispatchToProps
)(Header);
