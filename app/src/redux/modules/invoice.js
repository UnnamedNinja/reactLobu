import _ from 'lodash';
import { APP_NAMESPACE } from '../../util/redux-constants';
import { put, post, get, del } from '../../util/http-utils';
import { updateStore, buildGenericInitialState, handleError } from '../../util/store-utils';
import { CHANGE_AUTH, GET_AUTHENTICATED_USER } from './authentication';
import i18n from 'i18next';

const INVOICE_ENDPOINT_BASE = 'invoices';
const typeBase = `${APP_NAMESPACE}/${INVOICE_ENDPOINT_BASE}/`;

// Constants
export const GET_INVOICES = `${typeBase}GET_INVOICES`;
export const GET_INVOICE = `${typeBase}GET_INVOICE`;
export const ADD_INVOICE = `${typeBase}ADD_INVOICE`;
export const EDIT_INVOICE = `${typeBase}EDIT_INVOICE`;
export const DELETE_INVOICE = `${typeBase}DELETE_INVOICE`;

// Actions

/**
 * getUser  - Fetches user from API, given id
 *
 * @param {String} id User's id for lookup
 * @returns {Promise}
 */
export const getInvoice = (id) => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_INVOICE, `${INVOICE_ENDPOINT_BASE}/${id}`, true);
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
export const getInvoices = () => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_INVOICES, INVOICE_ENDPOINT_BASE, true);
    return Promise.resolve(response);
  } catch (err) {
    await handleError(dispatch, err, GET_INVOICE);
  }
};

/**
 * register - Creates a new INVOICE for a user
 * @param {Object} formData  User's form data
 */
export const addInvoice = (formData) => async (dispatch) => {
  console.log('HER BOO');
  try {
    const response = await post(
      dispatch,
      ADD_INVOICE,
      `${INVOICE_ENDPOINT_BASE}/add`,
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
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

/**
 * Edit INVOICE - updates a INVOICE
 * @param {Object} formData  User's form data
 */
export const editInvoice = (id, formData) => async (dispatch) => {
  try {
    console.log('EDITING INVOICE!!');
    console.log(formData);

    const response = await put(
      dispatch,
      EDIT_INVOICE,
      `${INVOICE_ENDPOINT_BASE}/${id}`,
      formData,
      false,
    );
    //console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response.InvoiceUpdated) {
      alert(i18n.language == en ? 'Edited Successfully' : 'Erfolgreich Bearbeitet');
    } else {
      alert(response.error);
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

/**
 * Delete INVOICE - updates a INVOICE
 * @param {Object} formData  User's form data
 */
export const deleteInvoice = (id) => async (dispatch) => {
  try {
    console.log('DELETING INVOICE!!');

    const response = await del(dispatch, DELETE_INVOICE, `${INVOICE_ENDPOINT_BASE}/${id}`, true);
    console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response) {
      alert('DELETED INVOICE Successfully');
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

// Store
const INITIAL_STATE = {
  ...buildGenericInitialState([GET_INVOICE, GET_INVOICES]),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_AUTH:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_INVOICE:
    case GET_AUTHENTICATED_USER:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_INVOICES:
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
