import _ from 'lodash';
import { APP_NAMESPACE } from '../../util/redux-constants';
import { put, post, get, del } from '../../util/http-utils';
import { updateStore, buildGenericInitialState, handleError } from '../../util/store-utils';
import { CHANGE_AUTH, GET_AUTHENTICATED_USER } from './authentication';
import i18n from 'i18next';

const TOUR_ENDPOINT_BASE = 'tours';
const typeBase = `${APP_NAMESPACE}/${TOUR_ENDPOINT_BASE}/`;

// Constants
export const GET_TOURS = `${typeBase}GET_TOURS`;
export const GET_TOUR = `${typeBase}GET_TOUR`;
export const ADD_TOUR = `${typeBase}ADD_TOUR`;
export const EDIT_TOUR = `${typeBase}EDIT_TOUR`;
export const DELETE_TOUR = `${typeBase}DELETE_TOUR`;

// Actions

/**
 * getTOUR  - Fetches tour from API, given id
 *
 * @param {String} id Tour's id for lookup
 * @returns {Promise}
 */
export const getTour = (id) => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_TOUR, `${TOUR_ENDPOINT_BASE}/${id}`, true);
    return Promise.resolve(response);
  } catch (err) {
    await handleError(dispatch, err);
  }
};

/**
 * getTours  - Fetches users from API
 *
 * @returns {Promise}
 */
export const getTours = () => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_TOURS, TOUR_ENDPOINT_BASE, true);
    return Promise.resolve(response);
  } catch (err) {
    await handleError(dispatch, err, GET_TOUR);
  }
};

/**
 * addTour - Adds a new Tour
 * @param {Object} formData  Tour's form data
 */
export const addTour = (formData) => async (dispatch) => {
  console.log('HER BOO');
  try {
    const response = await post(dispatch, ADD_TOUR, `${TOUR_ENDPOINT_BASE}/add`, formData, false);
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
 * Edit Tour - updates a Tour
 * @param {Object} formData  Tour's form data
 */
export const editTour = (id, formData) => async (dispatch) => {
  try {
    console.log('EDITING TOUR!!');

    const response = await put(dispatch, EDIT_TOUR, `${TOUR_ENDPOINT_BASE}/${id}`, formData, false);
    //console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response.TourUpdated) {
      alert(i18n.language == en ? 'Edited Successfully' : 'Erfolgreich Bearbeitet');
    } else {
      alert(response.error);
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

/**
 * Delete Tour - deletes a Tour
 * @param {Object} formData  Tour's form data
 */
export const deleteTour = (id) => async (dispatch) => {
  try {
    console.log('DELETING tour!!');

    const response = await del(dispatch, DELETE_TOUR, `${TOUR_ENDPOINT_BASE}/${id}`, true);
    console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response) {
      alert('DELETED tour Successfully');
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

// Store
const INITIAL_STATE = {
  ...buildGenericInitialState([GET_TOUR, GET_TOURS]),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_AUTH:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_TOUR:
    case GET_AUTHENTICATED_USER:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_TOURS:
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
