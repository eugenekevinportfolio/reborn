import React, { Component } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { bindActionCreators } from "redux";
import { openBurger } from "../actions/index.js";
import resume from "../img/Resume.pdf";
import me from "../img/Me.jpeg";
import $ from "jquery";

class MobileMenu extends Component {
  render() {
    const { isBurgerOpen, antiHeader } = this.props;
    return (
      <div
        className={
          "mobile-menu " +
          (isBurgerOpen ? "mobile-menu--open " : "") +
          (antiHeader ? "mobile-menu--anti" : "")
        }
      >
        <a
          className="section-title"
          href={resume}
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume
        </a>
        <a
          className="section-title highlight-text"
          href="mailto:kevin.eugene@hec.edu"
        >
          Say Hi!
        </a>
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      openBurger
    },
    dispatch
  );
}

const selector = createSelector(
  state => state["isBurgerOpen"],
  isBurgerOpen => {
    return {
      isBurgerOpen
    };
  }
);

export default connect(
  selector,
  matchDispatchToProps
)(MobileMenu);
