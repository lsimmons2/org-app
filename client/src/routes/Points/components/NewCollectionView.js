
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CollectionNameForm from './CollectionNameForm'



class NewCollectionView extends React.Component {

  render(){
    if (!this.props.collection){
      return <div>waiting for new colleccc</div>;
    }
    return (
      <div>
        New collectionnnnnnnnnn
        <CollectionNameForm
          name={this.props.collection.name}
          update_collection_name={this.props.update_collection_name}
        />
      </div>
    )
  }
}


export default NewCollectionView
