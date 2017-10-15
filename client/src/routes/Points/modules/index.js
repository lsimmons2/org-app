import initialState from '../initial-state'
import { combineReducers } from 'redux';
export const KEY_PRESS = 'KEY_PRESS'
export const IGNORE = 'IGNORE'
export const NAVIGATE_POINT_LIST = 'NAVIGATE_POINT_LIST'
export const TOGGLE_ANSWER_VISIBILITY = 'TOGGLE_ANSWER_VISIBILITY'
export const TOGGLE_INSERT_MODE = 'TOGGLE_INSERT_MODE'
export const TOGGLE_CATEGORY_SEARCHER = 'TOGGLE_CATEGORY_SEARCHER'
export const POPULATE_DOMAIN_CATEGORIES = 'POPULATE_DOMAIN_CATEGORIES'
export const POPULATE_APP_CATEGORIES = 'POPULATE_APP_CATEGORIES'
export const NAVIGATE_CATEGORY_SELECTOR = 'NAVIGATE_CATEGORY_SELECTOR'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const ADD_POINT_SUCCESS = 'ADD_POINT_SUCCESS'
export const TOGGLE_CATEGORY_FORM = 'TOGGLE_CATEGORY_FORM'
export const ADD_CATEGORY_SUCCESS_APP = 'ADD_CATEGORY_SUCCESS_APP'
export const ADD_CATEGORY_SUCCESS_DOMAIN = 'ADD_CATEGORY_SUCCESS_DOMAIN'
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS'
export const ADD_NEW_COLLECTION = 'ADD_NEW_COLLECTION'
import store from '../../../main'
import _ from 'underscore'
const base_url = 'http://localhost:8000'

//NEWWWWWWW
export const update_collection_name = (new_name) => {
  return {
    type: IGNORE
  }
}

export const add_new_collection = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      var url = base_url + '/collections/new';
      fetch(url,{})
        .then((response) => {
          var promise = response.json();
          promise.then(resp_body => {
            let collection = resp_body.new_collection;
            dispatch({
              type: ADD_NEW_COLLECTION,
              collection: collection
            })
            resolve();
          })
        })
        .catch((error)=> {
          console.log('errrrrrrrr');
          console.log(error)
          resolve();
        });
    })
  }
}



const app_state = {
  tags: {
    associated: [],
    most_recent: [],
  },
  searching: [],
  is_saved: false,
  in_focus: true,
  mode: {
    tags_exclusive: true,
    tags_inclusive: false,
    select_points: false
  },
  filter: {
    success_rate: 0,
    time_added: {
      before: null,
      after: null
    }
  },
  sorts: {
    shuffle: true,
    time_added: false
  },
  sections: {
    point_list: {
      is_selected: true
    },
    point_form: {
      is_selected: false
    },
    point_editor: {
      is_selected: false
    },
    tags_manager: {
      is_selected: false,
      show_search: false
    }
  }
}

//
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [IGNORE]: (state, action) => state,
  [ADD_NEW_COLLECTION]: (state, action) => {
    let new_collection = action.collection;
    new_collection.app = app_state;
    return {
      ...state,
      collections: [...state.collections, new_collection]
    };
  }
}


// ------------------------------------
// Reducer
// ------------------------------------

export default function domainReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
