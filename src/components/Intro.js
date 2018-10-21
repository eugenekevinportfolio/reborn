import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import white_logo from '../img/WhiteLogo.png';
import {
  openIntro
} from '../actions/index.js';

class Intro extends Component {
  introStyle() {
    const { window_dimensions, intro } = this.props;

    if (!intro) {
      return {
        transform: `translateY(-${window_dimensions.height+30}px)`,
        backgroundColor: "rgba(32,31,31,0)"
      }
    }
  }

  render() {
    return(
      <div onClick={() => this.props.openIntro(false)} style={this.introStyle()} className="intro">
        <img
          src={white_logo}
          alt="White Logo"
          className="logo" />
        <div className="intro-content">
          <h1>
            Kevin Eugène
          </h1>
          <div className="intro-labels">
            <p>
              Designer
            </p>
            <div className="separator" />
            <p>
              Software Engineer
            </p>
            <div className="separator" />
            <p>
              Storyteller
            </p>
          </div>
        </div>
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    openIntro
  }, dispatch)
}

const selector = createSelector(
  state => state['window_dimensions'],
  state => state['intro'],
  (
    window_dimensions,
    intro
) => {
    return  {
      window_dimensions,
      intro
    };
  }
);


export default connect(selector, matchDispatchToProps)(Intro);
