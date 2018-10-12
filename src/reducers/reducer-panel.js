const initialState = {
  isOpen: false,
  flavor: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_PANEL":
      return {
        isOpen: action.isOpen,
        flavor: action.flavor
      }
  }
  return state;
};
