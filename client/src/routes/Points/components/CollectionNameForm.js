
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'



class CollectionNameForm extends React.Component {

  componentDidMount(e){
    document.getElementById('sahhh').value = this.props.name;
  }

  update_name(e){
    e.preventDefault();
    this.props.update_collection_name(this.refs.name.value);
  }

  render(){

    let classes = classNames({
      'big_section': true,
      'big_section_in_focus': this.props.in_focus
    });

    return (
      <div className={classes}>
        <form onSubmit={this.update_name.bind(this)}>
          <div>
            <input id="sahhh" ref="name" type="text"/>
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
