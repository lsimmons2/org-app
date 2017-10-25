
import React from 'react'

import PointList from './PointList'
import PointForm from './PointForm'



class Collection extends React.Component {

  render(){

    let collection = this.props.collection;

    return (
      <div>
        <PointList
          points={collection.points}
        />
        <PointForm
          app={collection.app.views.point_form}
          post_point={this.props.post_point}
        />
      </div>
    )
  }
}


export default Collection
