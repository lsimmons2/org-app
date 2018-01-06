
import React from 'react'
import classNames from 'classnames'



class TagSearch extends React.Component {


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
            <input ref='input' type="text" placeholder="Search Tags"/>
          </div>
        </div>
      </div>
    )
  }

}


export default TagSearch
