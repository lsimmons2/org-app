import React from 'react'
import PropTypes from 'prop-types'
import { toggleAnswerVisibility } from '../modules/points'
import classNames from 'classnames'



class Point extends React.Component {

  toggleAnswer(){
    this.props.toggleAnswerVisibility(this.props.point.point_id)
  }

  render(){
    let answer = null;
    let point = this.props.point;
    if (point.isVisible){
      answer = <div>{point.answer}</div>
    }
    let classes = classNames({
      'point_container': true,
      'point-in-focus': point.inFocus
    })
    return (
      <div className={classes} onClick={this.toggleAnswer.bind(this)}>
        <button className="btn btn-default" type="submit">{point.question}</button>
        {answer}
      </div>
    )
  }
}


export default Point
