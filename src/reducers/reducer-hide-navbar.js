const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case "HIDE_NAVBAR":
      return action.payload;
    case "OPEN_PANEL":
      if (!action.isOpen) return false
  }
  return state;
};
