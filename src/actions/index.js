export const openPanel = isOpen => {
  return {
    type: "OPEN_PANEL",
    isOpen
  };
};

export const openBurger = payload => {
  return {
    type: "OPEN_BURGER",
    payload
  };
};

export const openIntro = payload => {
  return {
    type: "OPEN_INTRO",
    payload
  };
};

export const playVideo = payload => {
  return {
    type: "PLAY_VIDEO",
    payload
  };
};

export const leavePanel = payload => {
  return {
    type: "LEAVE_PANEL",
    payload
  };
};

export const currentSection = id => {
  return {
    type: "CURRENT_SECTION",
    id
  };
};

export const showIntro = (index, payload) => {
  return {
    type: "SHOW_INTRO",
    index,
    payload
  };
};

export const disappearIntro = (index, payload) => {
  return {
    type: "DISAPPEAR_INTRO",
    index,
    payload
  };
};

export const selectTab = tab => {
  return {
    type: "SELECT_TAB",
    tab
  };
};

export const selectConcept = concept => {
  return {
    type: "SELECT_CONCEPT",
    concept
  };
};

export const storeWindowDimensions = (width, height) => {
  return {
    type: "STORE_WINDOW_DIMENSIONS",
    width,
    height
  };
};

export const switchToMobile = () => {
  return {
    type: "SWITCH_TO_MOBILE"
  };
};

export const switchToDesktop = () => {
  return {
    type: "SWITCH_TO_DESKTOP"
  };
};
