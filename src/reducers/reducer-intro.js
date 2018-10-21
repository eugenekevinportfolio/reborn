const initialState = true;

export default (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_INTRO":
      return action.payload
  }
  return state;
};
