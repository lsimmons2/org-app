
import React from 'react'
import PointList from './PointList'
import NewPointContainer from '../containers/NewPointContainer'
import CollectionMetaContainer from '../containers/CollectionMetaContainer'
import PointListContainer from '../containers/PointListContainer'



class Collection extends React.Component {

  render(){

    let collection = this.props.collection;

    return (
      <div>
        <CollectionMetaContainer/>
        <PointListContainer/>
        <NewPointContainer/>
      </div>
    )
  }
}


export default Collection
