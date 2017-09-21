import React from 'react'
import PropTypes from 'prop-types'
//import { toggleAnswerVisibility } from '../modules'
import classNames from 'classnames'



class PointCategory extends React.Component {

  render(){
    let pointCategory = this.props.pointCategory;
    let classes = classNames({
      'point-category': true,
      'point-category-in-focus': pointCategory.in_focus,
      'point-category-is-selected': pointCategory.is_selected,
      'category-list-item': true
    })
    return (
      <li key={pointCategory.category_id} className={classes}>{pointCategory.name}</li>
    )
  }
}


export default PointCategory
