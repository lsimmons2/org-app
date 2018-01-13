
import _ from 'underscore'

import initialState from '../initial-state'
import { 
  get_default_collection,
  get_blank_tab,
  get_just_add_points
} from '../initial-state'

export const IGNORE = 'IGNORE'
export const ADD_TAB = 'ADD_TAB'
export const ADD_TAG_TO_COLLECTION = 'ADD_TAG_TO_COLLECTION'
export const ADD_POINT = 'ADD_POINT'
export const TOGGLE_VIEW_VISIBILITY = 'TOGGLE_VIEW_VISIBILITY'
export const FILL_BLANK_TAB_WITH_COLLECTION = 'FILL_BLANK_TAB_WITH_COLLECTION'
export const FILL_BLANK_TAB_WITH_JUST_ADD_POINTS = 'FILL_BLANK_TAB_WITH_JUST_ADD_POINTS'
export const MOVE_BLANK_TAB_COLLECTION_SEARCH_FOCUS = 'MOVE_BLANK_TAB_COLLECTION_SEARCH_FOCUS'
export const MOVE_SECTION_FOCUS = 'MOVE_SECTION_FOCUS'
export const MOVE_TAG_SEARCH_FOCUS = 'MOVE_TAG_SEARCH_FOCUS'
export const MOVE_TAB_FOCUS = 'MOVE_TAB_FOCUS'
export const POST_POINT_SUCCESS = 'POST_POINT_SUCCESS'
export const UPDATE_SEARCH_SUGGESTIONS = 'UPDATE_SEARCH_SUGGESTIONS'

export const COLLECTION_EDITOR_MOVE_SECTION_FOCUS = 'COLLECTION_EDITOR_MOVE_SECTION_FOCUS'
export const COLLECTION_EDITOR_MOVE_TAG_SEARCH_FOCUS = 'COLLECTION_EDITOR_MOVE_TAG_SEARCH_FOCUS'
export const COLLECTION_EDITOR_UPDATE_SEARCH_SUGGESTIONS = 'COLLECTION_EDITOR_UPDATE_SEARCH_SUGGESTIONS'
export const COLLECTION_EDITOR_TOGGLE_VIEW_VISIBILITY = 'COLLECTION_EDITOR_TOGGLE_VIEW_VISIBILITY'

export const NEW_POINT_ADD_TAG = 'NEW_POINT_ADD_TAG'
export const NEW_POINT_TOGGLE_VIEW_VISIBILITY = 'NEW_POINT_TOGGLE_VIEW_VISIBILITY'
export const NEW_POINT_MOVE_TAG_FOCUS = 'NEW_POINT_MOVE_TAG_FOCUS'
export const NEW_POINT_MOVE_SECTION_FOCUS = 'NEW_POINT_MOVE_SECTION_FOCUS'
export const NEW_POINT_REMOVE_TAG = 'NEW_POINT_REMOVE_TAG'
export const NEW_POINT_UPDATE_SEARCH_SUGGESTIONS = 'NEW_POINT_UPDATE_SEARCH_SUGGESTIONS'
export const NEW_POINT_MOVE_TAG_SEARCH_FOCUS = 'NEW_POINT_MOVE_TAG_SEARCH_FOCUS'



//TODO: this should probs be stored somewhere else
const base_url = 'http://localhost:8000'


// ------------------------------------
// Action Creators
// ------------------------------------

export const post_tag = (dispatch, new_tag_data) => {
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
            type: NEW_POINT_ADD_TAG,
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


export const post_point = (dispatch, getState, point_data, input_ids) => {
  //return (dispatch, getState) => {
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
            _.each(input_ids, id => {
              document.getElementById(id).value = '';
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
  //}
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
            let tab = get_focused_array_item(getState().points.tabs);
            if (tab.app.views){
              if (tab.app.views.new_point.in_focus){
                dispatch({
                  type: NEW_POINT_UPDATE_SEARCH_SUGGESTIONS,
                  suggestions
                });
                resolve();
                return;
              } else if (tab.app.views.collection_editor.in_focus){
                dispatch({
                  type: COLLECTION_EDITOR_UPDATE_SEARCH_SUGGESTIONS,
                  suggestions
                });
                resolve();
                return;
              }
            }
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

export const post_collection = (dispatch, new_collection_data) => {
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
        type: NEW_POINT_TOGGLE_VIEW_VISIBILITY
      })
    } else if (event.altKey && key === 'c'){
      dispatch({
        type: COLLECTION_EDITOR_TOGGLE_VIEW_VISIBILITY
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
  let focused_section = _.find(sections, section => {
    return section.in_focus;
  });
  if (event.altKey && (key === 'k' || key === 'j')){
    let direction = get_direction_from_key(key);
    return dispatch({
      type: MOVE_SECTION_FOCUS,
      direction
    })
  } else if (focused_section.name === 'collection_name_form'){
    if (key === 'Enter'){
      let collection_name = document.getElementById(focused_section.input_id).value;
      post_collection(dispatch, {name:collection_name})
    }
  } else if (focused_section.name === 'collection_search'){
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
        let url = base_url + '/collections/' + collection_to_fetch.collection_id;
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
  } else if (focused_section.name === 'just_add_points_button'){
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
      type: NEW_POINT_MOVE_SECTION_FOCUS,
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
        type: NEW_POINT_MOVE_TAG_FOCUS,
        direction
      })
    } else if (key === 'x'){
      let tag_index = get_focused_array_index(focused_section.tags);
      return dispatch({
        type: NEW_POINT_REMOVE_TAG,
        tag_index
      })
    }
  } else if (focused_section.name === 'point_question_input' || focused_section.name === 'point_answer_input'){
    if (key === 'Enter'){
      let question_input_id = _.find(sections, section => {
        return section.name === 'point_question_input';
      }).input_id;
      let answer_input_id = _.find(sections, section => {
        return section.name === 'point_answer_input';
      }).input_id;
      let point_question = document.getElementById(question_input_id).value;
      let point_answer = document.getElementById(answer_input_id).value;
      post_point(dispatch, getState, {question:point_question, answer:point_answer}, [question_input_id, answer_input_id]);
    }
  } else if (focused_section.name === 'tag_form'){
    if (key === 'Enter'){
      let tag_input_id = _.find(sections, section => {
        return section.name === 'tag_form';
      }).input_id;
      let tag_name = document.getElementById(tag_input_id).value;
      return post_tag(dispatch, {name: tag_name});
    }
  } else if (focused_section.name === 'tags_search'){
    if (event.ctrlKey && (key === 'j' || key === 'k')){
      let direction = get_direction_from_key(key);
      return dispatch({
        type: NEW_POINT_MOVE_TAG_SEARCH_FOCUS,
        direction
      });
    } else if (key === 'Enter'){
      let tag = get_focused_array_item(focused_section.search_suggestions);
      return dispatch({
        type: NEW_POINT_ADD_TAG,
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
      type: COLLECTION_EDITOR_MOVE_SECTION_FOCUS,
      direction
    })
  } else if (event.ctrlKey && (key === 'j' || key === 'k')){
    let direction = get_direction_from_key(key);
    return dispatch({
      type: COLLECTION_EDITOR_MOVE_TAG_SEARCH_FOCUS,
      direction
    })
  } else if (key === 'Enter'){
    let tab = get_focused_array_item(getState().points.tabs);
    let tags_search = _.find(tab.app.views.collection_editor.sections, section => {
      return section.name === 'tags_search';
    });
    let tag_suggestions = tags_search.search_suggestions;
    let tag = get_focused_array_item(tag_suggestions);
    return dispatch({
      type: ADD_TAG_TO_COLLECTION,
      tag
    })
  }
}



// ------------------------------------
// Utility Functions
// ------------------------------------


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
  };
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

const COLLECTION_EDITOR_HANDLERS = {

  [COLLECTION_EDITOR_MOVE_SECTION_FOCUS]: (collection_editor, action) => {
    let sections = collection_editor.sections;
    let section_i;
    let tags_list = _.find(sections, (section, i) => {
      if (section.name === 'tags_list'){ section_i = i; return true; };
    });
    let new_sections = move_array_focus(sections, action.direction);
    return {
      ...collection_editor,
      sections: new_sections
    }
  },

  [COLLECTION_EDITOR_UPDATE_SEARCH_SUGGESTIONS]: (collection_editor, action) => {
    let sections = collection_editor.sections
    let section_i;
    let tags_search = _.find(sections, (section, i) => {
      if (section.name === 'tags_search'){ section_i = i; return true };
    });
    return {
      ...collection_editor,
      sections: [
        ...sections.slice(0,section_i),
        {
          ...tags_search,
          search_suggestions: action.suggestions
        },
        ...sections.slice(section_i+1),
      ]
    }
  },

  [COLLECTION_EDITOR_MOVE_TAG_SEARCH_FOCUS]: (collection_editor, action) => {
    let sections = collection_editor.sections;
    let section_i;
    let tags_search = _.find(sections, (section, i) => {
      if (section.name === 'tags_search'){ section_i = i; return true; };
    });
    let new_suggestions = move_array_focus(tags_search.search_suggestions, action.direction);
    return {
      ...collection_editor,
      sections: [
        ...collection_editor.sections.slice(0,section_i),
        {
          ...tags_search,
          search_suggestions: new_suggestions
        },
        ...collection_editor.sections.slice(section_i+1)
      ]
    }
  },

  [COLLECTION_EDITOR_TOGGLE_VIEW_VISIBILITY]: (collection_editor, action) => {
    return {
      ...collection_editor,
      in_focus: !collection_editor.in_focus
    }
  }

}


const NEW_POINT_HANDLERS = {

  [NEW_POINT_ADD_TAG]: (new_point, action) => {
    let sections = new_point.sections;
    let section_i;
    let tags_list = _.find(sections, (section, i) => {
      if (section.name === 'tags_list'){ section_i = i; return true; };
    });
    if (get_focused_array_index(tags_list.tags) < 0){
      action.tag.in_focus = true;
    }
    return {
      ...new_point,
      sections: [
        ...sections.slice(0,section_i),
        {
          ...tags_list,
          tags: [
            ...tags_list.tags,
            action.tag
          ]
        },
        ...sections.slice(section_i+1),
      ]
    }
  },

  [NEW_POINT_MOVE_TAG_SEARCH_FOCUS]: (new_point, action) => {
    let sections = new_point.sections;
    let section_i;
    let tags_search = _.find(sections, (section, i) => {
      if (section.name === 'tags_search'){ section_i = i; return true; };
    });
    let suggestions = move_array_focus(tags_search.search_suggestions, action.direction);
    return {
      ...new_point,
      sections: [
        ...sections.slice(0,section_i),
        {
          ...tags_search,
          search_suggestions: suggestions
        },
        ...sections.slice(section_i+1)
      ]
    }
  },

  [NEW_POINT_MOVE_TAG_FOCUS]: (new_point, action) => {
    let sections = new_point.sections;
    let section_i;
    let tags_list = _.find(sections, (section, i) => {
      if (section.name === 'tags_list'){ section_i = i; return true; };
    });
    let tags = move_array_focus(tags_list.tags, action.direction);
    return {
      ...new_point,
      sections: [
        ...new_point.sections.slice(0,section_i),
        {
          ...tags_list,
          tags: tags
        },
        ...new_point.sections.slice(section_i+1),
      ]
    }
  },

  [NEW_POINT_MOVE_SECTION_FOCUS]: (new_point, action) => {
    let sections = move_array_focus(new_point.sections, action.direction);
    return {
      ...new_point,
      sections: sections
    }
  },

  [NEW_POINT_REMOVE_TAG]: (new_point, action) => {
    let tag_index = action.tag_index;
    let section_i;
    let tags_list = _.find(new_point.sections, (section, i) => {
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
    tags.splice(tag_index,1);
    return {
      ...new_point,
      sections: [
        ...new_point.sections.slice(0,section_i),
        {
          ...tags_list,
          tags: tags
        },
        ...new_point.sections.slice(section_i+1),
      ]
    }
  },

  [NEW_POINT_TOGGLE_VIEW_VISIBILITY]: (new_point, action) => {
    return {
      ...new_point,
      in_focus: !new_point.in_focus
    }
  },

  [NEW_POINT_UPDATE_SEARCH_SUGGESTIONS]: (new_point, action) => {
    let section_i;
    let tags_search = _.find(new_point.sections, (section, i) => {
      if (section.name === 'tags_search'){ section_i = i; return true };
    });
    return {
      ...new_point,
      sections: [
        ...new_point.sections.slice(0,section_i),
        {
          ...tags_search,
          search_suggestions: action.suggestions
        },
        ...new_point.sections.slice(section_i+1)
      ]
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

  [ADD_TAG_TO_COLLECTION]: (collection, action) => {
    if (get_focused_array_index(collection.tags) < 0){
      action.tag.in_focus = true;
    }
    return {
      ...collection,
      tags: [
        ...collection.tags,
        action.tag
      ]
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
  },

  [UPDATE_SEARCH_SUGGESTIONS]: (collection, action) => {
    if (collection.app.is_blank){
      let collection_search = _.find(collection.app.sections, section => {
        return section.name === 'collection_search';
      });
      collection_search.search_suggestions = action.suggestions;
    } else if (collection.app.is_just_add_points){
      if (collection.app.views.new_point.in_focus){
        let tags_search = _.find(collection.app.views.new_point.sections, section => {
          return section.name === 'tags_search';
        });
        if (tags_search.in_focus){
          tags_search.search_suggestions = action.suggestions;
        }
      }
    }
    return collection
  }

}



// ------------------------------------
// Reducer
// ------------------------------------

const reducer = (state = initialState, action) => {
  if (action.type in GLOBAL_ACTION_HANDLERS){
    let handler = GLOBAL_ACTION_HANDLERS[action.type]
    return handler(state, action)
  }
  let focused_tab = get_focused_array_item(state.tabs);
  let focused_tab_index = get_focused_array_index(state.tabs);
  if (action.type in NEW_POINT_HANDLERS){
    let handler = NEW_POINT_HANDLERS[action.type];
    let new_point = handler(state.tabs[focused_tab_index].app.views.new_point, action);
    return {
      ...state,
      tabs: [
        ...state.tabs.slice(0, focused_tab_index),
        {
          ...state.tabs[focused_tab_index],
          app: {
            ...state.tabs[focused_tab_index].app,
            views: {
              ...state.tabs[focused_tab_index].app.views,
              new_point: new_point
            }
          }
        },
        ...state.tabs.slice(focused_tab_index + 1)
      ]
    };
  } else if (action.type in COLLECTION_EDITOR_HANDLERS){
    let handler = COLLECTION_EDITOR_HANDLERS[action.type];
    let collection_editor = handler(state.tabs[focused_tab_index].app.views.collection_editor, action);
    return {
      ...state,
      tabs: [
        ...state.tabs.slice(0, focused_tab_index),
        {
          ...state.tabs[focused_tab_index],
          app: {
            ...state.tabs[focused_tab_index].app,
            views: {
              ...state.tabs[focused_tab_index].app.views,
              collection_editor: collection_editor
            }
          }
        },
        ...state.tabs.slice(focused_tab_index + 1)
      ]
    };
  } else if (action.type in FOCUSED_TAB_HANDLERS){
    let handler = FOCUSED_TAB_HANDLERS[action.type];
    return {
      ...state,
      tabs: [
        ...state.tabs.slice(0, focused_tab_index),
        handler(focused_tab, action),
        ...state.tabs.slice(focused_tab_index + 1),
      ]
    };
  }
  return state;
}


export default reducer
