import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import {
  openPanel,
  hideNavbar,
  selectChapter,
  leavePanel
} from '../actions/index.js';
import close from '../img/Close.png';
import map from 'lodash/map';
import Chapter from './Chapter.js';
import Mogi from './Mogi.js';
import Chatroom from './Chatroom.js';

class Panel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      desync_panel_open: false,
      render_leave_hitbox: false
    }
  }

  handleScroll() {
    const { navbar_hidden, selected_chapter, window_dimensions } = this.props;
    const panel_content = document.getElementById("panel-content");
    const deltaY = panel_content.getBoundingClientRect().top - this.last_scroll_position;
    const page_bottom = window_dimensions.height;

    if (deltaY > 10) {
      navbar_hidden && this.props.hideNavbar(false);
    }
    else if (deltaY < -15) {
      !navbar_hidden && this.props.hideNavbar(true);
    }
    this.last_scroll_position = panel_content.getBoundingClientRect().top;

    const section_titles = document.getElementById("panel-content").getElementsByClassName("article-title");
    let distances_from_top = [], positive_values = []
    for (let i = 0; i < section_titles.length; i++) {
      distances_from_top[i] = page_bottom - 200 - section_titles[i].getBoundingClientRect().top;
      if (distances_from_top[i] >= 0) {
        positive_values[i] = distances_from_top[i];
      }
    }

    // If every distance is negative
    if (Math.max(...distances_from_top) < 0) {
      const index_to_select = distances_from_top.indexOf(Math.max(...distances_from_top));
      const id_to_select = section_titles[index_to_select].id;
      if (id_to_select !== selected_chapter) {
        this.props.selectChapter(id_to_select);
      }
    }
    else {
      const index_to_select = positive_values.indexOf(Math.min(...positive_values));
      const id_to_select = section_titles[index_to_select].id;
      if (id_to_select !== selected_chapter) {
        this.props.selectChapter(id_to_select);
      }
    }

    // Optimization for videos and universal_messages
    const media = document.getElementsByClassName("media");
    for (let i = 0; i < media.length; i++) {
      if (media[i].getBoundingClientRect().bottom < 0 || media[i].getBoundingClientRect().top > window_dimensions.height) {
        if (media[i].nodeName === "VIDEO") {
          media[i].pause();
        }
      }
      else {
        if (media[i].nodeName === "VIDEO") {
          media[i].play();
        }
      }
    }
  }

  componentDidMount() {
    const { chapters, selected_concept, window_dimensions } = this.props;
    const chapter_ids = Object.keys(chapters[selected_concept]);
    this.props.selectChapter(chapter_ids[0]);
    setTimeout(() => {
      this.setState({
        desync_panel_open: true
      })
    }, 10);
    setTimeout(() => {
      this.setState({
        render_leave_hitbox: true
      })
    }, 1000);

    this.last_scroll_position = 190;

    // Pause every video (workaround for mobile)
    const media = document.getElementsByClassName("media");
    for (let i = 0; i < media.length; i++) {
      if (media[i].nodeName === "VIDEO") {
        media[i].pause();
      }
    }

    // Handle key events
    this.pressKey = this.pressKey.bind(this);
    window.addEventListener("keydown", this.pressKey);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.pressKey);
    this.pressKey = undefined;
  }

  pressKey(e) {
    const { panel, chapters, selected_chapter, selected_concept } = this.props;
    const chapters_ids = Object.keys(chapters[selected_concept]);
    const selected_chapter_index = chapters_ids.indexOf(selected_chapter);

    e.preventDefault();
    if (e.keyCode === 27 && panel.isOpen) {
      this.props.openPanel(false, "");
    }
    else if (e.keyCode === 38 || e.keyCode === 37) {
      if (selected_chapter_index > 0) {
        const section_DOM = document.getElementById(chapters_ids[selected_chapter_index - 1]);
        section_DOM.scrollIntoView({
          behavior: "smooth"
        })
      }
    }
    else if (e.keyCode === 39 || e.keyCode === 40) {
      if (selected_chapter_index < chapters_ids.length - 1) {
        const section_DOM = document.getElementById(chapters_ids[selected_chapter_index + 1]);
        section_DOM.scrollIntoView({
          behavior: "smooth"
        })
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { panel } = this.props;

    if (prevProps.panel.isOpen && !panel.isOpen) {
      this.setState({
        desync_panel_open: false
      })
    }
  }

  panelStyle() {
    const { window_dimensions, leave_panel } = this.props;
    const { desync_panel_open } = this.state;

    if (!desync_panel_open) {
      return {
        transform: `translateY(-${window_dimensions.height+30}px)`
      }
    }
    else if (desync_panel_open && leave_panel) {
      return {
        transform: "translateY(-30px)",
        transitionDuration: "0.4s"
      }
    }
  }

  panelTopStyle() {
    const { desync_panel_open } = this.state;
    const { navbar_hidden } = this.props;

    if (!desync_panel_open) {
      return {
        transform: "translateY(-200px)"
      }
    }
    else if (navbar_hidden) {
      return {
        transform: "translateY(-56px)"
      }
    }
  }

  renderChapters() {
    const { chapters, selected_concept, selected_chapter } = this.props;

    if (window.innerWidth > 1000) {
      return(
        map(
          chapters[selected_concept],
          (chapter, id) => <Chapter key={id} {...chapter} id={id} />
        )
      );
    }
    else {
      return <Chapter {...chapters[selected_concept][selected_chapter]} id={selected_chapter} />
    }
  }

  renderArticle() {
    const { selected_concept } = this.props;

    if (selected_concept === "mogi") {
      return <Mogi />
    }
    else if (selected_concept === "chatroom") {
      return <Chatroom />
    }
  }

  render() {
    const { render_leave_hitbox } = this.state;
    const { concepts, selected_concept, leave_panel, window_dimensions, navbar_hidden } = this.props;

    return (
      <div className="panel">
        {window_dimensions.isDesktop &&
          <div
            style={this.panelTopStyle()}
            className="panel-top">
            <h1 style={navbar_hidden ? {opacity: 0} : {}} className="big-title">
              {concepts[selected_concept].title}
            </h1>
            <div className="concept-chapters">
              {this.renderChapters()}
            </div>
          </div>
        }
        <div
          onScroll={(e) => this.handleScroll(e)}
          style={this.panelStyle()}
          className="panel-container-box">
          <div className="panel-content">
            {this.renderArticle()}
          </div>
        </div>
        {render_leave_hitbox &&
          <div
            style={leave_panel ? { cursor: "pointer" } : {}}
            onClick={() => {
              if (leave_panel) {
                this.props.openPanel(false, "");
                this.props.leavePanel(false);
              }
            }}
            onMouseEnter={() => this.props.leavePanel(true)}
            onMouseLeave={() => this.props.leavePanel(false)}
            className="leave-hitbox" />
        }
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    openPanel,
    hideNavbar,
    selectChapter,
    leavePanel
  }, dispatch)
}

const selector = createSelector(
  state => state['window_dimensions'],
  state => state['panel'],
  state => state['chapters'],
  state => state['selected_concept'],
  state => state['concepts'],
  state => state['navbar_hidden'],
  state => state['selected_chapter'],
  state => state['leave_panel'],
  (
    window_dimensions,
    panel,
    chapters,
    selected_concept,
    concepts,
    navbar_hidden,
    selected_chapter,
    leave_panel
) => {
    return  {
      window_dimensions,
      panel,
      chapters,
      selected_concept,
      concepts,
      navbar_hidden,
      selected_chapter,
      leave_panel
    };
  }
);

export default connect(selector, matchDispatchToProps)(Panel);
