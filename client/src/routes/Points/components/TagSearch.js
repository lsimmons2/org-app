
import React from 'react'
import classNames from 'classnames'
import { DebounceInput } from 'react-debounce-input'
import SearchSuggestion from './SearchSuggestion'



class TagSearch extends React.Component {

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
          in_focus={suggestion.app.in_focus}
        />
      )
    })
  }

  validate_search_value(value){
    if (value.length < 1){
      return false;
    }
    return true;
  }

  handle_value(e){
    let search_value = e.target.value;
    if (this.validate_search_value(search_value)){
      this.props.search_tag(search_value);
    }
  }


  componentDidMount(e){
    if (this.props.app.app.in_focus){
      document.getElementById('tag_search').focus();
      this.refs['input'].focus();
    }
  }

  componentDidUpdate(e){
    if (this.props.app.app.in_focus){
      document.getElementById('tag_search').focus();
    }
  }


  render(){
    let suggestions = this.get_suggestions();
    return (
      <div className={this.props.classes}>
        <DebounceInput
          id='tag_search'
          minLength={2}
          debounceTimeout={300}
          onChange={event => this.handle_value(event)}
          placeholder='Search Collections'
        />
        {suggestions}
      </div>
    )
  }

}


export default TagSearch
