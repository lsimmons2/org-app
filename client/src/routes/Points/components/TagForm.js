
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

  componentDidMount(e){
    if (this.props.app.app.in_focus){
      this.refs['name'].focus();
    }
  }

  componentDidUpdate(e){
    if (this.props.app.app.in_focus){
      this.refs['name'].focus();
    }
  }

  render(){
    return (
      <div>
        <form onSubmit={this.post_tag.bind(this)}>
          <div className={this.props.classes}>
            <input ref='name' type="text" placeholder="New Tag Name"/>
          </div>
        </form>
      </div>
    )
  }

}


export default TagForm
