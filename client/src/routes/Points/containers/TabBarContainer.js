
import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import TabMarker from '../components/TabMarker'
import TabBar from '../components/TabBar'



class TabBarContainer extends React.Component {

  get_marker_list(){
    if (!this.props.collections.length){
      return;
    }
    return (
      <ul>
        {
          this.props.collections.map(collection => {
            let key = collection.collection_id || Math.random();
            return (
              <li key={key} >
                <TabMarker collection={collection}/>
              </li>
            )
          })
        }
      </ul>)
  }

  render(){
    //return <p>sah</p>
    return (
      <div id="tab_bar">
        {this.get_marker_list()}
      </div>
    )
  }
}

const mapDispatchToProps = {}


const mapStateToProps = (globalState) => {
  return {
    collections: globalState.points.collections
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabBar)
