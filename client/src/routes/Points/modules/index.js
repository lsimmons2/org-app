import initialState from '../initial-state'
export { populatePoints, submitPoint } from './api-callers'
import { combineReducers } from 'redux';
import { POINTS_GET_ALL, KEY_PRESS, IGNORE, NAVIGATE_LIST, TOGGLE_ANSWER_VISIBILITY } from './constants'

// ------------------------------------
// Actions
// ------------------------------------

//const handleMetaCommand = (state, action) => {
  //let key = action.event.key;
  //let sections = state.sections;
  //if (key === 'i' && sections.pointList.selected){

    //return {
      //...state,
      //sections: {
        //...state.sections,
        //pointList: {
          //...state.sections.pointList,
          //selected: false
        //},
        //pointForm: {
          //...state.sections.pointForm,
          //selected: true
        //},
        //pointCategorySelector: {
          //...state.sections.pointCategorySelector,
          //selected: false
        //}
      //}
    //}
  //} else if (key === 'c' && sections.pointList.selected){

    //return {
      //...state,
      //sections: {
        //...state.sections,
        //pointList: {
          //...state.sections.pointList,
          //selected: false
        //},
        //pointForm: {
          //...state.sections.pointForm,
          //selected: false
        //},
        //pointCategorySelector: {
          //...state.sections.pointCategorySelector,
          //selected: true
        //}
      //}
    //}
  //} else if (key === 'i' && sections.pointForm.selected){

    //document.getElementById('question-input').blur();
    //document.getElementById('answer-input').blur();
    //return {
      //...state,
      //sections: {
        //...state.sections,
        //pointList: {
          //...state.sections.pointList,
          //selected: true
        //},
        //pointForm: {
          //...state.sections.pointForm,
          //selected: false
        //},
        //pointCategorySelector: {
          //...state.sections.pointCategorySelector,
          //selected: false
        //}
      //}
    //}
  //} else if (key === 'c' && sections.pointCategorySelector.selected){

    //return {
      //...state,
      //sections: {
        //...state.sections,
        //pointList: {
          //...state.sections.pointList,
          //selected: true
        //},
        //pointForm: {
          //...state.sections.pointForm,
          //selected: false
        //},
        //pointCategorySelector: {
          //...state.sections.pointCategorySelector,
          //selected: false
        //}
      //}
    //}
  //}
  //return state;
//}

//const handleListCommand = (state, action) => {
  //let key = action.event.key;
  //if (key === 'j'){
    //return movePointFocus(state, 1)
  //} else if (key === 'k'){
    //return movePointFocus(state, -1)
  //} else if (key === ' '){
    //return toggleAnswerVisibility(state)
  //} else {
    //return state;
  //}
//}

//const movePointFocus = (state, direction) => {
  //let newPoints = state.domain.points.map(point => point)
  //for (var i = 0; i < newPoints.length; i++){
    //let point = newPoints[i];
    //if (point.inFocus){
      //if (direction === -1){
        //if (i === 0){
          //return state;
        //} else {
          //point.inFocus = false;
          //newPoints[i-1].inFocus = true;
          //break;
        //}
      //} else if (direction === 1){
        //if (i === newPoints.length -1){
          //return state;
        //} else {
          //point.inFocus = false;
          //newPoints[i+1].inFocus = true;
          //break;
        //}
      //}
    //}
  //}
  //return {
    //...state,
    //domain: {
      //...state.domain,
      //points: newPoints
    //}
  //};
//}

//export const toggleAnswerVisibility = (state) => {
  //let newPoints = [];
  //for (var i = 0; i < state.domain.points.length; i++){
    //let point = state.domain.points[i];
    //if (point.inFocus){
      //point.isVisible = !point.isVisible;
    //}
    //newPoints.push(point);
  //}
  //return {
    //...state,
    //domain: {
      //points: newPoints
    //}
  //};
//}

export function detectKeypress(event) {
    if (event.metaKey){
      return handleMetaCommand(event);
    }
    return handleListCommand(event);
}

const handleMetaCommand = (event) => {

  let key = event.key;
  let sections = state.sections;
  if (key === 'i' && sections.pointList.selected){

    return {
      ...state,
      sections: {
        ...state.sections,
        pointList: {
          ...state.sections.pointList,
          selected: false
        },
        pointForm: {
          ...state.sections.pointForm,
          selected: true
        },
        pointCategorySelector: {
          ...state.sections.pointCategorySelector,
          selected: false
        }
      }
    }
  } else if (key === 'c' && sections.pointList.selected){

    return {
      ...state,
      sections: {
        ...state.sections,
        pointList: {
          ...state.sections.pointList,
          selected: false
        },
        pointForm: {
          ...state.sections.pointForm,
          selected: false
        },
        pointCategorySelector: {
          ...state.sections.pointCategorySelector,
          selected: true
        }
      }
    }
  } else if (key === 'i' && sections.pointForm.selected){

    document.getElementById('question-input').blur();
    document.getElementById('answer-input').blur();
    return {
      ...state,
      sections: {
        ...state.sections,
        pointList: {
          ...state.sections.pointList,
          selected: true
        },
        pointForm: {
          ...state.sections.pointForm,
          selected: false
        },
        pointCategorySelector: {
          ...state.sections.pointCategorySelector,
          selected: false
        }
      }
    }
  } else if (key === 'c' && sections.pointCategorySelector.selected){

    return {
      ...state,
      sections: {
        ...state.sections,
        pointList: {
          ...state.sections.pointList,
          selected: true
        },
        pointForm: {
          ...state.sections.pointForm,
          selected: false
        },
        pointCategorySelector: {
          ...state.sections.pointCategorySelector,
          selected: false
        }
      }
    }
  }
  return state;
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

const movePointFocus = (direction) => {
  //return {
    //...state,
    //domain: {
      //...state.domain,
      //points: newPoints
    //}
  //};
}

export const toggleAnswerVisibility = (state, action) => {
  //let newPoints = [];
  //for (var i = 0; i < state.domain.points.length; i++){
    //let point = state.domain.points[i];
    //if (point.inFocus){
      //point.isVisible = !point.isVisible;
    //}
    //newPoints.push(point);
  //}
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

// ------------------------------------
// Action Handlers
// ------------------------------------

const APP_ACTION_HANDLERS = {
  [IGNORE]    : (state, action) => state,
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
