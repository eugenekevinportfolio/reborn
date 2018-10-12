import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import {
  openPanel,
  selectConcept,
  selectTab
} from '../actions/index.js';
import reddit_img from '../img/RedditLogo.png';
import medium_img from '../img/MediumLogo.png';

class Concept extends Component {
  render() {
    const { title, date, description, id, concepts, ready, reddit, medium } = this.props;
    const concepts_keys = Object.keys(concepts);
    const last_id = concepts_keys[concepts_keys.length - 1];

    return (
      <div
        style={id === last_id ? { borderBottom:"none" } : {}}
        className="concept">
        <p className="hat">
          {date.toUpperCase()}
        </p>
        <h2 className="head">
          {title}
        </h2>
        <p className="description">
          {description}
        </p>
        <div className="CTA-row">
          {ready &&
            <div
              onClick={() => {
                this.props.selectConcept(id);
                this.props.selectTab("concepts");
                this.props.openPanel(true, "concepts");
              }}
              className="CTA">
              READ STORY
            </div>
          }
          <a href={medium} target="_blank" rel="noopener noreferrer" className="sub-CTA">
            <img id="medium" src={medium_img} alt="Medium" />
          </a>
          {reddit &&
            <a href={reddit} target="_blank" rel="noopener noreferrer" className="sub-CTA">
              <img id="reddit" src={reddit_img} alt="Reddit" />
            </a>
          }
        </div>
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    openPanel,
    selectConcept,
    selectTab
  }, dispatch)
}

const selector = createSelector(
  state => state['concepts'],
  (
    concepts
) => {
    return  {
      concepts
    };
  }
);

export default connect(selector, matchDispatchToProps)(Concept);
