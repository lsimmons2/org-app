
import React from 'react'
import classNames from 'classnames'



class TagForm extends React.Component {


  post_tag(e){
    e.preventDefault();
    let form_data = {};
    for (const field in this.refs){
      form_data[field] = this.refs[field].value;
    }
    this.props.post_tag(form_data);
  }

  handle_focusing(){
    if (this.props.section.in_focus){
      this.refs['name'].focus();
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
        <form onSubmit={this.post_tag.bind(this)}>
          <div className={classes}>
            <input ref="name" type="text" placeholder="New Tag Name"/>
          </div>
        </form>
      </div>
    )
  }

}


export default TagForm
