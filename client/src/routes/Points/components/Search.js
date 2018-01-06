
import React from 'react'
import classNames from 'classnames'
import { DebounceInput } from 'react-debounce-input'
import SearchSuggestion from './SearchSuggestion'



class Search extends React.Component {

  get_suggestions(){
    let suggestions = this.props.search_suggestions;
    if (suggestions.length < 1){
      return <p>No suggestions</p>;
    }
    return suggestions.map((suggestion, i) => {
      return (
        <SearchSuggestion
          key={i}
          name={suggestion.name}
          in_focus={suggestion.app.in_focus}
        />
      )
    })
  }

  handle_search(e){
    let search_value = e.target.value;
    this.props.search(this.props.search_type, search_value);
  }

  componentDidMount(e){
    if (this.props.in_focus){
      document.getElementById('tag_search').focus();
    }
  }

  componentDidUpdate(e){
    if (this.props.in_focus){
      document.getElementById('tag_search').focus();
    }
  }

  render(){
    let suggestions = this.get_suggestions();

    let classes = classNames({
      'big_section': true,
      'big_section_in_focus': this.props.in_focus
    });

    return (
      <div className={classes}>
        <DebounceInput
          id='tag_search'
          minLength={2}
          debounceTimeout={300}
          onChange={event => this.handle_search(event)}
          placeholder='Search Collections'
        />
        {suggestions}
      </div>
    )
  }

}


export default Search
