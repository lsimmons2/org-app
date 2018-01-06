
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'



class CollectionMeta extends React.Component {

  render(){
    let mode;
    for (let k in this.props.mode){
      if (this.props.mode[k]){
        mode = k;
      }
    }
    return (
      <div>
        <p>mode: {mode}</p>
      </div>
    )
  }
}


export default CollectionMeta
