
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'



class CollectionForm extends React.Component {

  save_collection(e){
    e.preventDefault();
    let name = this.refs.name.value;
    if (name.length){
      this.props.post_collection({name:name});
    }
  }

  componentDidMount(e){
    if (this.props.in_focus){
      this.refs['name'].focus();
    }
  }

  componentDidUpdate(e){
    if (this.props.in_focus){
      this.refs['name'].focus();
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
            <input ref="name" type="text" placeholder={placeholder}/>
          </div>
          <div>
            <input type="submit"/>
          </div>
        </form>
      </div>
    )
  }
}


export default CollectionForm
