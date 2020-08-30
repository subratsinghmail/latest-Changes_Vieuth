

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING ,UPDATE_CURRENT_USER} from './types';

/*
here we have used redux thunk.
*/

 // register user
export const registerUser = (newUser, history) => (dispatch) => {
  if (
    newUser.token!==null
  ) {
    
   
    history.push('/login');
  }
};

// Login - get user token



export const loginUser = (user,history) => (dispatch) => {
  if (
     user.token!==null
  ) {
    
    localStorage.setItem('user', JSON.stringify(user));
    
     dispatch(setCurrentUser((user)))
    //sending the user to the verification platform/.
    if(user&&!user.enabled){
      history.push('/send-email-verification')
    } else {
      if(user&&user.role.toString().toLowerCase()==='company'&&user.verified){
        history.push('/company-dashboard')
      }else if(user&&user.role.toString().toLowerCase()==='student'&&user.verified){
        history.push('/dashboard')
      }else if(user&&user.role.toString().toLowerCase()==='admin'&&user.verified){
        history.push('/admin-dashboard')
      }
          
    }
      //one prop is also needed to.
  
  }
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};
export const updateCurrentUser=(data)=>{
  return{
    type:UPDATE_CURRENT_USER,
    payload:data
  };
}
export const updateUser=(data,history)=>(dispatch)=>{
  dispatch(updateCurrentUser(data))
  history.push('/dashboard/profile')
}
// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  
  // localStorage.removeItem('user');
  localStorage.clear();
 
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
