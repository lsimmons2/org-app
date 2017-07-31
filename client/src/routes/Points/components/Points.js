import React from 'react'
import PropTypes from 'prop-types'
import PointList from './PointList'
import PointForm from './PointForm'
import PointCategorySelector from './PointCategorySelector'

class Points extends React.Component {

  //static propTypes = {
    //points: PropTypes.object.isRequired
  //}

  componentWillMount(){
    this.props.populatePoints()
    document.addEventListener('keydown', this.props.detectKeypress)
  }

  componentWillUnmount(){
    document.removeEventListener('keydown', this.props.detectKeypress)
  }

  getCssClasses(){
    let classes = {
      pointList: {
        'section': true,
      },
      pointForm: {
        'my-modal': true
      },
      pointCategorySelector: {
        'my-modal': true
      }
    };
    return classes;
  }

  render() {

    let classes = this.getCssClasses();

    let pointCategorySelector = null;
    if (this.props.sections.pointCategorySelector.selected){
      pointCategorySelector = (
        <PointCategorySelector
          classes={classes.pointCategorySelector}
        />
    )
    }

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
        {pointCategorySelector}
        {pointForm}
        {pointList}
      </div>
    )
  }

}


export default Points
