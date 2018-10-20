import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

class Chapter extends Component {
  chapterStyle() {
    const { selected_chapter, id, selected_concept, chapters } = this.props;
    const chapters_id = Object.keys(chapters[selected_concept]);
    const last_chapter_id = chapters_id[chapters_id.length - 1];

    if (id === selected_chapter) {
      if ((id === last_chapter_id) || window.innerWidth <= 1000) {
        return {
          opacity: 1,
          transitionDuration: "0.4s",
          marginRight: 0
        }
      }
      else {
        return {
          opacity: 1,
          transitionDuration: "0.4s"
        }
      }
    }
    else {
      if ((id === last_chapter_id) || window.innerWidth <= 1000) {
        return {
          marginRight: 0
        }
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

const selector = createSelector(
  state => state['selected_chapter'],
  state => state['chapters'],
  state => state['selected_concept'],
  (
    selected_chapter,
    chapters,
    selected_concept
) => {
    return  {
      selected_chapter,
      chapters,
      selected_concept
    };
  }
);

export default connect(selector)(Chapter);
