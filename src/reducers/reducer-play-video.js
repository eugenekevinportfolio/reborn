const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case "PLAY_VIDEO":
      return action.payload;
  }
  return state;
};
