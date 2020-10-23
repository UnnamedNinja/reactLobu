import _ from 'lodash';
import { APP_NAMESPACE } from '../../util/redux-constants';
import { put, post, get, del } from '../../util/http-utils';
import { updateStore, buildGenericInitialState, handleError } from '../../util/store-utils';
import { CHANGE_AUTH, GET_AUTHENTICATED_USER } from './authentication';
import i18n from 'i18next';

const FUEL_PRICE_DATA_ENDPOINT_BASE = 'fuelprice';
const typeBase = `${APP_NAMESPACE}/${FUEL_PRICE_DATA_ENDPOINT_BASE}/`;

// Constants
export const GET_FUEL_PRICE_DATAS = `${typeBase}GET_FUEL_PRICE_DATAS`;
export const GET_FUEL_PRICE_DATA = `${typeBase}GET_FUEL_PRICE_DATA`;
export const ADD_FUEL_PRICE_DATA = `${typeBase}ADD_FUEL_PRICE_DATA`;
export const EDIT_FUEL_PRICE_DATA = `${typeBase}EDIT_FUEL_PRICE_DATA`;
export const DELETE_FUEL_PRICE_DATA = `${typeBase}DELETE_FUEL_PRICE_DATA`;

// Actions

/**
 * getUser  - Fetches user from API, given id
 *
 * @param {String} id User's id for lookup
 * @returns {Promise}
 */
export const getFuelPrice = (id) => async (dispatch) => {
  try {
    const response = await get(
      dispatch,
      GET_FUEL_PRICE_DATA,
      `${FUEL_PRICE_DATA_ENDPOINT_BASE}/${id}`,
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
export const getFuelPrices = () => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_FUEL_PRICE_DATAS, FUEL_PRICE_DATA_ENDPOINT_BASE, true);
    return Promise.resolve(response);
  } catch (err) {
    await handleError(dispatch, err, GET_FUEL_PRICE_DATA);
  }
};

/**
 * register - Creates a new FUEL_PRICE_DATA for a user
 * @param {Object} formData  User's form data
 */
export const addFuelPrice = (formData) => async (dispatch) => {
  console.log('HER BOO');
  try {
    const response = await post(
      dispatch,
      ADD_FUEL_PRICE_DATA,
      `${FUEL_PRICE_DATA_ENDPOINT_BASE}/add`,
      formData,
      false,
    );
    //console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response.error === undefined) {
      alert('Created New Fuel Table and Saved Data Successfully');
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
 * Edit FUEL_PRICE_DATA - updates a FUEL_PRICE_DATA
 * @param {Object} formData  User's form data
 */
export const editFuelPrice = (id, formData) => async (dispatch) => {
  try {
    console.log('EDITING FUEL_PRICE_DATA!!');

    const response = await put(
      dispatch,
      EDIT_FUEL_PRICE_DATA,
      `${FUEL_PRICE_DATA_ENDPOINT_BASE}/${id}`,
      formData,
      false,
    );
    //console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response.FuelPriceUpdated) {
      alert(i18n.language == en ? 'Edited Successfully' : 'Erfolgreich Bearbeitet');
    } else {
      alert(response.error);
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

/**
 * Delete FUEL_PRICE_DATA - updates a FUEL_PRICE_DATA
 * @param {Object} formData  User's form data
 */
export const deleteFuelPrice = (id) => async (dispatch) => {
  try {
    console.log('DELETING FUEL_PRICE_DATA!!');

    const response = await del(
      dispatch,
      DELETE_FUEL_PRICE_DATA,
      `${FUEL_PRICE_DATA_ENDPOINT_BASE}/${id}`,
      true,
    );
    console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response) {
      alert('DELETED FUEL_PRICE_DATA Successfully');
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

// Store
const INITIAL_STATE = {
  ...buildGenericInitialState([GET_FUEL_PRICE_DATA, GET_FUEL_PRICE_DATAS]),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_AUTH:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_FUEL_PRICE_DATA:
    case GET_AUTHENTICATED_USER:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_FUEL_PRICE_DATAS:
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
