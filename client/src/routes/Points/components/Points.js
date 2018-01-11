import React from 'react'
import PropTypes from 'prop-types'
import TabBarContainer from '../containers/TabBarContainer'
import AlertContainer from '../containers/AlertContainer'
import TabViewContainer from '../containers/TabViewContainer'
import _ from 'underscore'

class Points extends React.Component {

  componentWillMount(){
    document.addEventListener('keydown', this.props.detect_keypress)
  }

  render(){
    return (
      <div id="app-container">
        <TabBarContainer/>
        <AlertContainer/>
        <TabViewContainer/>
      </div>
    )
  }

}

export default Points
