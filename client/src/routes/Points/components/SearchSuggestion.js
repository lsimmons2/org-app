
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'



class SearchSuggestion extends React.Component {

  render(){
    if (this.props.in_focus){
      console.log('im in focus!');
    }
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
