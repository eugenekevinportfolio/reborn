export const openPanel = (isOpen, flavor) => {
  return(
    {
      type: "OPEN_PANEL",
      isOpen,
      flavor
    }
  );
}

export const openBurger = (payload) => {
  return(
    {
      type: "OPEN_BURGER",
      payload
    }
  );
}

export const openIntro = (payload) => {
  return(
    {
      type: "OPEN_INTRO",
      payload
    }
  );
}

export const hideNavbar = (payload) => {
  return(
    {
      type: "HIDE_NAVBAR",
      payload
    }
  );
}

export const leavePanel = (payload) => {
  return(
    {
      type: "LEAVE_PANEL",
      payload
    }
  );
}

export const selectChapter = (id) => {
  return(
    {
      type: "SELECT_CHAPTER",
      id
    }
  );
}

export const selectTab = (tab) => {
  return(
    {
      type: "SELECT_TAB",
      tab
    }
  );
}

export const selectConcept = (concept) => {
  return(
    {
      type: "SELECT_CONCEPT",
      concept
    }
  );
}

export const storeWindowDimensions = (width, height) => {
  return(
    {
      type: "STORE_WINDOW_DIMENSIONS",
      width,
      height
    }
  );
}

export const switchToMobile = () => {
  return(
    {
      type: "SWITCH_TO_MOBILE",
    }
  );
};

export const switchToDesktop = () => {
  return(
    {
      type: "SWITCH_TO_DESKTOP",
    }
  );
};
