
import React from 'react'
import CollectionFormContainer from '../containers/CollectionFormContainer'
import CollectionSearchContainer from '../containers/CollectionSearchContainer'



class NewCollectionView extends React.Component {

  render(){

    let collection = this.props.collection;

    if (!collection){
      return <div>waiting for new colleccc</div>;
    }

    return (
      <div>
        <CollectionSearchContainer/>
        <CollectionFormContainer/>
      </div>
    )
  }
}

export default NewCollectionView
