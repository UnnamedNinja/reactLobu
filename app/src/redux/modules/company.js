import _ from 'lodash';
import { APP_NAMESPACE } from '../../util/redux-constants';
import { put, post, get, del } from '../../util/http-utils';
import { updateStore, buildGenericInitialState, handleError } from '../../util/store-utils';
import { CHANGE_AUTH, GET_AUTHENTICATED_USER } from './authentication';
import i18n from 'i18next';

const COMPANY_ENDPOINT_BASE = 'companys';
const typeBase = `${APP_NAMESPACE}/${COMPANY_ENDPOINT_BASE}/`;

// Constants
export const GET_COMPANYS = `${typeBase}GET_COMPANYS`;
export const GET_COMPANY = `${typeBase}GET_COMPANY`;
export const ADD_COMPANY = `${typeBase}ADD_COMPANY`;
export const EDIT_COMPANY = `${typeBase}EDIT_COMPANY`;
export const DELETE_COMPANY = `${typeBase}DELETE_COMPANY`;

// Actions

/**
 * getUser  - Fetches user from API, given id
 *
 * @param {String} id User's id for lookup
 * @returns {Promise}
 */
export const getCompany = (id) => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_COMPANY, `${COMPANY_ENDPOINT_BASE}/${id}`, true);
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
export const getCompanys = () => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_COMPANYS, COMPANY_ENDPOINT_BASE, true);
    return Promise.resolve(response);
  } catch (err) {
    await handleError(dispatch, err, GET_COMPANY);
  }
};

/**
 * register - Creates a new COMPANY for a user
 * @param {Object} formData  User's form data
 */
export const addCompany = (formData) => async (dispatch) => {
  console.log('HER BOO');
  try {
    const response = await post(
      dispatch,
      ADD_COMPANY,
      `${COMPANY_ENDPOINT_BASE}/add`,
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
 * Edit COMPANY - updates a COMPANY
 * @param {Object} formData  User's form data
 */
export const editCompany = (id, formData) => async (dispatch) => {
  try {
    console.log('EDITING COMPANY!!');

    const response = await put(
      dispatch,
      EDIT_COMPANY,
      `${COMPANY_ENDPOINT_BASE}/${id}`,
      formData,
      false,
    );
    //console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response.CompanyUpdated) {
      alert(i18n.language == en ? 'Edited Successfully' : 'Erfolgreich Bearbeitet');
    } else {
      alert(response.error);
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

/**
 * Delete COMPANY - updates a COMPANY
 * @param {Object} formData  User's form data
 */
export const deleteCompany = (id) => async (dispatch) => {
  try {
    console.log('DELETING COMPANY!!');

    const response = await del(dispatch, DELETE_COMPANY, `${COMPANY_ENDPOINT_BASE}/${id}`, true);
    console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response) {
      alert('DELETED COMPANY Successfully');
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

// Store
const INITIAL_STATE = {
  ...buildGenericInitialState([GET_COMPANY, GET_COMPANYS]),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_AUTH:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_COMPANY:
    case GET_AUTHENTICATED_USER:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_COMPANYS:
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
