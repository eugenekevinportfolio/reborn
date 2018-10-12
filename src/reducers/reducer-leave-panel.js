const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case "LEAVE_PANEL":
      return action.payload;
  }
  return state;
};
