import { connect } from 'react-redux'
import { populatePoints, submitPoint, detectKeypress, submitCategory } from '../modules'
import _ from 'underscore'

import Points from '../components/Points'



const getPointsProps = (globalState) => {
  let appCategories = globalState.points.app.categories;
  let domainCategories = globalState.points.domain.categories;
  let selectedCategory = _.find(appCategories, cat => {
    return cat.is_selected;
  })
  for (var i = 0; i < domainCategories.length; i++){
    if (domainCategories[i].category_id == selectedCategory.category_id){
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


const combineArrays = (a, b) => {
  let c = [];
  //TODO: assert these arrays are same length?
  for (var i = 0; i < a.length; i++){
    let a_element = a[i];
    let b_element = b[i];
    let c_element = {};
    for (var prop in a_element){
      c_element[prop] = a_element[prop];
    }
    for (var prop in b_element){
      c_element[prop] = b_element[prop];
    }
    c.push(c_element);
  }
  return c;
}


const getCategories = (globalState) => {
  return combineArrays(globalState.points.app.categories, globalState.points.domain.categories)
}


const mapDispatchToProps = {
  populatePoints,
  submitPoint,
  detectKeypress,
  submitCategory
}


const mapStateToProps = (globalState) => {
  return {
    points: getPointsProps(globalState),
    categories: getCategories(globalState),
    sections: globalState.points.app.sections
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Points)
