
import React from 'react'
import classNames from 'classnames'



class TagForm extends React.Component {

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
    return (
      <div>
        <form onSubmit={e => e.preventDefault()}>
          <div className={classes}>
            <input id={this.props.tag_input_id} ref="name" type="text" placeholder="New Tag Name"/>
          </div>
        </form>
      </div>
    )
  }

}


export default TagForm
