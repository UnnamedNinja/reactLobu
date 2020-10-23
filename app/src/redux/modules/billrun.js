import _ from 'lodash';
import { APP_NAMESPACE } from '../../util/redux-constants';
import { put, post, get, del } from '../../util/http-utils';
import { updateStore, buildGenericInitialState, handleError } from '../../util/store-utils';
import { CHANGE_AUTH, GET_AUTHENTICATED_USER } from './authentication';

const BILLRUN_ENDPOINT_BASE = 'billruns';
const typeBase = `${APP_NAMESPACE}/${BILLRUN_ENDPOINT_BASE}/`;

// Constants
export const GET_BILLRUNS = `${typeBase}GET_BILLRUNS`;
export const GET_BILLRUN = `${typeBase}GET_BILLRUN`;
export const ADD_BILLRUN = `${typeBase}ADD_BILLRUN`;
export const EDIT_BILLRUN = `${typeBase}EDIT_BILLRUN`;
export const DELETE_BILLRUN = `${typeBase}DELETE_BILLRUN`;

// Actions

/**
 * getUser  - Fetches user from API, given id
 *
 * @param {String} id User's id for lookup
 * @returns {Promise}
 */
export const getBillRun = (id) => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_BILLRUN, `${BILLRUN_ENDPOINT_BASE}/${id}`, true);
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
export const getBillRuns = () => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_BILLRUNS, BILLRUN_ENDPOINT_BASE, true);
    return Promise.resolve(response);
  } catch (err) {
    await handleError(dispatch, err, GET_BILLRUN);
  }
};

/**
 * register - Creates a new BILLRUN for a user
 * @param {Object} formData  User's form data
 */
export const addBillRun = (formData) => async (dispatch) => {
  console.log('HER BOO');
  console.log(formData);
  try {
    const response = await post(
      dispatch,
      ADD_BILLRUN,
      `${BILLRUN_ENDPOINT_BASE}/add`,
      formData,
      false,
    );
    //console.log(response);
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

/**
 * Edit BILLRUN - updates a BILLRUN
 * @param {Object} formData  User's form data
 */
export const editBillRun = (id, formData) => async (dispatch) => {
  try {
    console.log('EDITING BILLRUN!!');

    const response = await put(
      dispatch,
      EDIT_BILLRUN,
      `${BILLRUN_ENDPOINT_BASE}/${id}`,
      formData,
      false,
    );
    //console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response.BillRunUpdated) {
      alert(i18n.language == en ? 'Edited Successfully' : 'Erfolgreich Bearbeitet');
    } else {
      alert(response.error);
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

/**
 * Delete BILLRUN - updates a BILLRUN
 * @param {Object} formData  User's form data
 */
export const deleteBillRun = (id) => async (dispatch) => {
  try {
    console.log('DELETING BILLRUN!!');

    const response = await del(dispatch, DELETE_BILLRUN, `${BILLRUN_ENDPOINT_BASE}/${id}`, true);
    console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response) {
      alert('DELETED BILLRUN Successfully');
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

// Store
const INITIAL_STATE = {
  ...buildGenericInitialState([GET_BILLRUN, GET_BILLRUNS]),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_AUTH:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_BILLRUN:
    case GET_AUTHENTICATED_USER:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_BILLRUNS:
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
