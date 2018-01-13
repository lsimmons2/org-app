
import _ from 'underscore'

import initialState from '../initial-state'
import { 
  get_default_collection,
  get_blank_tab,
  get_just_add_points
} from '../initial-state'

export const IGNORE = 'IGNORE'
export const ADD_TAB = 'ADD_TAB'
export const ADD_TAG_TO_NEW_POINT = 'ADD_TAG_TO_NEW_POINT'
export const ADD_POINT = 'ADD_POINT'
export const TOGGLE_VIEW_VISIBILITY = 'TOGGLE_VIEW_VISIBILITY'
export const FILL_BLANK_TAB_WITH_COLLECTION = 'FILL_BLANK_TAB_WITH_COLLECTION'
export const FILL_BLANK_TAB_WITH_JUST_ADD_POINTS = 'FILL_BLANK_TAB_WITH_JUST_ADD_POINTS'
export const MOVE_BLANK_TAB_COLLECTION_SEARCH_FOCUS = 'MOVE_BLANK_TAB_COLLECTION_SEARCH_FOCUS'
export const MOVE_NEW_POINT_TAG_FOCUS = 'MOVE_NEW_POINT_TAG_FOCUS'
export const MOVE_SECTION_FOCUS = 'MOVE_SECTION_FOCUS'
export const MOVE_TAG_SEARCH_FOCUS = 'MOVE_TAG_SEARCH_FOCUS'
export const MOVE_TAB_FOCUS = 'MOVE_TAB_FOCUS'
export const POST_POINT_SUCCESS = 'POST_POINT_SUCCESS'
export const REMOVE_TAG_FROM_NEW_POINT = 'REMOVE_TAG_FROM_NEW_POINT'
export const UPDATE_SEARCH_SUGGESTIONS = 'UPDATE_SEARCH_SUGGESTIONS'




//TODO: this should probs be stored somewhere else
const base_url = 'http://localhost:8000'


// ------------------------------------
// Action Creators
// ------------------------------------

export const post_collection = (new_collection_data) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let url = base_url + '/collections';
      let post_body = JSON.stringify({collection:new_collection_data});
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
          promise.then(resp_body => {
            let collection = resp_body.collection;
            collection.app = get_default_collection().app;
            collection.mode = get_default_collection().mode;
            collection.points = [];
            collection.tags = [];
            dispatch({
              type: FILL_BLANK_TAB_WITH_COLLECTION,
              collection
            })
            resolve();
          })
        })
        .catch((error)=> {
          console.error('errrrrrrrr');
          console.error(error)
          resolve();
        });
    })
  }
}

export const post_tag = (new_tag_data) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let url = base_url + '/tags';
      let post_body = JSON.stringify({tag:new_tag_data});
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
          promise.then(resp_body => {
            let tag = resp_body.tag;
            tag.in_focus = false;
            dispatch({
              type: ADD_TAG_TO_NEW_POINT,
              tag
            })
            resolve();
          })
        })
        .catch((error)=> {
          console.error('errrrrrrrr');
          console.error(error)
          resolve();
        });
    })
  }
}


export const post_point = (point_data) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let url = base_url + '/points';
      let tabs = getState().points.tabs;
      let focused_tab = get_focused_array_item(tabs);
      let tag_ids = [];
      if (focused_tab.app.is_just_add_points || focused_tab.mode.select_points){
        tag_ids = get_new_point_tag_ids(focused_tab);
      }
      let post_body = JSON.stringify({point:point_data, tag_ids:tag_ids});
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
          promise.then(resp_body => {
            if (focused_tab.app.is_just_add_points){
              let alert = 'Point ' + resp_body.point.point_id + ' saved succesfully'
              dispatch({
                type: POST_POINT_SUCCESS,
                alert
              })
            } else if (focused_tab.mode.select_points){
              let point = resp_body.point;
              dispatch({
                type: ADD_POINT,
                point
              })
            }
            clear_input_fields();
            resolve();
          })
        })
        .catch((error)=> {
          console.error('errrrrrrrr');
          console.error(error)
          resolve();
        });
    })
  }
}


export const search = (search_type, search_value) => {
  return (dispatch, getState) => {
    if (search_value.length < 1){
      return dispatch({
        type: IGNORE
      })
    }
    return new Promise((resolve, reject) => {
      let url = base_url + '/' + search_type + '/search/' + search_value;
      fetch(url, {})
        .then((response) => {
          let promise = response.json();
          promise.then(resp_body => {
            let suggestions = resp_body.suggestions;
            _.each(suggestions, function(suggestion){
              suggestion.in_focus = false;
            });
            dispatch({
              type: UPDATE_SEARCH_SUGGESTIONS,
              suggestions
            });
            resolve();
          })
        })
        .catch((error)=> {
          console.error('errrrrrrrr');
          console.error(error)
          resolve();
        });
    })
  }
}


export const detect_keypress = (event) => {
  return (dispatch, getState) => {

    let tabs = getState().points.tabs;
    let focused_tab = get_focused_array_item(tabs);
    let key = event.key;

    let global_tab_keys = ['t', '[', ']'];
    if (event.altKey && global_tab_keys.indexOf(key) > -1){
      handle_global_command(dispatch, getState, event);
    } else if (focused_tab.app.is_blank){
      handle_blank_tab_command(dispatch, getState, event);
    } else if (focused_tab.app.views.new_point.in_focus){
      handle_new_point_command(dispatch, getState, event);
    } else if (focused_tab.app.views.collection_editor.in_focus){
      handle_collection_editor_command(dispatch, getState, event);
    }

    //TOGGLING VIEWS
    if (event.altKey && key === 'a'){
      dispatch({
        type: TOGGLE_VIEW_VISIBILITY,
        view_name: 'new_point'
      })
    } else if (event.altKey && key === 'c'){
      dispatch({
        type: TOGGLE_VIEW_VISIBILITY,
        view_name: 'collection_editor'
      })
    } else {
      dispatch({
        type: IGNORE
      })
    }

  }
}


export const handle_global_command = (dispatch, getState, event) => {
  let key = event.key;
  //TAB ACTIONS
  if (key === 't'){
    let tab = get_blank_tab();
    return dispatch({
      type: ADD_TAB,
      tab
    })
  } else if (key === '[' || key === ']'){
    let direction = get_direction_from_key(key);
    return dispatch({
      type: MOVE_TAB_FOCUS,
      direction
    })
  }
}


const handle_blank_tab_command = (dispatch, getState, event) => {
  let key = event.key;
  let tabs = getState().points.tabs;
  let focused_tab = get_focused_array_item(tabs);
  let sections = focused_tab.app.sections;
  let focused_section_name = _.find(sections, section => {
    return section.in_focus;
  }).name;
  if (event.altKey && (key === 'k' || key === 'j')){
    let direction = get_direction_from_key(key);
    return dispatch({
      type: MOVE_SECTION_FOCUS,
      direction
    })
  } else if (focused_section_name === 'collection_search'){
    if (event.ctrlKey && (key === 'j' || key === 'k')){
      let direction = get_direction_from_key(key);
      return dispatch({
        type: MOVE_BLANK_TAB_COLLECTION_SEARCH_FOCUS,
        direction
      });
    } else if (key === 'Enter'){
      let tab_index = get_focused_array_index(tabs);
      let search_suggestions = _.find(sections, section => {
        return section.name === 'collection_search';
      }).search_suggestions;
      let collection_to_fetch = get_focused_array_item(search_suggestions);
      return new Promise((resolve, reject) => {
        let url = base_url + '/collections/' + collection_to_fetch.collection_id
        fetch(url, {})
          .then((response) => {
            let promise = response.json();
            promise.then(resp_body => {
              let collection = resp_body.collection;
              collection.mode = get_default_collection().mode
              return dispatch({
                type: FILL_BLANK_TAB_WITH_COLLECTION,
                collection
              });
              resolve();
            })
          })
          .catch((error)=> {
            console.error('errrrrrrrr');
            console.error(error)
            resolve();
          });
      })
    }
  } else if (focused_section_name === 'just_add_points_button'){
    if (event.ctrlKey && key === ' '){
      let just_add_points = get_just_add_points();
      return dispatch({
        type: FILL_BLANK_TAB_WITH_JUST_ADD_POINTS,
        just_add_points
      });
    }
  }
}


const handle_new_point_command = (dispatch, getState, event) => {
  let focused_tab = get_focused_array_item(getState().points.tabs)
  let sections = focused_tab.app.views.new_point.sections;
  let key = event.key;
  if (event.altKey && (key === 'j' || key === 'k')){
    let direction = get_direction_from_key(key);
    return dispatch({
      type: MOVE_SECTION_FOCUS,
      view_name: 'new_point',
      direction
    })
  }
  let focused_section = _.find(sections, function(section){
      return section.in_focus;
  });
  if (focused_section.name === 'tags_list'){
    if (key === 'h' || key === 'l'){
      let direction = get_direction_from_key(key);
      return dispatch({
        type: MOVE_NEW_POINT_TAG_FOCUS,
        direction
      })
    } else if (key === 'x'){
      let tag_index = get_focused_array_index(focused_section.tags);
      return dispatch({
        type: REMOVE_TAG_FROM_NEW_POINT,
        tag_index
      })
    }
  } else if (focused_section.name === 'tags_search'){
    if (event.ctrlKey && (key === 'j' || key === 'k')){
      let direction = get_direction_from_key(key);
      return dispatch({
        type: MOVE_TAG_SEARCH_FOCUS,
        direction
      });
    } else if (key === 'Enter'){
      let tag = get_focused_array_item(focused_section.search_suggestions);
      return dispatch({
        type: ADD_TAG_TO_NEW_POINT,
        tag
      });
    }
  }
}


const handle_collection_editor_command  = (dispatch, getState, event) => {
  let key = event.key;
  if (event.altKey && (key === 'j' || key === 'k')){
    let direction = get_direction_from_key(key);
    return dispatch({
      type: MOVE_SECTION_FOCUS,
      view_name: 'collection_editor',
      direction
    })
  }
}



// ------------------------------------
// Utility Functions
// ------------------------------------


const clear_input_fields = () => {
  document.getElementById('question_input').value = '';
  document.getElementById('answer_input').value = '';
}

const set_item_focus = (item, focus) => {
  if (item.hasOwnProperty('app')){
    item.app.in_focus = focus;
  } else {
    item.in_focus = focus;
  }
}


const get_new_point_tag_ids = (tab) => {
  let tags = _.find(tab.app.views.new_point.sections, section => {
    return section.name === 'tags_list'
  }).tags;
  return _.map(tags, tag => {
    return tag.tag_id
  })
}


const move_array_focus = (arr, direction) => {
  let new_arr = arr.slice();
  let first_time = true;
  for (let i = 0; i < new_arr.length; i++){
    let item_in_focus;
    if (new_arr[i].hasOwnProperty('app')){
      item_in_focus = new_arr[i].app.in_focus;
    } else {
      item_in_focus = new_arr[i].in_focus;
    }
    if (item_in_focus){
      first_time = false;
      if (direction === -1 && i !== 0){
        set_item_focus(new_arr[i], false)
        set_item_focus(new_arr[i-1], true)
        break;
      } else if (direction === 1 && i !== new_arr.length -1){
        set_item_focus(new_arr[i], false)
        set_item_focus(new_arr[i+1], true)
        break; }
    }
  }
  if (first_time){
    if (direction === -1){
      set_item_focus(new_arr[new_arr.length-1], true)
    } else if (direction === 1){
      set_item_focus(new_arr[0], true)
    }
  }
  return new_arr
}


const get_focused_array_index = (arr) => {
  for (let i = 0; i < arr.length; i++){
    let item_in_focus;
    if (arr[i].hasOwnProperty('app')){
      item_in_focus = arr[i].app.in_focus;
    } else {
      item_in_focus = arr[i].in_focus;
    }
    if (item_in_focus){
      return i;
    }
  }
  return -1;
}


export const get_focused_array_item = (arr) => {
  for (let i = 0; i < arr.length; i++){
    let item_in_focus;
    if (arr[i].hasOwnProperty('app')){
      item_in_focus = arr[i].app.in_focus;
    } else {
      item_in_focus = arr[i].in_focus;
    }
    if (item_in_focus){
      return arr[i];
    }
  }
  return null;
}


const get_direction_from_key = (key) => {
  let key_direction_mapping = {
    'j': 1,
    'k': -1,
    'l': 1,
    'h': -1,
    '[': -1,
    ']': 1
  }
  if (key in key_direction_mapping){
    return key_direction_mapping[key];
  }
  return null;
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const GLOBAL_ACTION_HANDLERS = {

  [IGNORE]: (state, action) => state,

  [ADD_TAB]: (state, action) => {
    let new_tabs = state.tabs.map(tab => {
      tab.app.in_focus = false;
      return tab
    })
    new_tabs.push(action.tab);
    return {
      ...state,
      tabs: new_tabs
    };
  },

  [MOVE_TAB_FOCUS]: (state, action) => {
    return {
      ...state,
      tabs: move_array_focus(state.tabs, action.direction)
    };
  },

  [POST_POINT_SUCCESS]: (state, action) => {
    return {
      ...state,
      global: {
        ...state.global,
        alert: action.alert
      }
    }
  }

}

const FOCUSED_TAB_HANDLERS = {

  [ADD_POINT]: (collection, action) => {
    return {
      ...collection,
      points: [
        action.point,
        ...collection.points
      ]
    }
  },

  [ADD_TAG_TO_NEW_POINT]: (collection, action) => {
    let sections = collection.app.views.new_point.sections;
    let section_i;
    let tags_list = _.find(sections, (section, i) => {
      if (section.name === 'tags_list'){ section_i = i; return true; };
    });
    if (get_focused_array_index(tags_list.tags) < 0){
      action.tag.in_focus = true;
    }
    tags_list.tags.push(action.tag);
    return {
      ...collection,
      app: {
        ...collection.app,
        views: {
          ...collection.app.views,
          new_point: {
            ...collection.app.views.new_point,
            sections: [
              ...collection.app.views.new_point.sections.slice(0,section_i),
              tags_list,
              ...collection.app.views.new_point.sections.slice(section_i+1),
            ]
          }
        }
      }
    }
  },

  [FILL_BLANK_TAB_WITH_COLLECTION]: (tab, action) => {
    let new_collection = action.collection;
    new_collection.app = get_default_collection().app;
    new_collection.app.in_focus = true;
    return new_collection
  },

  [FILL_BLANK_TAB_WITH_JUST_ADD_POINTS]: (tab, action) => {
    return action.just_add_points
  },

  [MOVE_BLANK_TAB_COLLECTION_SEARCH_FOCUS]: (tab, action) => {
    let collection_search = _.find(tab.app.sections, section => {
      return section.name === 'collection_search';
    })
    let suggestions = collection_search.search_suggestions;
    suggestions = move_array_focus(suggestions, action.direction);
    collection_search.search_suggestions = suggestions;
    return tab
  },

  [MOVE_NEW_POINT_TAG_FOCUS]: (collection, action) => {
    let sections = collection.app.views.new_point.sections;
    let section_i;
    let tags_list = _.find(sections, (section, i) => {
      if (section.name === 'tags_list'){ section_i = i; return true; };
    });
    let tags = move_array_focus(tags_list.tags, action.direction);
    return {
      ...collection,
      app: {
        ...collection.app,
        views: {
          ...collection.app.views,
          new_point: {
            ...collection.app.views.new_point,
            sections: [
              ...collection.app.views.new_point.sections.slice(0,section_i),
              {
                ...tags_list,
                tags: tags
              },
              ...collection.app.views.new_point.sections.slice(section_i+1),
            ]
          }
        }
      }
    }
  },

  [MOVE_SECTION_FOCUS]: (tab, action) => {
    if (tab.app.is_blank){
      let sections = move_array_focus(tab.app.sections, action.direction);
      return {
        ...tab,
        app: {
          ...tab.app,
          section: sections
        }
      }
    }
    let focused_view = _.find(tab.app.views, view => {
      return view.in_focus;
    });
    //TODO: join these two lines
    let sections = focused_view.sections;
    sections = move_array_focus(sections, action.direction);
    if (action.view_name === 'new_point'){
      return {
        ...tab,
        app: {
          ...tab.app,
          views: {
            ...tab.app.views,
            new_point: {
              ...tab.app.views.new_point,
              sections: sections
            }
          }
        }
      }
    } else if (action.view_name === 'collection_editor'){
      return {
        ...tab,
        app: {
          ...tab.app,
          views: {
            ...tab.app.views,
            collection_editor: {
              ...tab.app.views.collection_editor,
              sections: sections
            }
          }
        }
      }
    }
  },

  [MOVE_TAG_SEARCH_FOCUS]: (collection, action) => {
    let sections = collection.app.views.new_point.sections;
    let tags_search = _.find(sections, section => {
      return section.name === 'tags_search';
    });
    let suggestions = tags_search.search_suggestions;
    suggestions = move_array_focus(suggestions, action.direction);
    tags_search.search_suggestions = suggestions;
    return collection
  },

  [REMOVE_TAG_FROM_NEW_POINT]: (collection, action) => {
    let tag_index = action.tag_index;
    let section_i;
    let tags_list = _.find(collection.app.views.new_point.sections, (section, i) => {
      if (section.name === 'tags_list'){ section_i = i; return true; };
    });
    let tags = tags_list.tags;
    if (tags.length > 1){
      if (tag_index === 0){
        tags[1].in_focus = true;
      } else {
        tags[tag_index-1].in_focus = true;
      }
    }
    //returning collection doesn't work here
    //return collection 
    return {
      ...collection,
      app: {
        ...collection.app,
        views: {
          ...collection.app.views,
          new_point: {
            ...collection.app.views.new_point,
            sections: [
              ...collection.app.views.new_point.sections.slice(0,section_i),
              tags_list: {
                ...tags_list,
                tags: tags
              },
              ...collection.app.views.new_point.sections.slice(section_i+1),
            ]
          }
        }
      }
    }
  },

  [UPDATE_SEARCH_SUGGESTIONS]: (collection, action) => {
    if (collection.app.is_blank){
      let collection_search = _.find(collection.app.sections, section => {
        return section.name === 'collection_search';
      });
      collection_search.search_suggestions = action.suggestions;
    } else {
      let tags_search = _.find(collection.app.views.new_point.sections, section => {
        return section.name === 'tags_search';
      });
      if (tags_search.in_focus){
        tags_search.search_suggestions = action.suggestions;
      }
    }
    return collection
  },

  [TOGGLE_VIEW_VISIBILITY]: (collection, action) => {
    if (action.view_name === 'new_point'){
      let view_in_focus = !collection.app.views.new_point.in_focus;
      let point_list_in_focus = !view_in_focus;
      return {
        ...collection,
        app: {
          ...collection.app,
          views: {
            ...collection.app.views,
            new_point: {
              ...collection.app.views.new_point,
              in_focus: view_in_focus
            },
            point_list: {
              in_focus: point_list_in_focus
            }
          }
        }
      }
    } else if (action.view_name === 'collection_editor'){
      let view_in_focus = !collection.app.views.collection_editor.in_focus;
      let point_list_in_focus = !view_in_focus;
      return {
        ...collection,
        app: {
          ...collection.app,
          views: {
            ...collection.app.views,
            collection_editor: {
              ...collection.app.views.collection_editor,
              in_focus: view_in_focus
            },
            point_list: {
              in_focus: point_list_in_focus
            }
          }
        }
      }
    }
  }

}


// ------------------------------------
// Reducer
// ------------------------------------

const reducer = (state = initialState, action) => {
  if (action.type in FOCUSED_TAB_HANDLERS){
    let handler = FOCUSED_TAB_HANDLERS[action.type];
    let focused_tab = get_focused_array_item(state.tabs);
    let focused_tab_index = get_focused_array_index(state.tabs);
    return {
      ...state,
      tabs: [
        ...state.tabs.slice(0, focused_tab_index),
        handler(focused_tab, action),
        ...state.tabs.slice(focused_tab_index + 1),
      ]
    };
  } else if (action.type in GLOBAL_ACTION_HANDLERS) {
    let handler = GLOBAL_ACTION_HANDLERS[action.type]
    return handler(state, action)
  }
  return state;
}

export default reducer
