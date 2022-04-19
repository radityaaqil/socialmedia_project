const INITIAL_STATE = {
    id: 0,
    isLogin: false,
    isVerified:0,
    username: "",
    error_mes: "",
    email : "",
    fullname : "",
    bio : "",
    profile_picture: "",
    cover_picture:"",
    location:"",
    caption:"",
};
  
  const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "LOGIN":
        return { ...state, isLogin: true, error_mes: "", ...action.payload };
      case "ERROR":
        return { error_mes: action.payload };
      case "LOGOUT":
        return INITIAL_STATE;
      default:
        return state;
    }
  };
  
  export default userReducer;