
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { DebounceInput } from 'react-debounce-input'
import SearchSuggestion from './SearchSuggestion'



class CollectionSearch extends React.Component {

  validate_search_value(value){
    if (value.length < 1){
      return false;
    }
    return true;
  }

  handle_value(e){
    let search_value = e.target.value;
    if (this.validate_search_value(search_value)){
      this.props.search_collection(search_value);
    }
  }

  get_suggestions(){
    let suggestions = this.props.app.search_suggestions;
    if (suggestions.length < 1){
      return <p>No suggestions</p>;
    }
    return suggestions.map((suggestion, i) => {
      return (
        <SearchSuggestion
          key={i}
          name={suggestion.name}
        />
      )
    })
  }

  render(){

    let suggestions = this.get_suggestions();

    let classes = classNames({
      'big_section': true,
      'big_section_in_focus': this.props.in_focus
    });

    return (
      <div className={classes}>
        CollectionSearch yalllll
        <DebounceInput
          id="new_collection_search"
          minLength={2}
          debounceTimeout={300}
          onChange={event => this.handle_value(event)}
        />
        {suggestions}
      </div>
    )

  }

}


export default CollectionSearch
