import initialState from '../initial-state'
export { populatePoints, submitPoint } from './api-callers'
import { combineReducers } from 'redux';
import { POINTS_GET_ALL, KEY_PRESS, IGNORE, NAVIGATE_LIST, TOGGLE_ANSWER_VISIBILITY, TOGGLE_INSERT_MODE, TOGGLE_CATEGORY_SEARCHER } from './constants'


// ------------------------------------
// Actions and Helpers
// ------------------------------------

export function detectKeypress(event) {
    if (event.metaKey){
      return handleMetaCommand(event);
    }
    return handleListCommand(event);
}


const handleMetaCommand = (event) => {
  let key = event.key;
  if (key === 'i'){
    return {
      type: TOGGLE_INSERT_MODE
    }
  } else if (key === 'c'){
    return {
      type: TOGGLE_CATEGORY_SEARCHER
    }
  } else {
    return {
      type: IGNORE
    }
  }
}


const handleListCommand = (event) => {
  let key = event.key;
  if (key === 'j'){
    return {
      type: NAVIGATE_LIST,
      direction: 1
    }
  } else if (key === 'k'){
    return {
      type: NAVIGATE_LIST,
      direction: -1
    }
  } else if (key === ' '){
    return {
      type: TOGGLE_ANSWER_VISIBILITY
    }
  }
}



// ------------------------------------
// Reducer helpers
// ------------------------------------

const navigateList = (state, action) => {
  let direction = action.direction;
  let newPoints = state.points.map(point => point)
  for (var i = 0; i < newPoints.length; i++){
    let point = newPoints[i];
    if (point.inFocus){
      if (direction === -1 && i !== 0){
        point.inFocus = false;
        newPoints[i-1].inFocus = true;
        break;
      } else if (direction === 1 && i !== newPoints.length -1){
        point.inFocus = false;
        newPoints[i+1].inFocus = true;
        break;
      }
    }
  }
  return {
    ...state,
    points: newPoints
  };
}


const toggleInsertMode = (state, action) => {
  let isFormSelected = state.sections.pointForm.selected;
  if (isFormSelected){
    document.getElementById('question-input').blur();
    document.getElementById('answer-input').blur();
  }
  return {
    ...state,
    sections: {
      ...state.sections,
      pointForm: {
        ...state.sections.pointForm,
        selected: !isFormSelected
      }
    }
  }
}


const toggleAnswerVisibility = (state, action) => {
  let newPoints = state.points.map(point => {
    if (point.inFocus){
      point.isVisible = !point.isVisible;
    }
    return point
  })
  return {
    ...state,
    points: newPoints
  };
}


// ------------------------------------
// Action Handlers
// ------------------------------------

const APP_ACTION_HANDLERS = {
  [IGNORE]    : (state, action) => state,
  [TOGGLE_INSERT_MODE]: (state, action) => {
    return toggleInsertMode(state, action)
  }
}


const DOMAIN_ACTION_HANDLERS = {
  [IGNORE]    : (state, action) => state,
  [POINTS_GET_ALL] : (state, action) => {
    return {
      ...state,
      points: action.payload
    }
  },
  [NAVIGATE_LIST]: (state, action) => {
    return navigateList(state, action) 
  },
  [TOGGLE_ANSWER_VISIBILITY]: (state, action) => {
    return toggleAnswerVisibility(state, action) 
  }
}


// ------------------------------------
// Reducer
// ------------------------------------

function domainReducer (state = initialState.domain, action) {
  const handler = DOMAIN_ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

function appReducer (state = initialState.app, action) {
  const handler = APP_ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

export default combineReducers({
  domain: domainReducer,
  app: appReducer
});
