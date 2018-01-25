import React from 'react'
import classNames from 'classnames'



class Point extends React.Component {


  render(){
    let point = this.props.point;
    let answer = null;
    if (point.app.is_open){
      answer = <div className="answer">{point.answer}</div>
    }
    let classes = classNames({
      'point_container': true,
      'point-in-focus': point.app.in_focus
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
