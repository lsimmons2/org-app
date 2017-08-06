import initialState from '../initial-state'
import { combineReducers } from 'redux';
export const POINTS_GET_ALL = 'POINTS_GET_ALL'
export const KEY_PRESS = 'KEY_PRESS'
export const IGNORE = 'IGNORE'
export const NAVIGATE_LIST = 'NAVIGATE_LIST'
export const TOGGLE_ANSWER_VISIBILITY = 'TOGGLE_ANSWER_VISIBILITY'
export const TOGGLE_INSERT_MODE = 'TOGGLE_INSERT_MODE'
export const TOGGLE_CATEGORY_SEARCHER = 'TOGGLE_CATEGORY_SEARCHER'
export const POPULATE_DOMAIN_CATEGORIES = 'POPULATE_DOMAIN_CATEGORIES'
export const POPULATE_APP_CATEGORIES = 'POPULATE_APP_CATEGORIES'
export const NAVIGATE_CATEGORY_SELECTOR = 'NAVIGATE_CATEGORY_SELECTOR'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
import store from '../../../main'
import _ from 'underscore'




const setCategoriesAppState = (categories) => {
  //TODO: remove domain state data from categories and points
  return categories.map((category, i) => {
    let appPoints = category.points.map(point => {
      point.isVisible = false;
      return point;
    })
    if (i !== 0){
      category.is_selected = false;
    } else {
      category.is_selected = true;
    }
    category.points = appPoints;
    return category;
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
            let appCategories = setCategoriesAppState(pointsBody.categories);
            let domainCategories = pointsBody.categories;
            dispatch({
              type: POPULATE_DOMAIN_CATEGORIES,
              domainCategories: domainCategories
            })
            dispatch({
              type: POPULATE_APP_CATEGORIES,
              appCategories: appCategories
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
                point.in_focus = true;
              } else {
                point.in_focus = false;
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

//export function detectKeypress(event) {
    //if (event.metaKey){
      //return handleMetaCommand(event);
    //}
    //return handleCommand(event);
//}

 

export const detectKeypress = (event) => {
  return (dispatch, getState) => {
    let key = event.key;
    if (key === 'c'){
      return dispatch({
        type: TOGGLE_CATEGORY_SEARCHER
      })
    } else if (event.metaKey && key === 'i'){
      return dispatch({
        type: TOGGLE_INSERT_MODE
      })
    }
    let sections = getState().points.app.sections;
    if (sections.pointCategorySelector.is_selected){
      if (key === 'j'){
        return dispatch({
          type: NAVIGATE_CATEGORY_SELECTOR,
          direction: 1
        })
      } else if (key === 'k'){
        return dispatch({
          type: NAVIGATE_CATEGORY_SELECTOR,
          direction: -1
        })
      } else if (key === ' '){
        //TODO: should be id field rather than name field
        //let targetCategoryName = getState().points.app.sections;
        let categories = getState().points.app.categories;
        let targetCategoryName = _.find(categories, cat => {
          return cat.in_focus;
        }).name
        return dispatch({
          type: SELECT_CATEGORY,
          name: targetCategoryName
        })
      }
    }
  }
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


const handleCommand = (event) => {
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
  } else {
    return {
      type: IGNORE
    }
  }
}

const moveListFocus = (list, direction) => {
  //let newList = list.map(item => item)
  for (var i = 0; i < list.length; i++){
    let item = list[i];
    if (item.in_focus){
      if (direction === -1 && i !== 0){
        item.in_focus = false;
        list[i-1].in_focus = true;
        break;
      } else if (direction === 1 && i !== list.length -1){
        item.in_focus = false;
        list[i+1].in_focus = true;
        break;
      }
    }
  }
  return list
}

// ------------------------------------
// Reducer helpers
// ------------------------------------

const navigateCategorySelector = (state, action) => {
  let newCategories = state.categories.map(cat => cat);
  moveListFocus(newCategories, action.direction)
  return {
    ...state,
    categories: newCategories
  };
}


const navigateList = (state, action) => {
  let direction = action.direction;
  if (state.sections.pointCategorySelector.is_selected){
    let newCategories = moveListFocus(state.categories, direction)
    return {
      ...state,
      categories: newCategories
    };
  } else {
    let newPoints = state.points.map(point => point)
    for (var i = 0; i < newPoints.length; i++){
      let point = newPoints[i];
      if (point.in_focus){
        if (direction === -1 && i !== 0){
          point.in_focus = false;
          newPoints[i-1].in_focus = true;
          break;
        } else if (direction === 1 && i !== newPoints.length -1){
          point.in_focus = false;
          newPoints[i+1].in_focus = true;
          break;
        }
      }
    }
    return {
      ...state,
      points: newPoints
    };
  }
}


const toggleInsertMode = (state, action) => {
  let isFormSelected = state.sections.pointForm.is_selected;
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
        is_selected: !isFormSelected
      }
    }
  }
}


const toggleCategorySearcher = (state, action) => {
  let isSearcherSelected = state.sections.pointCategorySelector.is_selected;
  return {
    ...state,
    sections: {
      ...state.sections,
      pointCategorySelector: {
        ...state.sections.pointCategorySelector,
        is_selected: !isSearcherSelected
      }
    }
  }
}


const toggleAnswerVisibility = (state, action) => {
  let newPoints = state.points.map(point => {
    if (point.in_focus){
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


const populateAppCategories = (state, action) => {
  return {
    ...state,
    categories: action.appCategories
  };
}

const selectCategory = (state, action) => {
  let newCategories = state.categories.map(cat => cat);
  changeListSelection(newCategories, action.name);
  return {
    ...state,
    categories: newCategories
  };
}

const changeListSelection = (list, name) => {
  for (var i = 0; i < list.length; i++){
    if (list[i].name === name){
      list[i].is_selected = true;
    } else {
      list[i].is_selected = false;
    }
  }
}


// ------------------------------------
// Action Handlers
// ------------------------------------

const APP_ACTION_HANDLERS = {
  [IGNORE]: (state, action) => state,
  [TOGGLE_INSERT_MODE]: (state, action) => {
    return toggleInsertMode(state, action)
  },
  [TOGGLE_CATEGORY_SEARCHER]: (state, action) => {
    return toggleCategorySearcher(state, action)
  },
  [NAVIGATE_CATEGORY_SELECTOR]: (state, action) => {
    return navigateCategorySelector(state, action) 
  },
  [NAVIGATE_LIST]: (state, action) => {
    return navigateList(state, action) 
  },
  [SELECT_CATEGORY]: (state, action) => {
    return selectCategory(state, action) 
  }
}


const DOMAIN_ACTION_HANDLERS = {
  [IGNORE]: (state, action) => state,
  [POINTS_GET_ALL]: (state, action) => {
    return {
      ...state,
      points: action.payload
    }
  },
  [TOGGLE_ANSWER_VISIBILITY]: (state, action) => {
    return toggleAnswerVisibility(state, action) 
  },
  [POPULATE_DOMAIN_CATEGORIES]: (state, action) => {
    return populateDomainCategories(state, action) 
  },
  [POPULATE_APP_CATEGORIES]: (state, action) => {
    return populateAppCategories(state, action) 
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
