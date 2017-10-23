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
export const UPDATE_COLLECTION = 'UPDATE_COLLECTION'
export const UPDATE_APP_SECTION_STATE = 'UPDATE_APP_SECTION_STATE'
export const MOVE_TAB_FOCUS = 'MOVE_TAB_FOCUS'
export const TOGGLE_POINT_FORM_VISIBILITY = 'TOGGLE_POINT_FORM_VISIBILITY'
export const NEW_COLLECTION_SEARCH_SUGGESTIONS = 'NEW_COLLECTION_SEARCH_SUGGESTIONS'
export const MOVE_NEW_COLLECTION_SEARCH_FOCUS = 'MOVE_NEW_COLLECTION_SEARCH_FOCUS'
export const REPLACE_COLLECTION = 'REPLACE_COLLECTION'

import store from '../../../main'
import _ from 'underscore'
const base_url = 'http://localhost:8000'
import { 
  get_default_collection,
  get_new_collection
} from '../initial-state'




const get_focused_collection = (state) => {
  let collections = state.points.collections;
  let collection_in_focus = _.find(collections, function(collection){
    return collection.app.in_focus;
  })
  return collection_in_focus
}

const get_focused_collection_index = (state) => {
  let collections = state.points.collections;
  let index = -1;
  for (let i = 0; i < collections.length; i++){
    if (collections[i].app.in_focus){
      index = i;
    }
  }
  return index;
}

const get_focused_array_item = (arr) => {
  for (let i = 0; i < arr.length; i++){
    if (arr[i].app.in_focus){
      return arr[i]
    }
  }
  return null;
}

const update_properties = (obj_to_update, new_values) => {
  for (let prop in new_values){
    obj_to_update[prop] = new_values[prop];
  }
}


export const post_collection = (tag_data) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let url = base_url + '/collections';
      let post_body = JSON.stringify({collection:tag_data});
      let req_options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: post_body
      };
      fetch(url, req_options)
        .then((response) => {
          let promise = response.json();
          let collection_index = get_focused_collection_index(getState());
          promise.then(resp_body => {
            let collection = resp_body.collection;
            collection.app = get_default_collection().app;
            collection.points = [
              {point_id: 1, question:'sah?', answer:'sah'},
              {point_id: 2, question:'sahh?', answer:'sahh'},
              {point_id: 3, question:'sahhh?', answer:'sahhh'}
            ];
            collection.tags = [];
            dispatch({
              type: UPDATE_COLLECTION,
              collection: collection,
              collection_index
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

export const search_collection = (search_value) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let url = base_url + '/collections/search/' + search_value;
      fetch(url, {})
        .then((response) => {
          let promise = response.json();
          promise.then(resp_body => {
            let suggestions = resp_body.suggestions;
            _.each(suggestions, function(suggestion){
              suggestion.app = {in_focus: false};
            });
            let state = getState();
            let collection = get_focused_collection(state);
            if (collection.app.is_new){
              collection.app.sections.collection_search.search_suggestions = suggestions;
            }
            dispatch({
              type: UPDATE_COLLECTION,
              collection: collection,
              collection_index: get_focused_collection_index(state)
            });
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

export const detect_keypress = (event) => {
  return (dispatch, getState) => {

    let key = event.key;
    let collection_index = get_focused_collection_index(getState());
    let focused_collection = get_focused_collection(getState());

    //will probably call different functions from this function when
    //I know how I'll organize it

    //TAB ACTIONS
    if (event.altKey && key == 't'){
      let new_collection = get_new_collection();
      return dispatch({
        type: ADD_NEW_COLLECTION,
        collection: new_collection
      })
    }

    if (collection_index < 0){
      return dispatch({
        type: IGNORE
      })
    }

    if (event.altKey && key == '['){
      return dispatch({
        type: MOVE_TAB_FOCUS,
        direction: -1
      })
    }

    if (event.altKey && key == ']'){
      return dispatch({
        type: MOVE_TAB_FOCUS,
        direction: 1
      })
    }


    // NEW COLLECTION
    if (focused_collection.app.is_new){
      let sections = focused_collection.app.sections;
      if (event.altKey){
        if (sections.collection_name_form.in_focus && key == 'j'){
          sections.collection_name_form.in_focus = false;
          sections.collection_search.in_focus = true;
          document.getElementById('new_collection_search').focus();
        } else if (sections.collection_search.in_focus && key == 'k'){
          sections.collection_name_form.in_focus = true;
          sections.collection_search.in_focus = false;
          document.getElementById('new_collection_name_input').focus();
        } else {
          return dispatch({
            type: IGNORE
          })
        }
        return dispatch({
          type: UPDATE_APP_SECTION_STATE,
          new_section_state: sections,
          collection_index: collection_index
        })
      }
      //will eventually be ctrl+j/n/k/p when I figure out
      //how to disable these chrome key shortcuts
      else if (sections.collection_search.in_focus){
        if (key === 'ArrowDown' || key === 'ArrowUp'){
          if (key === 'ArrowDown'){
            return dispatch({
              type: MOVE_NEW_COLLECTION_SEARCH_FOCUS,
              direction: 1,
              collection_index,
              collection: focused_collection
            });
          } else if (key === 'ArrowUp'){
            return dispatch({
              type: MOVE_NEW_COLLECTION_SEARCH_FOCUS,
              direction: -1,
              collection_index,
              collection: focused_collection
            });
          }
        } else if (key === 'Enter'){
          let collection = get_focused_array_item(sections.collection_search.search_suggestions);
          return new Promise((resolve, reject) => {
            let url = base_url + '/collections/' + collection.collection_id
            fetch(url, {})
              .then((response) => {
                let promise = response.json();
                promise.then(resp_body => {
                  return dispatch({
                    type: REPLACE_COLLECTION,
                    collection_index,
                    collection: resp_body.collection
                  });
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
        return dispatch({
          type: IGNORE
        })
      }
    }

    //OTHER VIEWS
    if (event.altKey && key === 'a'){
      return dispatch({
        type: TOGGLE_POINT_FORM_VISIBILITY,
        collection: focused_collection,
        collection_index
      })
    }

  }
}

const move_array_focus = (arr, direction) => {
  let new_arr = arr.slice();
  let first_time = true;
  for (let i = 0; i < new_arr.length; i++){
    let item_app = new_arr[i].app;
    if (item_app.in_focus){
      first_time = false;
      if (direction === -1 && i !== 0){
        item_app.in_focus = false;
        new_arr[i-1].app.in_focus = true;
        break;
      } else if (direction === 1 && i !== new_arr.length -1){
        item_app.in_focus = false;
        new_arr[i+1].app.in_focus = true;
        break;
      }
    }
  }
  if (first_time){
    if (direction === -1){
      new_arr[new_arr.length-1].app.in_focus = true;
    } else if (direction === 1){
      new_arr[0].app.in_focus = true;
    }
  }
  return new_arr
}


//
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [IGNORE]: (state, action) => state,
  [ADD_NEW_COLLECTION]: (state, action) => {
    let new_collections = state.collections.map(collection => {
      collection.app.in_focus = false;
      return collection
    })
    new_collections.push(action.collection);
    return {
      ...state,
      collections: new_collections
    };
  },
  [MOVE_TAB_FOCUS]: (state, action) => {
    return {
      ...state,
      collections: move_array_focus(state.collections, action.direction)
    };
  },
  [NEW_COLLECTION_SEARCH_SUGGESTIONS]: (state, action) => {
    let index = action.collection_index;
    return state
    return {
      ...state,
      collections: [
        ...state.collections.slice(0, index),
        action.collection,
        ...state.collections.slice(index + 1),
      ]
    };
  },
  [MOVE_NEW_COLLECTION_SEARCH_FOCUS]: (state, action) => {
    let index = action.collection_index;
    let collection = action.collection;
    let new_suggestions = move_array_focus(collection.app.sections.collection_search.search_suggestions, action.direction);
    collection.app.sections.collection_search.search_suggestions = new_suggestions;
    return {
      ...state,
      collections: [
        ...state.collections.slice(0, index),
        collection,
        ...state.collections.slice(index + 1),
      ]
    };
  },
  [REPLACE_COLLECTION]: (state, action) => {
    let collection = action.collection;
    let index = action.collection_index;
    collection.app = get_default_collection().app;
    collection.app.in_focus = true;
    return {
      ...state,
      collections: [
        ...state.collections.slice(0, index),
        collection,
        ...state.collections.slice(index + 1),
      ]
    };
  },
  [TOGGLE_POINT_FORM_VISIBILITY]: (state, action) => {
    let collection = action.collection;
    collection.app.views.point_form.in_focus = !collection.app.views.point_form.in_focus;
    let index = action.collection_index;
    return {
      ...state,
      collections: [
        ...state.collections.slice(0, index),
        action.collection,
        ...state.collections.slice(index + 1),
      ]
    };
  },
  [UPDATE_COLLECTION]: (state, action) => {
    let index = action.collection_index;
    let new_collections = [
      ...state.collections.slice(0, index),
      action.collection,
      ...state.collections.slice(index + 1),
    ];
    return {
      ...state,
      collections: new_collections
    };
  },
  [UPDATE_APP_SECTION_STATE]: (state, action) => {
    let index = action.collection_index;
    let new_collections = [
      ...state.collections.slice(0, index),
      {
        ...state.collections[index],
        app: {
          ...state.collections[index].app,
          sections: action.new_section_state
        }
      },
      ...state.collections.slice(index + 1),
    ];
    return {
      ...state,
      collections: new_collections
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


