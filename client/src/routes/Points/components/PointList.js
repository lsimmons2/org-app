import React from 'react'
import PropTypes from 'prop-types'
import Point from './Point'
import classNames from 'classnames'

class PointList extends React.Component {

  //static propTypes = {
    //points: PropTypes.object.isRequired
  //}

  //componentWillMount(){
    //document.addEventListener('keydown', this.props.detectKeypress)
  //}

  render() {

    let pointElements = this.props.points.map(point => {
      return <Point
        key={point.point_id}
        point={point}
        toggleAnswerVisibility={this.props.toggleAnswerVisibility}
      />
    });
    let classes = classNames(this.props.classes);
    return (
      <div className={classes}>
        {pointElements}
      </div>
    )
  }

}


export default PointList
