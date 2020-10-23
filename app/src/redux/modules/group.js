import _ from 'lodash';
import { APP_NAMESPACE } from '../../util/redux-constants';
import { put, post, get, del } from '../../util/http-utils';
import { updateStore, buildGenericInitialState, handleError } from '../../util/store-utils';
import { CHANGE_AUTH, GET_AUTHENTICATED_USER } from './authentication';
import i18n from 'i18next';

const GROUP_ENDPOINT_BASE = 'groups';
const typeBase = `${APP_NAMESPACE}/${GROUP_ENDPOINT_BASE}/`;

// Constants
export const GET_GROUPS = `${typeBase}GET_GROUPS`;
export const GET_GROUP = `${typeBase}GET_GROUP`;
export const ADD_GROUP = `${typeBase}ADD_GROUP`;
export const EDIT_GROUP = `${typeBase}EDIT_GROUP`;
export const DELETE_GROUP = `${typeBase}DELETE_GROUP`;

// Actions

/**
 * getUser  - Fetches user from API, given id
 *
 * @param {String} id User's id for lookup
 * @returns {Promise}
 */
export const getGroup = (id) => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_GROUP, `${GROUP_ENDPOINT_BASE}/${id}`, true);
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
export const getGroups = () => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_GROUPS, GROUP_ENDPOINT_BASE, true);
    return Promise.resolve(response);
  } catch (err) {
    await handleError(dispatch, err, GET_GROUP);
  }
};

/**
 * register - Creates a new GROUP for a user
 * @param {Object} formData  User's form data
 */
export const addGroup = (formData) => async (dispatch) => {
  console.log('HER BOO');
  try {
    const response = await post(dispatch, ADD_GROUP, `${GROUP_ENDPOINT_BASE}/add`, formData, false);
    //console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response.error === undefined) {
      alert(i18n.language == 'de' ? 'Erfolgreich hinzugefügt!' : 'Added Successfully!');
      window.location.reload();
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
 * Edit GROUP - updates a GROUP
 * @param {Object} formData  User's form data
 */
export const editGroup = (id, formData) => async (dispatch) => {
  try {
    console.log('EDITING GROUP!!');

    const response = await put(
      dispatch,
      EDIT_GROUP,
      `${GROUP_ENDPOINT_BASE}/${id}`,
      formData,
      false,
    );
    //console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response.GroupUpdated) {
      alert(i18n.language == en ? 'Edited Successfully' : 'Erfolgreich Bearbeitet');
    } else {
      alert(response.error);
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

/**
 * Delete GROUP - updates a GROUP
 * @param {Object} formData  User's form data
 */
export const deleteGroup = (id) => async (dispatch) => {
  try {
    console.log('DELETING GROUP!!');

    const response = await del(dispatch, DELETE_GROUP, `${GROUP_ENDPOINT_BASE}/${id}`, true);
    console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response) {
      alert('DELETED GROUP Successfully');
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

// Store
const INITIAL_STATE = {
  ...buildGenericInitialState([GET_GROUP, GET_GROUPS]),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_AUTH:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_GROUP:
    case GET_AUTHENTICATED_USER:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_GROUPS:
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
