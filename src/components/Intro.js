import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import white_logo from '../img/WhiteLogo.png';

class Intro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      intro_finished: false
    }
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({intro_finished: true});
    // }, 3500);
  }

  introStyle() {
    const { window_dimensions } = this.props;
    const { intro_finished } = this.state;

    if (intro_finished) {
      return {
        transform: `translateY(-${window_dimensions.height+30}px)`,
        backgroundColor: "rgba(32,31,31,0)"
      }
    }
  }

  render() {
    return(
      <div style={this.introStyle()} className="intro">
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

const selector = createSelector(
  state => state['window_dimensions'],
  (
    window_dimensions,
) => {
    return  {
      window_dimensions,
    };
  }
);


export default connect(selector)(Intro);
