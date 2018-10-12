import { combineReducers } from 'redux';
import concepts from './reducer-concepts.js';
import tabs from './reducer-menu-tabs.js';
import panel from './reducer-panel.js';
import window_dimensions from './reducer-window.js';
import chapters from './reducer-chapters.js';
import selected_tab from './reducer-selected-tab.js';
import selected_concept from './reducer-selected-concept.js';
import navbar_hidden from './reducer-hide-navbar.js';
import selected_chapter from './reducer-selected-chapter.js';
import leave_panel from './reducer-leave-panel.js';
import burger from './reducer-burger.js';

const allReducers = combineReducers({
  concepts,
  tabs,
  panel,
  window_dimensions,
  chapters,
  selected_tab,
  selected_concept,
  navbar_hidden,
  selected_chapter,
  leave_panel,
  burger
});

export default allReducers;
