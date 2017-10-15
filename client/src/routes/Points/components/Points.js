import React from 'react'
import PropTypes from 'prop-types'
//import PointList from './PointList'
import TabBar from './TabBar'
import TabView from './TabView'
import _ from 'underscore'
//import PointForm from './PointForm'
//import PointCategorySelector from './PointCategorySelector'

class Points extends React.Component {

  //static propTypes = {
    //points: PropTypes.object.isRequired
  //}

  componentWillMount(){
    //this.props.populatePoints()
    document.addEventListener('keydown', this.props.detect_keypress)
    if (!this.props.collections.length){
      this.props.add_new_collection();
    }
  }

  //componentWillUnmount(){
    //document.removeEventListener('keydown', this.props.detectKeypress)
  //}

  //getCssClasses(){
    //let classes = {
      //pointList: {
        //'section': true,
      //},
      //pointForm: {
        //'my-modal': true
      //},
      //pointCategorySelector: {
        //'my-modal': true
      //}
    //};
    //return classes;
  //}

  //getPointCategorySelector(){
    //let classes = this.getCssClasses();
    //if (this.props.sections.pointCategorySelector.is_selected){
      //return (
        //<PointCategorySelector
          //classes={classes.pointCategorySelector}
          //categories={this.props.categories}
          //is_category_form_selected={this.props.sections.pointCategoryForm.is_selected}
          //submitCategory={this.props.submitCategory}
        ///>
      //)
    //}
  //}

  get_collection_in_focus(){
    let collection =  _.find(this.props.collections, function(collection) {
      return collection.app.in_focus
    });
    return collection;
  }

  render(){

    //let classes = this.getCssClasses();

    //let pointCategorySelector = this.getPointCategorySelector();

    //let pointForm = null;
    //if (this.props.sections.pointForm.is_selected){
      //pointForm = (
        //<PointForm
          //submitPoint={this.props.submitPoint}
          //classes={classes.pointForm}
        ///>
      //)
    //}

    //let pointList = (
      //<PointList
        //toggleAnswerVisibility={this.props.toggleAnswerVisibility}
        //classes={classes.pointList}
        //points={this.props.points}
      ///>
    //)

    return (
      <div id="app-container">
        <TabBar
          collections={this.props.collections}
        />
        <TabView
          collection={this.get_collection_in_focus()}
          update_collection_name={this.props.update_collection_name}
        />
      </div>
    )
  }

}
        //{pointCategorySelector}
        //{pointForm}
        //{pointList}


export default Points
