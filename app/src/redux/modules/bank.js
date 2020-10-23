import _ from 'lodash';
import { APP_NAMESPACE } from '../../util/redux-constants';
import { put, post, get, del } from '../../util/http-utils';
import { updateStore, buildGenericInitialState, handleError } from '../../util/store-utils';
import { CHANGE_AUTH, GET_AUTHENTICATED_USER } from './authentication';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

const BANK_ENDPOINT_BASE = 'banks';
const typeBase = `${APP_NAMESPACE}/${BANK_ENDPOINT_BASE}/`;

// Constants
export const GET_BANKS = `${typeBase}GET_BANKS`;
export const GET_BANK = `${typeBase}GET_BANK`;
export const ADD_BANK = `${typeBase}ADD_BANK`;
export const EDIT_BANK = `${typeBase}EDIT_BANK`;
export const DELETE_BANK = `${typeBase}DELETE_BANK`;

// Actions

/**
 * getUser  - Fetches user from API, given id
 *
 * @param {String} id User's id for lookup
 * @returns {Promise}
 */
export const getBank = (id) => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_BANK, `${BANK_ENDPOINT_BASE}/${id}`, true);
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
export const getBanks = () => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_BANKS, BANK_ENDPOINT_BASE, true);
    return Promise.resolve(response);
  } catch (err) {
    await handleError(dispatch, err, GET_BANK);
  }
};

/**
 * register - Creates a new BANK for a user
 * @param {Object} formData  User's form data
 */
export const addBank = (formData) => async (dispatch) => {
  console.log('HER BOO');

  try {
    const response = await post(dispatch, ADD_BANK, `${BANK_ENDPOINT_BASE}/add`, formData, false);
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
 * Edit BANK - updates a BANK
 * @param {Object} formData  User's form data
 */
export const editBank = (id, formData) => async (dispatch) => {
  try {
    console.log('EDITING BANK!!');

    const response = await put(dispatch, EDIT_BANK, `${BANK_ENDPOINT_BASE}/${id}`, formData, false);
    console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response.BankUpdated) {
      console.log(response);
      alert(i18n.language == en ? 'Edited Successfully' : 'Erfolgreich Bearbeitet');
    } else {
      alert(response.error);
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

/**
 * Delete BANK - updates a BANK
 * @param {Object} formData  User's form data
 */
export const deleteBank = (id) => async (dispatch) => {
  try {
    console.log('DELETING BANK!!');

    const response = await del(dispatch, DELETE_BANK, `${BANK_ENDPOINT_BASE}/${id}`, true);
    console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response) {
      alert('DELETED BANK Successfully');
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

// Store
const INITIAL_STATE = {
  ...buildGenericInitialState([GET_BANK, GET_BANKS]),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_AUTH:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_BANK:
    case GET_AUTHENTICATED_USER:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_BANKS:
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
