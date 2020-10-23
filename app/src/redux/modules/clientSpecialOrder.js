import _ from 'lodash';
import { APP_NAMESPACE } from '../../util/redux-constants';
import { put, post, get, del } from '../../util/http-utils';
import { updateStore, buildGenericInitialState, handleError } from '../../util/store-utils';
import { CHANGE_AUTH, GET_AUTHENTICATED_USER } from './authentication';
import i18n from 'i18next';

const CLIENT_SPECIAL_ORDERS_ENDPOINT_BASE = 'clientSpecialOrders';
const typeBase = `${APP_NAMESPACE}/${CLIENT_SPECIAL_ORDERS_ENDPOINT_BASE}/`;

// Constants
export const GET_CLIENT_SPECIAL_ORDERSS = `${typeBase}GET_CLIENT_SPECIAL_ORDERS`;
export const GET_CLIENT_SPECIAL_ORDERS = `${typeBase}GET_CLIENT_SPECIAL_ORDERS`;
export const ADD_CLIENT_SPECIAL_ORDERS = `${typeBase}ADD_CLIENT_SPECIAL_ORDERS`;
export const EDIT_CLIENT_SPECIAL_ORDERS = `${typeBase}EDIT_CLIENT_SPECIAL_ORDERS`;
export const DELETE_CLIENT_SPECIAL_ORDERS = `${typeBase}DELETE_CLIENT_SPECIAL_ORDERS`;

// Actions

/**
 * getUser  - Fetches user from API, given id
 *
 * @param {String} id User's id for lookup
 * @returns {Promise}
 */
export const getClientSpecialOrder = (id) => async (dispatch) => {
  try {
    const response = await get(
      dispatch,
      GET_CLIENT_SPECIAL_ORDERS,
      `${CLIENT_SPECIAL_ORDERS_ENDPOINT_BASE}/${id}`,
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
export const getClientSpecialOrders = () => async (dispatch) => {
  try {
    const response = await get(
      dispatch,
      GET_CLIENT_SPECIAL_ORDERSS,
      CLIENT_SPECIAL_ORDERS_ENDPOINT_BASE,
      true,
    );
    return Promise.resolve(response);
  } catch (err) {
    await handleError(dispatch, err, GET_CLIENT_SPECIAL_ORDERS);
  }
};

/**
 * register - Creates a new CLIENT_SPECIAL_ORDERS for a user
 * @param {Object} formData  User's form data
 */
export const addClientSpecialOrder = (formData) => async (dispatch) => {
  console.log('HER BOO');
  try {
    const response = await post(
      dispatch,
      ADD_CLIENT_SPECIAL_ORDERS,
      `${CLIENT_SPECIAL_ORDERS_ENDPOINT_BASE}/add`,
      formData,
      false,
    );

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
 * Edit CLIENT_SPECIAL_ORDERS - updates a CLIENT_SPECIAL_ORDERS
 * @param {Object} formData  User's form data
 */
export const editClientSpecialOrder = (id, formData) => async (dispatch) => {
  try {
    const response = await put(
      dispatch,
      EDIT_CLIENT_SPECIAL_ORDERS,
      `${CLIENT_SPECIAL_ORDERS_ENDPOINT_BASE}/${id}`,
      formData,
      false,
    );
    //console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response.SpecialOrderUpdated) {
      alert(i18n.language == 'de' ? '' : 'Edited CLIENT_SPECIAL_ORDERS Successfully');
    } else {
      alert(response.error);
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

/**
 * Delete CLIENT_SPECIAL_ORDERS - updates a CLIENT_SPECIAL_ORDERS
 * @param {Object} formData  User's form data
 */
export const deleteClientSpecialOrder = (id) => async (dispatch) => {
  try {
    console.log('DELETING CLIENT_SPECIAL_ORDERS!!');

    const response = await del(
      dispatch,
      DELETE_CLIENT_SPECIAL_ORDERS,
      `${CLIENT_SPECIAL_ORDERS_ENDPOINT_BASE}/${id}`,
      true,
    );
    console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response) {
      alert('DELETED CLIENT_SPECIAL_ORDERS Successfully');
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

// Store
const INITIAL_STATE = {
  ...buildGenericInitialState([GET_CLIENT_SPECIAL_ORDERS, GET_CLIENT_SPECIAL_ORDERSS]),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_AUTH:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_CLIENT_SPECIAL_ORDERS:
    case GET_AUTHENTICATED_USER:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_CLIENT_SPECIAL_ORDERSS:
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
