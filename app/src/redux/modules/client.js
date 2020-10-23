import _ from 'lodash';
import { APP_NAMESPACE } from '../../util/redux-constants';
import { put, post, get, del } from '../../util/http-utils';
import { updateStore, buildGenericInitialState, handleError } from '../../util/store-utils';
import { CHANGE_AUTH, GET_AUTHENTICATED_USER } from './authentication';
import i18n from 'i18next';

const CLIENT_ENDPOINT_BASE = 'clients';
const typeBase = `${APP_NAMESPACE}/${CLIENT_ENDPOINT_BASE}/`;

// Constants
export const GET_CLIENTS = `${typeBase}GET_CLIENTS`;
export const GET_CLIENT = `${typeBase}GET_CLIENT`;
export const ADD_CLIENT = `${typeBase}ADD_CLIENT`;
export const EDIT_CLIENT = `${typeBase}EDIT_CLIENT`;
export const DELETE_CLIENT = `${typeBase}DELETE_CLIENT`;

// Actions

/**
 * getUser  - Fetches user from API, given id
 *
 * @param {String} id User's id for lookup
 * @returns {Promise}
 */
export const getClient = (id) => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_CLIENT, `${CLIENT_ENDPOINT_BASE}/${id}`, true);
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
export const getClients = () => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_CLIENTS, CLIENT_ENDPOINT_BASE, true);
    return Promise.resolve(response);
  } catch (err) {
    await handleError(dispatch, err, GET_CLIENT);
  }
};

/**
 * register - Creates a new client for a user
 * @param {Object} formData  User's form data
 */
export const addClient = (formData) => async (dispatch) => {
  console.log('HER BOO');
  try {
    const response = await post(
      dispatch,
      ADD_CLIENT,
      `${CLIENT_ENDPOINT_BASE}/add`,
      formData,
      false,
    );
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
 * Edit client - updates a client
 * @param {Object} formData  User's form data
 */
export const editClient = (id, formData) => async (dispatch) => {
  try {
    console.log('EDITING CLIENT!!');

    const response = await put(
      dispatch,
      EDIT_CLIENT,
      `${CLIENT_ENDPOINT_BASE}/${id}`,
      formData,
      false,
    );
    //console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response.ClientUpdated) {
      alert(i18n.language == en ? 'Edited Successfully' : 'Erfolgreich Bearbeitet');
    } else {
      alert(response.error);
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

/**
 * Delete client - updates a client
 * @param {Object} formData  User's form data
 */
export const deleteClient = (id) => async (dispatch) => {
  try {
    console.log('DELETING CLIENT!!');

    const response = await del(dispatch, DELETE_CLIENT, `${CLIENT_ENDPOINT_BASE}/${id}`, true);
    console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response) {
      alert('DELETED Client Successfully');
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

// Store
const INITIAL_STATE = {
  ...buildGenericInitialState([GET_CLIENT, GET_CLIENTS]),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_AUTH:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_CLIENT:
    case GET_AUTHENTICATED_USER:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_CLIENTS:
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
