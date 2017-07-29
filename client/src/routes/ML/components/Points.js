import React from 'react'
import PropTypes from 'prop-types'
import PointList from './PointList'
import PointForm from './PointForm'

class Points extends React.Component {

  //static propTypes = {
    //points: PropTypes.object.isRequired
  //}

  componentWillMount(){
    this.props.getAll()
    document.addEventListener('keydown', this.props.detectKeypress)
  }

  componentWillUnmount(){
    document.removeEventListener('keydown', this.props.detectKeypress)
  }

  getCssClasses(){
    //let sections = this.props.sections;
    //console.log('sections is');
    //console.log(sections);
    let classes = {
      pointList: {
        'section': true,
      },
      pointForm: {
        //'section': true,
        'point-form-container': true
      }
    };
    //if (sections.pointList.selected){
      //classes.pointForm['point-form-in-focus'] = false; 
      //classes.pointForm['point-form-not-in-focus'] = true; 
      ////classes.pointList['section-in-focus'] = true; 
      ////classes.pointForm['section-not-in-focus'] = true; 
    //} else if (sections.pointForm.selected){
      //classes.pointForm['point-form-in-focus'] = true; 
      //classes.pointForm['point-form-not-in-focus'] = false; 
      ////classes.pointForm['section-in-focus'] = true; 
      ////classes.pointList['section-not-in-focus'] = true; 
    //}
    return classes;
  }

  render() {

    let classes = this.getCssClasses();
    let pointForm = null;
    if (this.props.sections.pointForm.selected){
      pointForm = (
      <PointForm
        submitPoint={this.props.submitPoint}
        classes={classes.pointForm}
      />
    )
    }
    let pointList = (
      <PointList
        toggleAnswerVisibility={this.props.toggleAnswerVisibility}
        classes={classes.pointList}
        points={this.props.points}
      />
    )

    return (
      <div id="points-route">
        {pointForm}
        {pointList}
      </div>
    )
  }

}


export default Points
