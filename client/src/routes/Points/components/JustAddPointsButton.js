
import React from 'react'
import classNames from 'classnames'



class JustAddPointsButton extends React.Component {

  render() {
    let classes = classNames({
      'big_section': true,
      'big_section_in_focus': this.props.in_focus
    });

    return (
      <div className={classes}>
        <p>Just Add Points</p>
      </div>
    )
  }

}


export default JustAddPointsButton
