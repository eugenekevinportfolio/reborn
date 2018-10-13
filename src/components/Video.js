import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

class Video extends Component {
  render() {
    const { src, dark_mode } = this.props;
    const description = this.props.children;
    return(
      <div className="media-container">
        <video autoPlay playsInline src={src} loop className="media">
          <source src={src} />
        </video>
        <p
          style={dark_mode ? {borderColor: "white", color: "white"} : {}}
          className="media-description">
          {description}
        </p>
      </div>
    );
  }
}

const selector = createSelector(
  state => state['dark_mode'],
  (
    dark_mode,
) => {
    return  {
      dark_mode
    };
  }
);

export default connect(selector)(Video);
