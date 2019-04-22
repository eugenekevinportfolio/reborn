const initialState = "ipadOS";

export default (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_CONCEPT":
      return action.concept
  }
  return state;
};
