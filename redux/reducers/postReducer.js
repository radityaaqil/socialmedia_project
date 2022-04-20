const INITIAL_STATE = {
    created_at:""
};

const postReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "createdAt" :
      return {...state, ...action.payload}
    case "LOADING":
      return true;
    case "DONE":
      return false;
    default:
      return state;
  }
};

export default postReducer;