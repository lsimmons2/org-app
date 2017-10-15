
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'



class CollectionSearch extends React.Component {

  render(){

    let classes = classNames({
      'big_section': true,
      'big_section_in_focus': this.props.in_focus
    });

    return (
      <div className={classes}>
        CollectionSearch yalllll
      </div>
    )

  }

}


export default CollectionSearch
