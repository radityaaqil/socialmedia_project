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

      await Swal.fire({
        title:'Successfully logged in!',
        text:'Welcome back!',
        icon:'success',
        color: ' #4FBF26',
        iconColor: ' #4FBF26',
        background: '#1a1a1d',
      });
    
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message || "Network Error" });
      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        color: '#f44336',
        iconColor: '#f44336',
        background: '#1a1a1d',
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
      
      await Swal.fire({
        title:'Successfully registered!',
        text:'Welcome aboard!',
        icon:'success',
        color: ' #4FBF26',
        iconColor: ' #4FBF26',
        background: '#1a1a1d',
      });

    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message || "Network Error" });
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        color: '#f44336',
        iconColor: '#f44336',
        background: '#1a1a1d',
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

      await Swal.fire({
        title:'Profile successfully changed!',
        text:'YAY!',
        icon:'success',
        color: ' #4FBF26',
        iconColor: ' #4FBF26',
        background: '#1a1a1d',
      });

    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message || "Network Error" });
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        color: '#f44336',
        iconColor: '#f44336',
        background: '#1a1a1d',
        text: (error.response.data.message || "Network Error"),
      })

    } finally {
      dispatch({ type: "DONE" });
    }
  };
};

// export const editProfilePhoto = (values) => {

//   return async (dispatch) => {
//     try {
//       dispatch({ type: "LOADING" });
//       let token = Cookies.get("token")
  
//       let res2 = await axios.patch(`${API_URL}/photos/`, values,
//       {headers: {
//           authorization: `Bearer ${token}`,
//       }},)

//       dispatch({ type: "LOGIN", payload: res2.data });

//       Swal.fire(
//       'Profile successfully changed!',
//       'Yay!',
//       'success'
//       )

//     } catch (error) {
//       dispatch({ type: "ERROR", payload: error.response.data.message || "Network Error" });
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: (error.response.data.message || "Network Error"),
//       })

//     } finally {
//       dispatch({ type: "DONE" });
//     }
//   };
// };

// export const editCoverPhoto = (values) => {

//   return async (dispatch) => {
//     try {
//       dispatch({ type: "LOADING" });
//       let token = Cookies.get("token")
  
//       let res2 = await axios.patch(`${API_URL}/photos/coverphotos`, values,
//       {headers: {
//           authorization: `Bearer ${token}`,
//       }},)

//       dispatch({ type: "LOGIN", payload: res2.data });

//       console.log(res2.data)

//       Swal.fire(
//       'Profile successfully changed!',
//       'Yay!',
//       'success'
//       )

//     } catch (error) {
//       dispatch({ type: "ERROR", payload: error.response.data.message || "Network Error" });
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: (error.response.data.message || "Network Error"),
//       })

//     } finally {
//       dispatch({ type: "DONE" });
//     }
//   };
// };

export const editAllPhotos = ({ formData, formDataCover }) => {

  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING" });
      let token = Cookies.get("token")

      let res2 = await axios.all([
          axios.patch(`${API_URL}/photos`, formData, {
              headers: {
                authorization: `Bearer ${token}`,
              },
          }),
          axios.patch(`${API_URL}/photos/coverphotos`, formDataCover, {
              headers: {
                authorization: `Bearer ${token}`,
              },
          }) 
      ])

      console.log(res2)

      for (let i = 0; i < res2.length; i++) {
        const element = res2[i];
        dispatch({ type: "LOGIN", payload: element.data});
      }

      // dispatch({ type: "LOGIN", payload: res2[0].data});
      // dispatch({ type: "LOGIN", payload: res2[1].data});

      await Swal.fire({
        title:'Photos successfully changed!',
        text:'YAY!',
        icon:'success',
        color: ' #4FBF26',
        iconColor: ' #4FBF26',
        background: '#1a1a1d',
      });

    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message || "Network Error" });
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        color: '#f44336',
        iconColor: '#f44336',
        background: '#1a1a1d',
        text: (error.response.data.message || "Network Error"),
      })

    } finally {
      dispatch({ type: "DONE" });
    }
  };
};

export const signOutAction = () => {

  return async (dispatch) => {
    try {
      dispatch({ type: "LOGOUT" });

    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message || "Network Error" });

    } finally {
      dispatch({ type: "DONE" });
    }
  };
};
