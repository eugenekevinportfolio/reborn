const initialState = {
  isOpen: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_PANEL":
      return {
        isOpen: action.isOpen
      };
  }
  return state;
};
