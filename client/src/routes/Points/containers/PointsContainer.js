import { connect } from 'react-redux'
import { populatePoints, submitPoint, detectKeypress } from '../modules'


import Points from '../components/Points'


const getPoints = (globalState) => {
  let appCategories = globalState.points.app.categories;
  //if (!globalState.points.app){
    //populateAppState()
  //}
  //TODO: FIX THIS
  let domainCategories = globalState.points.domain.categories;
  let selectedCategory = null;
  for (var i = 0; i < appCategories.length; i++){
    if (appCategories[i].is_selected){
      selectedCategory = appCategories[i];
      break;
    }
  }
  for (var i = 0; i < domainCategories.length; i++){
    if (domainCategories[i].name == selectedCategory.name){
      return domainCategories[i].points
    }
  }
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
