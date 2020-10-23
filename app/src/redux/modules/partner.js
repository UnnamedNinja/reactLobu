import _ from 'lodash';
import { APP_NAMESPACE } from '../../util/redux-constants';
import { put, post, get, del } from '../../util/http-utils';
import { updateStore, buildGenericInitialState, handleError } from '../../util/store-utils';
import { CHANGE_AUTH, GET_AUTHENTICATED_USER } from './authentication';
import i18n from 'i18next'; // need to use this because reacti18next only has components to use and hooks etc.

const PARTNER_ENDPOINT_BASE = 'partners';
const typeBase = `${APP_NAMESPACE}/${PARTNER_ENDPOINT_BASE}/`;

// Constants
export const GET_PARTNERS = `${typeBase}GET_PARTNERS`;
export const GET_PARTNER = `${typeBase}GET_PARTNER`;
export const ADD_PARTNER = `${typeBase}ADD_PARTNER`;
export const EDIT_PARTNER = `${typeBase}EDIT_PARTNER`;
export const DELETE_PARTNER = `${typeBase}DELETE_PARTNER`;

// Actions

/**
 * getUser  - Fetches user from API, given id
 *
 * @param {String} id User's id for lookup
 * @returns {Promise}
 */
export const getPartner = (id) => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_PARTNER, `${PARTNER_ENDPOINT_BASE}/${id}`, true);
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
export const getPartners = () => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_PARTNERS, PARTNER_ENDPOINT_BASE, true);
    return Promise.resolve(response);
  } catch (err) {
    await handleError(dispatch, err, GET_PARTNER);
  }
};

/**
 * register - Creates a new PARTNER for a user
 * @param {Object} formData  User's form data
 */
export const addPartner = (formData) => async (dispatch) => {
  console.log('HER BOO');
  try {
    const response = await post(
      dispatch,
      ADD_PARTNER,
      `${PARTNER_ENDPOINT_BASE}/add`,
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
 * Edit PARTNER - updates a PARTNER
 * @param {Object} formData  User's form data
 */
export const editPartner = (id, formData) => async (dispatch) => {
  try {
    console.log('EDITING PARTNER!!');

    const response = await put(
      dispatch,
      EDIT_PARTNER,
      `${PARTNER_ENDPOINT_BASE}/${id}`,
      formData,
      false,
    );
    //console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response.PartnerUpdated) {
      alert(i18n.language == en ? 'Edited Successfully' : 'Erfolgreich Bearbeitet');
    } else {
      alert(response.error);
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

/**
 * Delete PARTNER - updates a PARTNER
 * @param {Object} formData  User's form data
 */
export const deletePartner = (id) => async (dispatch) => {
  try {
    console.log('DELETING PARTNER!!');

    const response = await del(dispatch, DELETE_PARTNER, `${PARTNER_ENDPOINT_BASE}/${id}`, true);
    console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response) {
      alert('DELETED PARTNER Successfully');
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

// Store
const INITIAL_STATE = {
  ...buildGenericInitialState([GET_PARTNER, GET_PARTNERS]),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_AUTH:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_PARTNER:
    case GET_AUTHENTICATED_USER:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_PARTNERS:
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
