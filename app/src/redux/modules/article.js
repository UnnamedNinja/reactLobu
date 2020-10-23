import _ from 'lodash';
import { APP_NAMESPACE } from '../../util/redux-constants';
import { put, post, get, del } from '../../util/http-utils';
import { updateStore, buildGenericInitialState, handleError } from '../../util/store-utils';
import { CHANGE_AUTH, GET_AUTHENTICATED_USER } from './authentication';
import i18n from 'i18next';

const ARTICLE_ENDPOINT_BASE = 'articles';
const typeBase = `${APP_NAMESPACE}/${ARTICLE_ENDPOINT_BASE}/`;

// Constants
export const GET_ARTICLES = `${typeBase}GET_ARTICLES`;
export const GET_ARTICLE = `${typeBase}GET_ARTICLE`;
export const ADD_ARTICLE = `${typeBase}ADD_ARTICLE`;
export const EDIT_ARTICLE = `${typeBase}EDIT_ARTICLE`;
export const DELETE_ARTICLE = `${typeBase}DELETE_ARTICLE`;

// Actions

/**
 * getUser  - Fetches user from API, given id
 *
 * @param {String} id User's id for lookup
 * @returns {Promise}
 */
export const getArticle = (id) => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_ARTICLE, `${ARTICLE_ENDPOINT_BASE}/${id}`, true);
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
export const getArticles = () => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_ARTICLES, ARTICLE_ENDPOINT_BASE, true);
    return Promise.resolve(response);
  } catch (err) {
    await handleError(dispatch, err, GET_ARTICLE);
  }
};

/**
 * register - Creates a new ARTICLE for a user
 * @param {Object} formData  User's form data
 */
export const addArticle = (formData) => async (dispatch) => {
  console.log('HER BOO');
  try {
    const response = await post(
      dispatch,
      ADD_ARTICLE,
      `${ARTICLE_ENDPOINT_BASE}/add`,
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
 * Edit ARTICLE - updates a ARTICLE
 * @param {Object} formData  User's form data
 */
export const editArticle = (id, formData) => async (dispatch) => {
  try {
    console.log('EDITING ARTICLE!!');

    const response = await put(
      dispatch,
      EDIT_ARTICLE,
      `${ARTICLE_ENDPOINT_BASE}/${id}`,
      formData,
      false,
    );
    //console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response.ArticleUpdated) {
      alert(i18n.language == en ? 'Edited Successfully' : 'Erfolgreich Bearbeitet');
    } else {
      alert(response.error);
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

/**
 * Delete ARTICLE - updates a ARTICLE
 * @param {Object} formData  User's form data
 */
export const deleteArticle = (id) => async (dispatch) => {
  try {
    console.log('DELETING ARTICLE!!');

    const response = await del(dispatch, DELETE_ARTICLE, `${ARTICLE_ENDPOINT_BASE}/${id}`, true);
    console.log(response);

    // If the registration was successful, set the JWT as a cookie
    if (response) {
      alert('DELETED ARTICLE Successfully');
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

// Store
const INITIAL_STATE = {
  ...buildGenericInitialState([GET_ARTICLE, GET_ARTICLES]),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_AUTH:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_ARTICLE:
    case GET_AUTHENTICATED_USER:
      return updateStore(
        state,
        action,
        _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {},
      );
    case GET_ARTICLES:
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
