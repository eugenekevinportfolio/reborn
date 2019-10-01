import { combineReducers } from "redux";
import concepts from "./reducer-concepts.js";
import tabs from "./reducer-menu-tabs.js";
import panel from "./reducer-panel.js";
import window_dimensions from "./reducer-window.js";
import chapters from "./reducer-chapters.js";
import selected_tab from "./reducer-selected-tab.js";
import selected_concept from "./reducer-selected-concept.js";
import video_played from "./reducer-play-video.js";
import selected_chapter from "./reducer-selected-chapter.js";
import leave_panel from "./reducer-leave-panel.js";
import isBurgerOpen from "./reducer-burger.js";
import intro from "./reducer-intro.js";
import current_section from "./reducer-current-section";
import techPress from "./reducer-techpress";
import isPreviewOn from "./reducer-preview";
import globalDarkMode from "./reducer-dark-mode";

const allReducers = combineReducers({
  concepts,
  current_section,
  tabs,
  panel,
  window_dimensions,
  chapters,
  selected_tab,
  selected_concept,
  video_played,
  selected_chapter,
  leave_panel,
  isBurgerOpen,
  intro,
  techPress,
  isPreviewOn,
  globalDarkMode
});

export default allReducers;
