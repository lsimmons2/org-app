
import React from 'react'
import CollectionFormContainer from '../containers/CollectionFormContainer'
import CollectionSearchContainer from '../containers/CollectionSearchContainer'
import JustAddPointsButtonContainer from '../containers/JustAddPointsButtonContainer'



class BlankTab extends React.Component {

  render(){
    return (
      <div>
        <CollectionSearchContainer/>
        <CollectionFormContainer/>
        <JustAddPointsButtonContainer/>
      </div>
    )
  }

}

export default BlankTab
