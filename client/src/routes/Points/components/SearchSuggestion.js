
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'



class SearchSuggestion extends React.Component {

  render(){
    return (
      <p>
        {this.props.name}
      </p>
    )
  }
}


export default SearchSuggestion
