import _ from 'lodash';
import { APP_NAMESPACE } from '../../util/redux-constants';
import { put, post, get, del } from '../../util/http-utils';
import { updateStore, buildGenericInitialState, handleError } from '../../util/store-utils';
import { CHANGE_AUTH, GET_AUTHENTICATED_USER } from './authentication';
import i18n from 'i18next';

const PUBLICFUELDATA_ENDPOINT_BASE = 'publicfueldata';
const typeBase = `${APP_NAMESPACE}/${PUBLICFUELDATA_ENDPOINT_BASE}/`;

// Constants
export const GET_PUBLICFUELDATAS = `${typeBase}GET_PUBLICFUELDATAS`;
export const GET_PUBLICFUELDATA = `${typeBase}GET_PUBLICFUELDATA`;
export const ADD_PUBLICFUELDATA = `${typeBase}ADD_PUBLICFUELDATA`;
export const EDIT_PUBLICFUELDATA = `${typeBase}EDIT_PUBLICFUELDATA`;
export const DELETE_PUBLICFUELDATA = `${typeBase}DELETE_PUBLICFUELDATA`;
export const GET_FIELD_AGENTS = `${typeBase}GET_FIELD_AGENTS`;
export const GET_ACCOUNT_MANAGERS = `${typeBase}GET_ACCOUNT_MANAGERS`;

// Actions

/**
 * getUsers  - Fetches users from API
 *
 * @returns {Promise}
 */
export const getPublicFuelData = () => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_PUBLICFUELDATAS, PUBLICFUELDATA_ENDPOINT_BASE, true);
    return Promise.resolve(response);
  } catch (err) {
    await handleError(dispatch, err, GET_PUBLICFUELDATA);
  }
};

/**
 * register - Creates a new PUBLICFUELDATA for a user
 * @param {Object} formData  User's form data
 */
export const addPublicFuelData = (formData) => async (dispatch) => {
  console.log('HER BOO');
  try {
    const response = await post(
      dispatch,
      ADD_PUBLICFUELDATA,
      `${PUBLICFUELDATA_ENDPOINT_BASE}/add`,
      formData,
      false,
    );
    //console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response.error === undefined) {
      alert(i18n.language == 'de' ? 'Erfolgreich hinzugefügt!' : 'Added Successfully!');
      window.location.reload();
      return Promise.resolve(response);
    } else {
      alert(response.error);
    }
  } catch (err) {
    alert(
      i18n.language == 'de'
        ? 'Ein oder mehrere erforderliche Eingabefelder fehlen!'
        : 'One or more inputs fields are missing!',
    );
    console.log('err', err);
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

/**
 * Edit PUBLICFUELDATA - updates a PUBLICFUELDATA
 * @param {Object} formData  User's form data
 */
export const editPublicFuelData = (id, formData) => async (dispatch) => {
  try {
    console.log('EDITING PUBLICFUELDATA!!');

    const response = await put(
      dispatch,
      EDIT_PUBLICFUELDATA,
      `${PUBLICFUELDATA_ENDPOINT_BASE}/${id}`,
      formData,
      false,
    );
    //console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response.PublicFuelDataUpdated) {
      alert(i18n.language == en ? 'Edited Successfully' : 'Erfolgreich Bearbeitet');
    } else {
      alert(response.error);
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

/**
 * Delete PUBLICFUELDATA - updates a PUBLICFUELDATA
 * @param {Object} formData  User's form data
 */
export const deletePublicFuelData = (id) => async (dispatch) => {
  try {
    console.log('DELETING PUBLICFUELDATA!!');

    const response = await del(
      dispatch,
      DELETE_PUBLICFUELDATA,
      `${PUBLICFUELDATA_ENDPOINT_BASE}/${id}`,
      true,
    );
    console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response) {
      alert('DELETED PUBLICFUELDATA Successfully');
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

// Store
const INITIAL_STATE = {
  ...buildGenericInitialState([GET_PUBLICFUELDATA, GET_PUBLICFUELDATAS]),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_AUTH:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_PUBLICFUELDATA:
    case GET_AUTHENTICATED_USER:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_PUBLICFUELDATAS:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.users') ? _.mapKeys(action.payload.users, 'id') : {},
      );
    default:
      return state;
  }
};

// Selectors
export const getAuthenticatedUser = ({ user, authentication }) => user[authentication.user];
