import _ from 'lodash';
import { APP_NAMESPACE } from '../../util/redux-constants';
import { put, post, get, del } from '../../util/http-utils';
import { updateStore, buildGenericInitialState, handleError } from '../../util/store-utils';
import { CHANGE_AUTH, GET_AUTHENTICATED_USER } from './authentication';
import i18n from 'i18next';

const HOLIDAY_ENDPOINT_BASE = 'holidays';
const typeBase = `${APP_NAMESPACE}/${HOLIDAY_ENDPOINT_BASE}/`;

// Constants
export const GET_HOLIDAYS = `${typeBase}GET_HOLIDAYS`;
export const GET_HOLIDAY = `${typeBase}GET_HOLIDAY`;
export const ADD_HOLIDAY = `${typeBase}ADD_HOLIDAY`;
export const EDIT_HOLIDAY = `${typeBase}EDIT_HOLIDAY`;
export const DELETE_HOLIDAY = `${typeBase}DELETE_HOLIDAY`;

// Actions

/**
 * getUser  - Fetches user from API, given id
 *
 * @param {String} id User's id for lookup
 * @returns {Promise}
 */
export const getHoliday = (id) => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_HOLIDAY, `${HOLIDAY_ENDPOINT_BASE}/${id}`, true);
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
export const getHolidays = () => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_HOLIDAYS, HOLIDAY_ENDPOINT_BASE, true);
    return Promise.resolve(response);
  } catch (err) {
    await handleError(dispatch, err, GET_HOLIDAY);
  }
};

/**
 * register - Creates a new HOLIDAY for a user
 * @param {Object} formData  User's form data
 */
export const addHoliday = (formData) => async (dispatch) => {
  console.log('HER BOO');
  try {
    const response = await post(
      dispatch,
      ADD_HOLIDAY,
      `${HOLIDAY_ENDPOINT_BASE}/add`,
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
 * Edit HOLIDAY - updates a HOLIDAY
 * @param {Object} formData  User's form data
 */
export const editHoliday = (id, formData) => async (dispatch) => {
  try {
    console.log('EDITING HOLIDAY!!');

    const response = await put(
      dispatch,
      EDIT_HOLIDAY,
      `${HOLIDAY_ENDPOINT_BASE}/${id}`,
      formData,
      false,
    );
    //console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response.HolidayUpdated) {
      alert(i18n.language == en ? 'Edited Successfully' : 'Erfolgreich Bearbeitet');
    } else {
      alert(response.error);
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

/**
 * Delete HOLIDAY - updates a HOLIDAY
 * @param {Object} formData  User's form data
 */
export const deleteHoliday = (id) => async (dispatch) => {
  try {
    console.log('DELETING HOLIDAY!!');

    const response = await del(dispatch, DELETE_HOLIDAY, `${HOLIDAY_ENDPOINT_BASE}/${id}`, true);
    console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response) {
      alert('DELETED HOLIDAY Successfully');
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

// Store
const INITIAL_STATE = {
  ...buildGenericInitialState([GET_HOLIDAY, GET_HOLIDAYS]),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_AUTH:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_HOLIDAY:
    case GET_AUTHENTICATED_USER:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_HOLIDAYS:
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
