import React from 'react'
import PropTypes from 'prop-types'
//import PointList from './PointList'
import TabBar from './TabBar'
import TabView from './TabView'
import _ from 'underscore'
//import PointForm from './PointForm'
//import PointCategorySelector from './PointCategorySelector'

class Points extends React.Component {

  componentWillMount(){
    document.addEventListener('keydown', this.props.detect_keypress)
  }

  get_collection_in_focus(){
    let collection =  _.find(this.props.collections, function(collection) {
      return collection.app.in_focus
    });
    return collection;
  }

  render(){
    console.log('rendering');

    return (
      <div id="app-container">
        <TabBar
          collections={this.props.collections}
        />
        <TabView
          collection={this.get_collection_in_focus()}
          update_collection_name={this.props.update_collection_name}
        />
      </div>
    )
  }

}


export default Points
