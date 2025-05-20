import {SET_DATA, REMOVE_DATA} from './AuthActionTypes';
export const AuthReducer = (prevState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...prevState,
        ...action.payload,
        isLoading: false,
      };
    case REMOVE_DATA:
      return {
        ...prevState,
        isLoading: false,
        isLogInSkipped: false,
        userToken: null,
        userId: null,
        userObject: null,
        PartyCode: null,
        partyCode: null,
        mallDetails: null,
        parkingDetails: null,
        fcmTokenDetails: null,
        isUpdate: false,
      };
  }
};
