import { connect } from 'react-redux'
import { populatePoints, submitPoint, detectKeypress } from '../modules'
import _ from 'underscore'

import Points from '../components/Points'



const getPointsProps = (globalState) => {
  let appCategories = globalState.points.app.categories;
  let domainCategories = globalState.points.domain.categories;
  let selectedCategory = _.find(appCategories, cat => {
    return cat.is_selected;
  })
  for (var i = 0; i < domainCategories.length; i++){
    if (domainCategories[i].name == selectedCategory.name){
      return generateAppDomainPoints(domainCategories[i].points, selectedCategory.points)
    }
  }
  return []
}


const generateAppDomainPoints = (domainPoints, appPoints) => {
  let appDomainPoints = [];
  //TODO: assert these arrays are same length?
  for (var i = 0; i < domainPoints.length; i++){
    let domainPoint = domainPoints[i];
    let appPoint = appPoints[i];
    let appDomainPoint = {};
    for (var prop in domainPoint){
      appDomainPoint[prop] = domainPoint[prop];
    }
    for (var prop in appPoint){
      appDomainPoint[prop] = appPoint[prop];
    }
    appDomainPoints.push(appDomainPoint);
  }
  return appDomainPoints;
}


const getCategories = (globalState) => {
  let appCategories = globalState.points.app.categories;
  return appCategories;
}


const mapDispatchToProps = {
  populatePoints,
  submitPoint,
  detectKeypress
}


const mapStateToProps = (globalState) => {
  return {
    points: getPointsProps(globalState),
    categories: getCategories(globalState),
    sections: globalState.points.app.sections
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Points)
