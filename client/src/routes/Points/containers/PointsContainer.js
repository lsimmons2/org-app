import { connect } from 'react-redux'
import { populatePoints, submitPoint, detectKeypress } from '../modules'
import _ from 'underscore'


import Points from '../components/Points'


const getPoints = (globalState) => {
  let appCategories = globalState.points.app.categories;
  //if (!globalState.points.app){
    //populateAppState()
  //}
  //TODO: FIX THIS
  let domainCategories = globalState.points.domain.categories;
  let selectedCategory = _.find(appCategories, cat => {
    return cat.is_selected;
  })
  for (var i = 0; i < domainCategories.length; i++){
    if (domainCategories[i].name == selectedCategory.name){
      let points = generateAppDomainPoints(domainCategories[i].points, selectedCategory.points)
      return points
      //return domainCategories[i].points
    }
  }
  return []
}


const generateAppDomainPoints = (domainPoints, appPoints) => {
  let combinedPoints = [];
  for (var i = 0; i < domainPoints.length; i++){
    let domainPoint = domainPoints[i];
    let appPoint = appPoints[i];
    let newPoint = {};
    for (var prop in domainPoint){
      newPoint[prop] = domainPoint[prop];
    }
    for (var prop in appPoint){
      newPoint[prop] = appPoint[prop];
    }
    combinedPoints.push(newPoint);
  }
  return combinedPoints;
}


const getCategories = (globalState) => {
  let appCategories = globalState.points.app.categories;
  //if (!globalState.points.app){
    //populateAppState()
  //}
  return appCategories;
}


const mapDispatchToProps = {
  populatePoints,
  submitPoint,
  detectKeypress
}


const mapStateToProps = (globalState) => {
  return {
    points: getPoints(globalState),
    categories: getCategories(globalState),
    sections: globalState.points.app.sections
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Points)
