const initialState = "hero";

export default (state = initialState, action) => {
  switch (action.type) {
    case "CURRENT_SECTION":
      return action.id;
  }
  return state;
};
