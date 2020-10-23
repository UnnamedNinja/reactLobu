import _ from 'lodash';
import { APP_NAMESPACE } from '../../util/redux-constants';
import { put, post, get, del } from '../../util/http-utils';
import { updateStore, buildGenericInitialState, handleError } from '../../util/store-utils';
import { CHANGE_AUTH, GET_AUTHENTICATED_USER } from './authentication';
import i18n from 'i18next';

const PERSON_ENDPOINT_BASE = 'persons';
const typeBase = `${APP_NAMESPACE}/${PERSON_ENDPOINT_BASE}/`;

// Constants
export const GET_PERSONS = `${typeBase}GET_PERSONS`;
export const GET_PERSON = `${typeBase}GET_PERSON`;
export const ADD_PERSON = `${typeBase}ADD_PERSON`;
export const EDIT_PERSON = `${typeBase}EDIT_PERSON`;
export const DELETE_PERSON = `${typeBase}DELETE_PERSON`;
export const GET_FIELD_AGENTS = `${typeBase}GET_FIELD_AGENTS`;
export const GET_ACCOUNT_MANAGERS = `${typeBase}GET_ACCOUNT_MANAGERS`;

// Actions

/**
 * getUser  - Fetches user from API, given id
 *
 * @param {String} id User's id for lookup
 * @returns {Promise}
 */
export const getPerson = (id) => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_PERSON, `${PERSON_ENDPOINT_BASE}/${id}`, true);
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
export const getPersons = () => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_PERSONS, PERSON_ENDPOINT_BASE, true);
    return Promise.resolve(response);
  } catch (err) {
    await handleError(dispatch, err, GET_PERSON);
  }
};

/**
 * getUsers  - Fetches users from API
 *
 * @returns {Promise}
 */
export const getFieldAgents = () => async (dispatch) => {
  try {
    const response = await get(
      dispatch,
      GET_FIELD_AGENTS,
      `${PERSON_ENDPOINT_BASE}/fieldAgents`,
      true,
    );
    return Promise.resolve(response);
  } catch (err) {
    await handleError(dispatch, err, GET_PERSON);
  }
};

/**
 * getUsers  - Fetches users from API
 *
 * @returns {Promise}
 */
export const getAccountManagers = () => async (dispatch) => {
  try {
    const response = await get(
      dispatch,
      GET_ACCOUNT_MANAGERS,
      `${PERSON_ENDPOINT_BASE}/accountManagers`,
      true,
    );
    return Promise.resolve(response);
  } catch (err) {
    await handleError(dispatch, err, GET_PERSON);
  }
};

/**
 * register - Creates a new PERSON for a user
 * @param {Object} formData  User's form data
 */
export const addPerson = (formData) => async (dispatch) => {
  console.log('HER BOO');
  try {
    const response = await post(
      dispatch,
      ADD_PERSON,
      `${PERSON_ENDPOINT_BASE}/add`,
      formData,
      false,
    );
    //console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response.error === undefined) {
      alert(i18n.language == 'de' ? 'Erfolgreich hinzugefügt!' : 'Added Successfully!');
    //  window.location.reload();
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
 * Edit PERSON - updates a PERSON
 * @param {Object} formData  User's form data
 */
export const editPerson = (id, formData) => async (dispatch) => {
  try {
    console.log('EDITING PERSON!!');

    const response = await put(
      dispatch,
      EDIT_PERSON,
      `${PERSON_ENDPOINT_BASE}/${id}`,
      formData,
      false,
    );
    //console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response.PersonUpdated) {
      alert(i18n.language == en ? 'Edited Successfully' : 'Erfolgreich Bearbeitet');
    } else {
      alert(response.error);
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

/**
 * Delete PERSON - updates a PERSON
 * @param {Object} formData  User's form data
 */
export const deletePerson = (id) => async (dispatch) => {
  try {
    console.log('DELETING PERSON!!');

    const response = await del(dispatch, DELETE_PERSON, `${PERSON_ENDPOINT_BASE}/${id}`, true);
    console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response) {
      alert('DELETED PERSON Successfully');
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

// Store
const INITIAL_STATE = {
  ...buildGenericInitialState([GET_PERSON, GET_PERSONS]),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_AUTH:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_PERSON:
    case GET_AUTHENTICATED_USER:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_PERSONS:
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
