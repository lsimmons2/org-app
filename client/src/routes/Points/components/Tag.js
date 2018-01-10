
import React from 'react'
import classNames from 'classnames'



class Tag extends React.Component {

  render(){

    let classes = classNames({
      'tag': true,
      'tag_in_focus': this.props.in_focus
    });

    return (
      <div className={classes}>
        {this.props.name}
      </div>
    )

  }

}


export default Tag
