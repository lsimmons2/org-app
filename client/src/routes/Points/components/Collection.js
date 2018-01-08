
import React from 'react'
import NewPointContainer from '../containers/NewPointContainer'
import CollectionMetaContainer from '../containers/CollectionMetaContainer'
import PointListContainer from '../containers/PointListContainer'



class Collection extends React.Component {

  render(){
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
