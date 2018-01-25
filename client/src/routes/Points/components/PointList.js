import React from 'react'
import PropTypes from 'prop-types'
import Point from './Point'

class PointList extends React.Component {

  render() {
    if (!this.props.view.in_focus){
      return null;
    }
    let point_elements = this.props.points.map(point => {
      return <Point
        key={point.point_id}
        point={point}
      />
    });
    return (
      <div>
        {point_elements}
      </div>
    )
  }

}


export default PointList
