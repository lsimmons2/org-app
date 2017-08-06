import initialState from '../initial-state'
//export { populatePoints, submitPoint } from './api-callers'
import { combineReducers } from 'redux';
//import { POINTS_GET_ALL, KEY_PRESS, IGNORE, NAVIGATE_LIST, TOGGLE_ANSWER_VISIBILITY, TOGGLE_INSERT_MODE, TOGGLE_CATEGORY_SEARCHER, POPULATE_CATEGORIES } from './constants'
export const POINTS_GET_ALL = 'POINTS_GET_ALL'
export const KEY_PRESS = 'KEY_PRESS'
export const IGNORE = 'IGNORE'
export const NAVIGATE_LIST = 'NAVIGATE_LIST'
export const TOGGLE_ANSWER_VISIBILITY = 'TOGGLE_ANSWER_VISIBILITY'
export const TOGGLE_INSERT_MODE = 'TOGGLE_INSERT_MODE'
export const TOGGLE_CATEGORY_SEARCHER = 'TOGGLE_CATEGORY_SEARCHER'
export const POPULATE_DOMAIN_CATEGORIES = 'POPULATE_DOMAIN_CATEGORIES'
export const POPULATE_APP_CATEGORIES = 'POPULATE_APP_CATEGORIES'




const setPointsAppState = (pointsArr) => {
  pointsArr[0].inFocus = true;
  return pointsArr.map(point => {
    point.isVisible = false;
    return point
  })
}


export const populatePoints = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      var url = 'http://localhost:8000/points/populate';
      fetch(url,{})
        .then((response) => {
          var pointsPromise = response.json();
          pointsPromise.then((pointsBody) => {
            //let categoriesWithAppState = pointsBody.categories.map(category => );
            //let appCategories = setPointsAppState(categories);
            let domainCategories = pointsBody.categories;
            //console.log('appCategories');
            //console.log(appCategories);
            //console.log('domainCategories');
            //console.log(domainCategories);
            //categories = [
              //{
                //name: 'economics',
                //time_last_updated: Date,
                //points: []
              //}
            //]
            dispatch({
              type: POPULATE_DOMAIN_CATEGORIES,
              domainCategories: domainCategories
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


export const submitPoint = (formData) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      var url = 'http://localhost:8000/points/category/economics';
      let body = formData;
      body['category'] = 'economics';
      let requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
      fetch(url, requestOptions)
        .then((response)=> {
          var pointsPromise = response.json();
          pointsPromise.then((pointsBody)=> {
            let points = pointsBody.points.map((point, index) => {
              if (index === 0){
                point.inFocus = true;
              } else {
                point.inFocus = false;
              }
              point.isVisible = false;
              return point;
            })
            dispatch({
              type    : POINTS_GET_ALL,
              payload : points
            })
            clearForm();
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


const toggleCategorySearcher = (state, action) => {
  let isSearcherSelected = state.sections.pointCategorySelector.selected;
  return {
    ...state,
    sections: {
      ...state.sections,
      pointCategorySelector: {
        ...state.sections.pointCategorySelector,
        selected: !isSearcherSelected
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



const populateDomainCategories = (state, action) => {
  return {
    ...state,
    categories: action.domainCategories
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const APP_ACTION_HANDLERS = {
  [IGNORE]    : (state, action) => state,
  [TOGGLE_INSERT_MODE]: (state, action) => {
    return toggleInsertMode(state, action)
  },
  [TOGGLE_CATEGORY_SEARCHER]: (state, action) => {
    return toggleCategorySearcher(state, action)
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
  },
  [POPULATE_DOMAIN_CATEGORIES]: (state, action) => {
    return populateDomainCategories(state, action) 
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
