const initialState = {
  mogi: {
    intro1: {
      name: "Live Notifications"
    },
    siri: {
      name: "Non-intrusive Siri"
    },
    accessibility: {
      name: "Siri actions"
    },
    clipboard: {
      name: "Clipboard"
    },
    backstory: {
      name: "Backstory"
    }
  },
  chatroom: {
    intro2: {
      name: "Intro"
    },
    scope: {
      name: "Expansion"
    },
    groups: {
      name: "Groups"
    },
    conference: {
      name: "FaceTime"
    },
    shell: {
      name: "Breaking the shell"
    },
    design: {
      name: "Process"
    }
  }
};

export default (state = initialState, action) => {
  return state;
};
