import _ from 'lodash';
import { APP_NAMESPACE } from '../../util/redux-constants';
import { put, post, get, del } from '../../util/http-utils';
import { updateStore, buildGenericInitialState, handleError } from '../../util/store-utils';
import { CHANGE_AUTH, GET_AUTHENTICATED_USER } from './authentication';
import i18n from 'i18next';

const PERSONCOMPONENT_ENDPOINT_BASE = 'personComponents';
const typeBase = `${APP_NAMESPACE}/${PERSONCOMPONENT_ENDPOINT_BASE}/`;

// Constants
export const GET_PERSONCOMPONENTS = `${typeBase}GET_PERSONCOMPONENTS`;
export const GET_PERSONCOMPONENT = `${typeBase}GET_PERSONCOMPONENT`;
export const ADD_PERSONCOMPONENT = `${typeBase}ADD_PERSONCOMPONENT`;
export const EDIT_PERSONCOMPONENT = `${typeBase}EDIT_PERSONCOMPONENT`;
export const DELETE_PERSONCOMPONENT = `${typeBase}DELETE_PERSONCOMPONENT`;

// Actions

/**
 * getUser  - Fetches user from API, given id
 *
 * @param {String} id User's id for lookup
 * @returns {Promise}
 */
export const getPersonComponent = (id) => async (dispatch) => {
  try {
    const response = await get(
      dispatch,
      GET_PERSONCOMPONENT,
      `${PERSONCOMPONENT_ENDPOINT_BASE}/${id}`,
      true,
    );
    return Promise.resolve(response);
  } catch (err) {
    await handleError(dispatch, err);
  }
};

/**
 * getUsers  - Fetches users from API
 *
 * @returns {Promise}
 */
export const getPersonComponents = () => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_PERSONCOMPONENTS, PERSONCOMPONENT_ENDPOINT_BASE, true);
    return Promise.resolve(response);
  } catch (err) {
    await handleError(dispatch, err, GET_PERSONCOMPONENT);
  }
};

/**
 * register - Creates a new PERSONCOMPONENT for a user
 * @param {Object} formData  User's form data
 */
export const addPersonComponent = (formData) => async (dispatch) => {
  console.log('HER BOO');
  try {
    const response = await post(
      dispatch,
      ADD_PERSONCOMPONENT,
      `${PERSONCOMPONENT_ENDPOINT_BASE}/add`,
      formData,
      false,
    );
    //console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response.error === undefined) {
      alert(i18n.language == 'de' ? 'Erfolgreich hinzugefügt!' : 'Added Successfully!');
      response.status = true;
      return response;
    } else {
      alert(response.error);
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

/**
 * Edit PERSONCOMPONENT - updates a PERSONCOMPONENT
 * @param {Object} formData  User's form data
 */
export const editPersonComponent = (id, formData) => async (dispatch) => {
  try {
    console.log('EDITING PERSONCOMPONENT!!');
    console.log(formData);

    const response = await put(
      dispatch,
      EDIT_PERSONCOMPONENT,
      `${PERSONCOMPONENT_ENDPOINT_BASE}/${id}`,
      formData,
      false,
    );
    //console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response.PersonComponentUpdated) {
      alert(i18n.language == en ? 'Edited Successfully' : 'Erfolgreich Bearbeitet');
    } else {
      alert(response.error);
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

/**
 * Delete PERSONCOMPONENT - updates a PERSONCOMPONENT
 * @param {Object} formData  User's form data
 */
export const deletePersonComponent = (id) => async (dispatch) => {
  try {
    console.log('DELETING PERSONCOMPONENT!!');

    const response = await del(
      dispatch,
      DELETE_PERSONCOMPONENT,
      `${PERSONCOMPONENT_ENDPOINT_BASE}/${id}`,
      true,
    );
    console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response) {
      alert('DELETED PERSONCOMPONENT Successfully');
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

// Store
const INITIAL_STATE = {
  ...buildGenericInitialState([GET_PERSONCOMPONENT, GET_PERSONCOMPONENTS]),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_AUTH:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_PERSONCOMPONENT:
    case GET_AUTHENTICATED_USER:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_PERSONCOMPONENTS:
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
