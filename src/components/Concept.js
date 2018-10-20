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
import map from 'lodash/map';
import Publisher from './Publisher.js';

class Concept extends Component {
  renderPublishers() {
    const { publishers } = this.props;

    return(
      map(
        publishers,
        (publisher, id) => <Publisher key={id} id={id} {...publisher} />
      )
    );
  }

  render() {
    const { title, date, description, img_url, id, medium, ready } = this.props;

    return (
      <div className="concept-box">
        <a
          href={!ready && medium}
          target="_blank" rel="noopener noreferrer"
          onClick={() => {
            if (ready) {
              this.props.selectConcept(id);
              this.props.openPanel(true, "concepts");
            }
          }}
          className="concept">
          <div className="concept-left">
            <p className="hat">
              {date.toUpperCase()}
            </p>
            <h2 className="head">
              {title}
            </h2>
            <p className="description">
              {description}
            </p>
          </div>
          <div className="concept-right">
            <div style={{backgroundImage: "url(" + img_url + ")"}} className="thumbnail" />
          </div>

          {/* <div className="CTA-row">
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
          </div> */}
        </a>
        {/* {publishers &&
          <div className="publishers-box">
            <p className="hat">
              PUBLISHED BY
            </p>
            <div className="publishers-container">
              {this.renderPublishers()}
            </div>
          </div>} */}
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
