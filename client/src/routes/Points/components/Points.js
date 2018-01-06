import React from 'react'
import PropTypes from 'prop-types'
import TabBarContainer from '../containers/TabBarContainer'
import TabView from './TabView'
import _ from 'underscore'

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

    return (
      <div id="app-container">
        <TabBarContainer/>
        <TabView
          collection={this.get_collection_in_focus()}
          post_collection={this.props.post_collection}
          search_collection={this.props.search_collection}
          post_point={this.props.post_point}
          post_tag={this.props.post_tag}
          search_tag={this.props.search_tag}
        />
      </div>
    )
  }

}


export default Points
