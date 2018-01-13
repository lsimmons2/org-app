
import React from 'react'
import classNames from 'classnames'



class CollectionForm extends React.Component {

  handle_focusing(){
    if (this.props.in_focus){
      this.refs['name'].focus();
    } else {
      this.refs['name'].blur();
    }
  }

  componentDidMount(e){
    this.handle_focusing();
  }

  componentDidUpdate(e){
    this.handle_focusing();
  }

  render(){

    let classes = classNames({
      'big_section': true,
      'big_section_in_focus': this.props.in_focus
    });
    let placeholder = 'Enter collection name';


    return (
      <div className={classes}>
        <form onSubmit={e => e.preventDefault()}>
          <div>
            <input id={this.props.input_id} ref="name" type="text" placeholder={placeholder}/>
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
