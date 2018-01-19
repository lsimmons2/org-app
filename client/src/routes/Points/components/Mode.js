
import React from 'react'
import classNames from 'classnames'



class Mode extends React.Component {

  render(){

    let classes = classNames({
      'mode': true,
      'mode_in_focus': this.props.in_focus
    });

    return (
      <div className={classes}>
        {this.props.name}
      </div>
    )

  }

}


export default Mode
