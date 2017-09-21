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
import store from '../../../main'
import _ from 'underscore'



// ------------------------------------
// Actions and Helpers
// ------------------------------------

export const populatePoints = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      var url = 'http://localhost:8000/points/populate';
      fetch(url,{})
        .then((response) => {
          var pointsPromise = response.json();
          pointsPromise.then(pointsBody => {
            let domainCategories = pointsBody.categories;
            let appCategories = getCategoriesAppState(pointsBody.categories);
            //TODO: should I be dispatching an app state action heree, or should I just be updating domain state and letting function in container be creating app state?
            dispatch({
              type: POPULATE_APP_CATEGORIES,
              appCategories: appCategories
            })
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
      //this should be it's own helper function, need it to be able to access state
      let categories = getState().points.app.categories;
      let targetCategoryId = _.find(categories, cat => {
        return cat.in_focus;
      }).category_id
      var url = 'http://localhost:8000/points/category/' + targetCategoryId;
      let requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }
      fetch(url, requestOptions)
        .then((response)=> {
          var pointsPromise = response.json();
          pointsPromise.then(pointsBody => {
            dispatch({
              type: ADD_POINT_SUCCESS,
              added_point: pointsBody.point
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


export const submitCategory = (formData) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      //this should be it's own helper function, need it to be able to access state
      let categories = getState().points.app.categories;
      var url = 'http://localhost:8000/category';
      if ('category_name' in formData){
        formData.name = formData.category_name;
        delete formData.category_name;
      }
      let requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }
      fetch(url, requestOptions)
        .then((response)=> {
          var category_promise = response.json();
          category_promise.then(category_body => {
            dispatch({
              type: ADD_CATEGORY_SUCCESS_APP,
              added_category: getCategoriesAppState(category_body.added_category)
            })
            dispatch({
              type: ADD_CATEGORY_SUCCESS_DOMAIN,
              added_category: category_body.added_category
            })
            clearCategoryForm();
            resolve(); })
        })
        .catch((error)=> {
          console.log('errrrrrrrr');
          console.log(error)
          resolve();
        });
    })
  }
}


const getCategoriesAppState = (domainCategories) => {
  //TODO: returning an object if passed an object, and an array if passed
  //an array. not sure if this is bad practice...
  let passedSingleCat = false;
  //TODO: this conditional is for when a single cat is passed: bad naming
  if (!(domainCategories instanceof Array)){
    domainCategories = [domainCategories]
    passedSingleCat = true;
  }
  let appCategories = [];
  for (var i = 0; i < domainCategories.length; i++){
    let domainCategory = domainCategories[i];
    let appCategory = {};
    let appStateCatProps = ['name', 'in_focus', 'is_selected', 'category_id']
    let appStatePointProps = ['point_id', 'in_focus', 'is_visible']
    for (var prop in domainCategory){
      if (appStateCatProps.indexOf(prop) > -1){
        appCategory[prop] = domainCategory[prop]
      }
    }
    //TODO: map was overwriting original instance - should have more elegant solution than this?
    let appPoints = [];
    if (domainCategory.hasOwnProperty('points') && domainCategory.points instanceof Array){
      for (var j = 0; j < domainCategory.points.length; j++){
        let domainPoint = domainCategory.points[j];
        let appPoint = {};
        for (var prop in domainPoint){
          if (appStatePointProps.indexOf(prop) > -1){
            appPoint[prop] = domainPoint[prop]
          }
        }
        appPoint.in_focus = j === 0 ? true : false;
        appPoint.isVisible = false;
        appPoints.push(appPoint)
      }
    }
    appCategory.is_selected = i === 0 ? true: false;
    appCategory.in_focus = i === 0 ? true: false;
    appCategory.points = appPoints;
    appCategories.push(appCategory);
  }
  if (passedSingleCat){
    return appCategories[0]
  }
  return appCategories
}


export const detectKeypress = (event) => {
  return (dispatch, getState) => {
    let key = event.key;
    let sections = getState().points.app.sections;
    if (sections.pointCategorySelector.is_selected){
      return handleCategoriesCommand(event, dispatch, getState)
    } else if (sections.pointList.is_selected){
      return handleListCommand(event, dispatch, getState)
    }
  }
}


const handleCategoriesCommand = (event, dispatch, getState) => {
  let key = event.key;
  if (event.ctrlKey && key === 'c'){
    return dispatch({
      type: TOGGLE_CATEGORY_SEARCHER
    })
  } else if (event.ctrlKey && key === 'i'){
    return dispatch({
      type: TOGGLE_CATEGORY_FORM
    })
  } else if (key === 'j'){
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
    //TODO: return ignore action if category is already selected
    return dispatch({
      type: SELECT_CATEGORY,
      name: targetCategoryName
    })
  //} else if (event.ctrlKey && key === 'i'){
    //return dispatch({
      //type: TOGGLE_CATEGORY_FORM
    //})
  }
}
 

const handleListCommand = (event, dispatch, getState) => {
  let key = event.key;
  if (event.ctrlKey && key === 'c'){
    return dispatch({
      type: TOGGLE_CATEGORY_SEARCHER
    })
  } else if (event.ctrlKey && key === 'i'){
    return dispatch({
      type: TOGGLE_INSERT_MODE
    })
  } else if (key === 'j'){
    return dispatch({
      type: NAVIGATE_POINT_LIST,
      direction: 1
    })
  } else if (key === 'k'){
    return dispatch({
      type: NAVIGATE_POINT_LIST,
      direction: -1
    })
  } else if (key === ' '){
    let categories = getState().points.app.categories;
    let targetCategory = _.find(categories, cat => {
      return cat.is_selected;
    });
    let targetPointId = _.find(targetCategory.points, point => {
      return point.in_focus
    }).point_id
    return dispatch({
      type: TOGGLE_ANSWER_VISIBILITY,
      categoryName: targetCategory.name,
      pointId: targetPointId
    })
  }
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


const navigatePointList = (state, action) => {
  let categories = state.categories;
  let targetCategory = _.find(categories, cat => {
    return cat.is_selected;
  });
  let newPoints = targetCategory.points.map(point => point)
  moveListFocus(newPoints, action.direction)
  //TODO: each category should have it's own reducer?
  let newAppCategories = state.categories.map(cat => {
    if (cat.name === targetCategory.name){
      cat.points = newPoints;
    }
    return cat
  })
  return {
    ...state,
    categories: newAppCategories
  };
}


const moveListFocus = (list, direction) => {
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


const toggleCategoryForm = (state, action) => {
  let isFormSelected = state.sections.pointCategoryForm.is_selected;
  //if (isFormSelected){
    //document.getElementById('category-input').blur();
  //}
  return {
    ...state,
    sections: {
      ...state.sections,
      pointCategoryForm: {
        ...state.sections.pointCategoryForm,
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
  let targetCategoryPoints = _.find(state.categories, cat => {
    return cat.is_selected;
  }).points;
  let newPoints = targetCategoryPoints.map(point => {
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


const clearCategoryForm = () => {
  document.getElementById('category-input').value = '';
}


const clearForm = () => {
  document.getElementById('question-input').value = '';
  document.getElementById('answer-input').value = '';
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


const addPoint = (state, action) => {
  let selectedCategoryId = action.added_point.category_id;
  let selectedCategoryPoints = _.find(state.categories, cat => {
    return cat.category_id === selectedCategoryId;
  }).points;
  let newPoints = selectedCategoryPoints.map(point => point )
  newPoints.push(action.added_point);
  let newDomainCategories = state.categories.map(cat => {
    if (cat.category_id === selectedCategoryId){
      cat.points = newPoints;
    }
    return cat
  })
  return {
    ...state,
    categories: newDomainCategories
  };
}


const addCategorySuccess = (state, action) => {
  let newCategory = action.added_category;
  let newCategories = state.categories.map(cat => cat )
  newCategories.push(newCategory)
  return {
    ...state,
    categories: newCategories
  };
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
  [NAVIGATE_POINT_LIST]: (state, action) => {
    return navigatePointList(state, action) 
  },
  [SELECT_CATEGORY]: (state, action) => {
    return selectCategory(state, action) 
  },
  [POPULATE_APP_CATEGORIES]: (state, action) => {
    return populateAppCategories(state, action) 
  },
  [TOGGLE_ANSWER_VISIBILITY]: (state, action) => {
    return toggleAnswerVisibility(state, action) 
  },
  [TOGGLE_CATEGORY_FORM]: (state, action) => {
    return toggleCategoryForm(state, action) 
  },
  [ADD_CATEGORY_SUCCESS_APP]: (state, action) => {
    return addCategorySuccess(state, action) 
  },
  [ADD_POINT_SUCCESS]: (state, action) => {
    return addPoint(state, action)
  },
}


const DOMAIN_ACTION_HANDLERS = {
  [IGNORE]: (state, action) => state,
  [POPULATE_DOMAIN_CATEGORIES]: (state, action) => {
    return populateDomainCategories(state, action) 
  },
  [ADD_POINT_SUCCESS]: (state, action) => {
    return addPoint(state, action)
  },
  [ADD_CATEGORY_SUCCESS_DOMAIN]: (state, action) => {
    return addCategorySuccess(state, action) 
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
