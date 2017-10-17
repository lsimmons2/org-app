
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import NewCollection from './NewCollection'
import Collection from './Collection'



class TabView extends React.Component {

  render(){

    let collection = this.props.collection;

    if (!collection){
      return (
        <div>Welcome to study app ya'll</div>
      )
    }

    if (collection.app.is_new){
      return (
        <NewCollection
          post_collection={this.props.post_collection}
          collection={collection}
        />
      )
    }

    return (
      <Collection
        collection={collection}
      />
    )
  }

}


export default TabView
