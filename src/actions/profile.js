import {GET_PROFILE,SET_PROFILE,PROFILE_ERROR} from './types'

//Get Current Users Profile
export const getCurrentProfile=(formData)=>dispatch=>{
    dispatch({
        type:GET_PROFILE,
        payload:formData
    })
    // history.push('/dashboard/profile')
}

 // Set current profile
export const setCurrentProfile = (formData,history) => dispatch => {
      dispatch({
        type: SET_PROFILE,
        payload: formData
      })
      history.push('/dashboard/profile')

    }