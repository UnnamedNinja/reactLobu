import _ from 'lodash';
import { APP_NAMESPACE } from '../../util/redux-constants';
import { put, post, get, del } from '../../util/http-utils';
import { updateStore, buildGenericInitialState, handleError } from '../../util/store-utils';
import { CHANGE_AUTH, GET_AUTHENTICATED_USER } from './authentication';
import i18n from 'i18next';

const ORDER_ENDPOINT_BASE = 'contractorSpecialOrders';
const typeBase = `${APP_NAMESPACE}/${ORDER_ENDPOINT_BASE}/`;

// Constants
export const GET_ORDERS = `${typeBase}GET_ORDERS`;
export const GET_ORDER = `${typeBase}GET_ORDER`;
export const ADD_ORDER = `${typeBase}ADD_ORDER`;
export const EDIT_ORDER = `${typeBase}EDIT_ORDER`;
export const DELETE_ORDER = `${typeBase}DELETE_ORDER`;

// Actions

/**
 * getUser  - Fetches user from API, given id
 *
 * @param {String} id User's id for lookup
 * @returns {Promise}
 */
export const getContractorSpecialOrder = (id) => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_ORDER, `${ORDER_ENDPOINT_BASE}/${id}`, true);
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
export const getContractorSpecialOrders = () => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_ORDERS, ORDER_ENDPOINT_BASE, true);
    return Promise.resolve(response);
  } catch (err) {
    await handleError(dispatch, err, GET_ORDER);
  }
};

/**
 * register - Creates a new ORDER for a user
 * @param {Object} formData  User's form data
 */
export const addContractorSpecialOrder = (formData) => async (dispatch) => {
  console.log('HER BOO');
  try {
    const response = await post(dispatch, ADD_ORDER, `${ORDER_ENDPOINT_BASE}/add`, formData, false);

    // If the registration was successful, set the JWT as a cookie
    if (response.error === undefined) {
      alert(i18n.language == 'de' ? 'Erfolgreich hinzugefügt!' : 'Added Successfully!');
      window.location.reload();
      console.log(response);
      response.status = true;
    } else {
      alert(response.error);
    }
    return response;
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
 * Edit ORDER - updates a ORDER
 * @param {Object} formData  User's form data
 */
export const editContractorSpecialOrder = (id, formData) => async (dispatch) => {
  try {
    console.log('EDITING ORDER!!');
    console.log(formData);

    const response = await put(
      dispatch,
      EDIT_ORDER,
      `${ORDER_ENDPOINT_BASE}/${id}`,
      formData,
      false,
    );
    //console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response.SpecialOrderUpdated) {
      alert(i18n.language == en ? 'Edited Successfully' : 'Erfolgreich Bearbeitet');
    } else {
      alert(response.error);
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

/**
 * Delete ORDER - updates a ORDER
 * @param {Object} formData  User's form data
 */
export const deleteContractorSpecialOrder = (id) => async (dispatch) => {
  try {
    console.log('DELETING ORDER!!');

    const response = await del(dispatch, DELETE_ORDER, `${ORDER_ENDPOINT_BASE}/${id}`, true);
    console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response) {
      alert('DELETED ORDER Successfully');
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

// Store
const INITIAL_STATE = {
  ...buildGenericInitialState([GET_ORDER, GET_ORDERS]),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_AUTH:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_ORDER:
    case GET_AUTHENTICATED_USER:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_ORDERS:
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
