const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case "DARK_MODE":
      return action.payload;
  }
  return state;
};
