
import React from 'react'
import classNames from 'classnames'



class TagForm extends React.Component {

  componentDidMount(e){
    if (this.props.in_focus){
      this.refs['input'].focus();
    }
  }

  componentDidUpdate(e){
    if (this.props.in_focus){
      this.refs['input'].focus();
    }
  }

  render(){
    return (
      <div>
        <div className={this.props.classes}>
          <div>
            <input ref='input' type="text" placeholder="New Tag Name"/>
          </div>
        </div>
      </div>
    )
  }

}


export default TagForm
