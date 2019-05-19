import React, { Component } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { bindActionCreators } from "redux";
import { openBurger } from "../actions/index.js";

class Burger extends Component {
  render() {
    const { isBurgerOpen } = this.props;
    return (
      <div
        className="burger"
        onClick={() => this.props.openBurger(!isBurgerOpen)}
      >
        <div className={"top-bar " + (isBurgerOpen ? "top-bar-open" : "")} />
        <div
          className={"bottom-bar " + (isBurgerOpen ? "bottom-bar-open" : "")}
        />
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
)(Burger);
