import axios from "axios";
import API_URL from "../../helpers/apiurl";
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

export const loginAction = ({ ...values}) => {
  
  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING" });
      let res = await axios.post(`${API_URL}/auth/login`, {
        ...values,
        email:values.username
      })
      dispatch({ type: "LOGIN", payload: {...res.data} });
   
      Cookies.set("token", res.headers["x-token-access"]);

      await Swal.fire(
      'Successfully logged in!',
      'Welcome back!',
      'success'
      )
    
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message || "Network Error" });
      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: (error.response.data.message || "Network Error"),
      })
    } finally {
      dispatch({ type: "DONE" });
    }
  };
};

export const registerAction = ({ ...values }) => {

  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING" });
  
      let res1 = await axios.post(`${API_URL}/auth/register`, {
        ...values
      })

      dispatch({ type: "LOGIN", payload: res1.data });

      Cookies.set("token", res1.headers["x-token-access"]);

      Swal.fire(
        'Successfully registered!',
        'Welcome aboard!',
        'success'
        )

    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message || "Network Error" });
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: (error.response.data.message || "Network Error"),
    })

    } finally {
      dispatch({ type: "DONE" });
    }
  };
};

export const editProfile = ({ ...values }) => {

  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING" });
      let token = Cookies.get("token")
  
      let res2 = await axios.patch(`${API_URL}/profile/updateprofile`, {
          ...values
      },
      {headers: {
          authorization: `Bearer ${token}`,
      }},)

      dispatch({ type: "LOGIN", payload: res2.data });

      Swal.fire(
      'Profile successfully changed!',
      'Yay!',
      'success'
      )

    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message || "Network Error" });
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: (error.response.data.message || "Network Error"),
      })

    } finally {
      dispatch({ type: "DONE" });
    }
  };
};

export const editProfilePhoto = ({ ...values }) => {

  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING" });
      let token = Cookies.get("token")
  
      let res2 = await axios.patch(`${API_URL}/profile/updateprofile`, {
          ...values
      },
      {headers: {
          authorization: `Bearer ${token}`,
      }},)

      dispatch({ type: "LOGIN", payload: res2.data });

      Swal.fire(
      'Profile successfully changed!',
      'Yay!',
      'success'
      )

    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message || "Network Error" });
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: (error.response.data.message || "Network Error"),
      })

    } finally {
      dispatch({ type: "DONE" });
    }
  };
};

export const postCaption = ({ ...values }) => {

  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING" });
      let token = Cookies.get("token")
  
      let res2 = await axios.post(`${API_URL}/post/postcaption`, {
          ...values
      },
      {headers: {
          authorization: `Bearer ${token}`,
      }},)

      dispatch({ type: "POST", payload: {...res2.data} });

    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message || "Network Error" });

    } finally {
      dispatch({ type: "DONE" });
    }
  };
};
