import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';

class Chapter extends Component {
  chapterStyle() {
    const { selected_chapter, id } = this.props;

    if (id === selected_chapter) {
      return {
        opacity: 1,
        transitionDuration: "0.4s"
      }
    }
  }

  render() {
    const { name, id } = this.props;
    return (
      <p
        onClick={() => {
          const section_DOM = document.getElementById(id);
          section_DOM.scrollIntoView({
            behavior: "smooth"
          })
        }}
        style={this.chapterStyle()}>
        {name}
      </p>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch)
}

const selector = createSelector(
  state => state['concepts'],
  state => state['selected_chapter'],
  (
    concepts,
    selected_chapter
) => {
    return  {
      concepts,
      selected_chapter
    };
  }
);

export default connect(selector, matchDispatchToProps)(Chapter);
