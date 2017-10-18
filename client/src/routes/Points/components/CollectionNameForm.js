
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'



class CollectionNameForm extends React.Component {

  save_collection(e){
    e.preventDefault();
    let name = this.refs.name.value;
    if (name.length){
      this.props.post_collection({name:name});
    }
  }

  render(){

    let classes = classNames({
      'big_section': true,
      'big_section_in_focus': this.props.in_focus
    });
    let placeholder = 'Enter collection name';

    return (
      <div className={classes}>
        <form onSubmit={this.save_collection.bind(this)}>
          <div>
            <input id="new_collection_name_input" ref="name" type="text" placeholder={placeholder}/>
          </div>
          <div>
            <input type="submit"/>
          </div>
        </form>
      </div>
    )
  }
}


export default CollectionNameForm
