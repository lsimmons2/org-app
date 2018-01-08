import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'



class TabMarker extends React.Component {

  render(){
    let collection = this.props.collection;
    let classes = classNames({
      'tab_marker': true,
      'tab_marker_in_focus': collection.app.in_focus
    });
    return (
      <div className={classes}>
        {collection.name}
      </div>
    )
  }

}


export default TabMarker
