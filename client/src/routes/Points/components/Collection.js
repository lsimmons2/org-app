
import React from 'react'

import PointList from './PointList'
import PointForm from './PointForm'
import CollectionMeta from './CollectionMeta'



class Collection extends React.Component {

  render(){

    let collection = this.props.collection;

    return (
      <div>
        <CollectionMeta
          mode={collection.app.mode}
        />
        <PointList
          points={collection.points}
        />
        <PointForm
          app={collection.app.views.point_form}
          post_point={this.props.post_point}
          search_tag={this.props.search_tag}
        />
      </div>
    )
  }
}


export default Collection
