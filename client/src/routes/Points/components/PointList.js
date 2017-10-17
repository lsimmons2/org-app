import React from 'react'
import PropTypes from 'prop-types'
import Point from './Point'

class PointList extends React.Component {

  render() {


    let pointElements = this.props.points.map(point => {
      return <Point
        key={point.point_id}
        point={point}
        toggleAnswerVisibility={this.props.toggleAnswerVisibility}
      />
    });
    //let classes = classNames(this.props.classes);
    return (
      <div>
        {pointElements}
      </div>
    )
  }

}


export default PointList
