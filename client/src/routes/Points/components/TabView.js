
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import NewCollection from './NewCollection'
import Collection from './Collection'



class TabView extends React.Component {

  render(){
    let collection = this.props.collection;
    if (collection.app.is_new){
      return <NewCollection/>
    }
    return <Collection/>
  }

}

export default TabView
