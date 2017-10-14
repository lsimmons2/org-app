import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import TabMarker from './TabMarker'



class TabBar extends React.Component {

  get_marker_list(){
    if (!this.props.collections.length){
      return;
    }
    return (
      <ul>
        {
          this.props.collections.map(collection => {
            return (
              <li key={collection.collection_id} >
                <TabMarker collection={collection}/>
              </li>
            )
          })
        }
      </ul>)
  }

  render(){
    return (
      <div id="tab_bar">
        {this.get_marker_list()}
      </div>
    )
  }
}


export default TabBar
