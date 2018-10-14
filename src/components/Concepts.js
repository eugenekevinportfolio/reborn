import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import map from 'lodash/map';
import Concept from './Concept.js';
import '../styles/Section.css';

class Concepts extends Component {
  renderConcepts() {
    const { concepts } = this.props;

    return(
      map(
        concepts,
        (concept, id) => <Concept {...concept} key={id} id={id} />
      )
    );
  }

  render() {
    return (
      <div id="concepts" className="section">
        <div className="section-head">
          <h2 className="section-title">
            CONCEPTS
          </h2>
          <div className="section-bar" />
        </div>
        {this.renderConcepts()}
      </div>
    );
  }
}

const selector = createSelector(
  state => state['concepts'],
  (
    concepts
) => {
    return {
      concepts
    };
  }
);

export default connect(selector)(Concepts);
