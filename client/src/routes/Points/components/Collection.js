
import React from 'react'
import NewPointContainer from '../containers/NewPointContainer'
import CollectionMetaContainer from '../containers/CollectionMetaContainer'
import PointListContainer from '../containers/PointListContainer'
import CollectionEditorContainer from '../containers/CollectionEditorContainer'



class Collection extends React.Component {

  render(){
    return (
      <div>
        <CollectionMetaContainer/>
        <NewPointContainer/>
        <CollectionEditorContainer/>
      </div>
    )
  }

}
        //<PointListContainer/>


export default Collection
