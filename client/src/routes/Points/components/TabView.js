
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import BlankTab from './BlankTab'
import Collection from './Collection'



class TabView extends React.Component {

  render(){
    let collection = this.props.collection;
    if (collection.app.is_blank){
      return <BlankTab/>
    }
    return <Collection/>
  }

}

export default TabView
