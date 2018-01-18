
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
          in_focus={suggestion.in_focus}
        />
      )
    })
  }

  handle_focusing(){
    if (this.props.in_focus){
      this.refs['name'].focus();
    } else {
      this.refs['name'].blur();
    }
  }

  componentDidMount(e){
    this.handle_focusing()
  }

  componentDidUpdate(e){
    this.handle_focusing()
  }

  render(){
    let suggestions = this.get_suggestions();

    let classes = classNames({
      'big_section': true,
      'big_section_in_focus': this.props.in_focus
    });

    let type = this.props.search_type;
    let placeholder = 'Search ' + type.charAt(0).toUpperCase() + type.slice(1);

    return (
      <div className={classes}>
        <input id={this.props.input_id} ref='name' type='text' placeholder={placeholder}/>
        {suggestions}
      </div>
    )
  }

}


export default Search
