
import 'whatwg-fetch'

//import { POPULATE_CATEGORIES } from './constants'


const setPointsAppState = (pointsArr) => {
  pointsArr[0].in_focus = true;
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
            console.log('pointsBody');
            console.log(pointsBody);
            //let categoriesWithAppState = pointsBody.categories.map(category => );
            //let appCategories = setPointsAppState(categories);
            let domainCategories = pointsBody.categories;
            //console.log('appCategories');
            //console.log(appCategories);
            console.log('domainCategories');
            console.log(domainCategories);
            //categories = [
              //{
                //name: 'economics',
                //time_last_updated: Date,
                //points: []
              //}
            //]
            dispatch({
              type: POPULATE_CATEGORIES,
              appCategories: appCategories,
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
