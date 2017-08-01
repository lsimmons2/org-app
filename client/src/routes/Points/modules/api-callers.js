
import 'whatwg-fetch'

import { POINTS_GET_ALL } from './constants'

//CATEGORY SEARCHER
//{
  //categories: [
    //{
      //name: 'economics',
      //time_last_updated: Date,
      //points: []
    //}
  //]
//}

export const populatePoints = () => {
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
