
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'



class Tag extends React.Component {

  render(){

    let classes = classNames({
      'tag': true,
      'tag_in_focus': this.props.tag.app.in_focus
    });

    return (
      <div className={classes}>
        {this.props.tag.name}
      </div>
    )

  }

}


export default Tag
