
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import BlankTab from './BlankTab'
import JustAddPointsContainer from '../containers/JustAddPointsContainer'
import Collection from './Collection'



class TabView extends React.Component {

  render(){
    let collection = this.props.collection;
    if (collection.app.is_blank){
      return <BlankTab/>
    } else if (collection.app.is_just_add_points){
      return <JustAddPointsContainer/>
    } else {
      return <Collection/>
    }
  }

}

export default TabView
