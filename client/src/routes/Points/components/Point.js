import React from 'react'
import PropTypes from 'prop-types'
import { toggleAnswerVisibility } from '../modules'
import classNames from 'classnames'



class Point extends React.Component {

  //TODO: this should be a prop
  toggleAnswer(){
    this.props.toggleAnswerVisibility(this.props.point.point_id)
  }

  render(){
    let point = this.props.point;
    let answer = null;
    if (point.isVisible){
      answer = <div className="answer">{point.answer}</div>
    }
    let classes = classNames({
      'point_container': true,
      'point-in-focus': point.in_focus
    })
    return (
      <div className={classes}>
        <div>{point.question}</div>
        {answer}
      </div>
    )
  }
}


export default Point
