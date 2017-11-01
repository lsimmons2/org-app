
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'



class SearchSuggestion extends React.Component {

  render(){
    let classes = classNames({
      list_item_in_focus: this.props.in_focus
    });
    return (
      <p className={classes}>
        {this.props.name}
      </p>
    )
  }
}


export default SearchSuggestion
