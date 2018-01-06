
import React from 'react'
import CollectionFormContainer from '../containers/CollectionFormContainer'
import CollectionSearchContainer from '../containers/CollectionSearchContainer'



class NewCollectionView extends React.Component {

  render(){
    return (
      <div>
        <CollectionSearchContainer/>
        <CollectionFormContainer/>
      </div>
    )
  }

}

export default NewCollectionView
