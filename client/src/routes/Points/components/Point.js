import React from 'react'
import PropTypes from 'prop-types'
import { toggleAnswerVisibility } from '../modules/points'
import classNames from 'classnames'



class Point extends React.Component {

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
      'point-in-focus': point.inFocus
    })
    return (
      <div className={classes} onClick={this.toggleAnswer.bind(this)}>
        <div>{point.question}</div>
        {answer}
      </div>
    )
  }
}


export default Point
