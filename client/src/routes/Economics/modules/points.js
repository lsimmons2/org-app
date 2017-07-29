import 'whatwg-fetch'
import initialState from '../initial-state'
// ------------------------------------
// Constants
// ------------------------------------
export const POINTS_DOUBLE_ASYNC = 'POINTS_DOUBLE_ASYNC'
export const POINTS_GET_ALL = 'POINTS_GET_ALL'
export const KEY_PRESS = 'KEY_PRESS'
export const IGNORE = 'IGNORE'

// ------------------------------------
// Actions
// ------------------------------------

//API CALLS
export const submitPoint = (formData) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      var url = 'http://localhost:8000/points';
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

const clearForm = () => {
  console.log('in clear form');
  document.getElementById('question').focus();
  document.getElementById('point-form').reset();
}

export const getAll = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      var url = 'http://localhost:8000/points/category/economics';
      fetch(url,{})
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
// NAVIGATION
// ------------------------------------
export function detectKeypress(event) {
  return {
    type    : KEY_PRESS,
    event: event
  }
}

const handleMetaCommand = (state, action) => {
  let key = action.event.key;
  let sections = state.sections;
  if (key === 'k' && sections.pointList.selected){
    document.getElementById('question').focus();
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
        }
      }
    }
  } else if (key === 'j' && sections.pointForm.selected){
    document.getElementById('question').blur();
    document.getElementById('answer').blur();
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
        }
      }
    }
  }
  return state;
}

const handleListCommand = (state, action) => {
  let key = action.event.key;
  if (key === 'j'){
    return movePointFocus(state, 1)
  } else if (key === 'k'){
    return movePointFocus(state, -1)
  } else if (key === ' '){
    return toggleAnswerVisibility(state)
  } else {
    return state;
  }
}

const movePointFocus = (state, direction) => {
  let newPoints = state.points.map(point => point)
  for (var i = 0; i < newPoints.length; i++){
    let point = newPoints[i];
    if (point.inFocus){
      if (direction === -1){
        if (i === 0){
          return state;
        } else {
          point.inFocus = false;
          newPoints[i-1].inFocus = true;
          break;
        }
      } else if (direction === 1){
        if (i === newPoints.length -1){
          return state;
        } else {
          point.inFocus = false;
          newPoints[i+1].inFocus = true;
          break;
        }
      }
    }
  }
  return {
    ...state,
    points: newPoints
  };
}

export const toggleAnswerVisibility = (state) => {
  let newPoints = [];
  for (var i = 0; i < state.points.length; i++){
    let point = state.points[i];
    if (point.inFocus){
      point.isVisible = !point.isVisible;
    }
    newPoints.push(point);
  }
  return {
    ...state,
    points: newPoints
  };
}

export const actions = {
  getAll
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [IGNORE]    : (state, action) => state,
  [POINTS_DOUBLE_ASYNC] : (state, action) => state * 2,
  [POINTS_GET_ALL] : (state, action) => {
    return {
      ...state,
      points: action.payload
    }
  },
  [KEY_PRESS] : (state, action) => {
    if (action.event.metaKey){
      return handleMetaCommand(state, action);
    } else if (state.sections.pointList.selected){
      return handleListCommand(state, action);
    }
    return state
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
//const initialState = []
export default function pointsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
