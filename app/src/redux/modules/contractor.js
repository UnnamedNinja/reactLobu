import _ from 'lodash';
import { APP_NAMESPACE } from '../../util/redux-constants';
import { put, post, get, del } from '../../util/http-utils';
import { updateStore, buildGenericInitialState, handleError } from '../../util/store-utils';
import { CHANGE_AUTH, GET_AUTHENTICATED_USER } from './authentication';
import i18n from 'i18next';

const CONTRACTOR_ENDPOINT_BASE = 'contractors';
const typeBase = `${APP_NAMESPACE}/${CONTRACTOR_ENDPOINT_BASE}/`;

// Constants
export const GET_CONTRACTORS = `${typeBase}GET_CONTRACTORS`;
export const GET_CONTRACTOR = `${typeBase}GET_CONTRACTOR`;
export const ADD_CONTRACTOR = `${typeBase}ADD_CONTRACTOR`;
export const EDIT_CONTRACTOR = `${typeBase}EDIT_CONTRACTOR`;
export const DELETE_CONTRACTOR = `${typeBase}DELETE_CONTRACTOR`;

// Actions

/**
 * getUser  - Fetches user from API, given id
 *
 * @param {String} id User's id for lookup
 * @returns {Promise}
 */
export const getContractor = (id) => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_CONTRACTOR, `${CONTRACTOR_ENDPOINT_BASE}/${id}`, true);
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
export const getContractors = () => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_CONTRACTORS, CONTRACTOR_ENDPOINT_BASE, true);
    return Promise.resolve(response);
  } catch (err) {
    await handleError(dispatch, err, GET_CONTRACTOR);
  }
};

/**
 * register - Creates a new CONTRACTORS for a user
 * @param {Object} formData  User's form data
 */
export const addContractor = (formData) => async (dispatch) => {
  try {
    const response = await post(
      dispatch,
      ADD_CONTRACTOR,
      `${CONTRACTOR_ENDPOINT_BASE}/add`,
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
 * Edit CONTRACTORS - updates a CONTRACTORS
 * @param {Object} formData  User's form data
 */
export const editContractor = (id, formData) => async (dispatch) => {
  try {
    console.log('EDITING CONTRACTORS!!');

    const response = await put(
      dispatch,
      EDIT_CONTRACTOR,
      `${CONTRACTOR_ENDPOINT_BASE}/${id}`,
      formData,
      false,
    );
    //console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response.ContractorUpdated) {
      alert(i18n.language == en ? 'Edited Successfully' : 'Erfolgreich Bearbeitet');
    } else {
      alert(response.error);
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

/**
 * Delete CONTRACTORS - updates a CONTRACTORS
 * @param {Object} formData  User's form data
 */
export const deleteContractor = (id) => async (dispatch) => {
  try {
    console.log('DELETING CONTRACTOR!!');

    const response = await del(
      dispatch,
      DELETE_CONTRACTOR,
      `${CONTRACTOR_ENDPOINT_BASE}/${id}`,
      true,
    );
    console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response) {
      alert('DELETED CONTRACTOR Successfully');
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

// Store
const INITIAL_STATE = {
  ...buildGenericInitialState([GET_CONTRACTOR, GET_CONTRACTORS]),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_AUTH:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_CONTRACTOR:
    case GET_AUTHENTICATED_USER:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_CONTRACTORS:
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
