import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'


class PointForm extends React.Component {


  submitPoint(e){
    e.preventDefault();
    let formData = {};
    for (const field in this.refs){
      formData[field] = this.refs[field].value;
    }
    this.props.submitPoint(formData);
  }

  componentDidMount(e){
    document.getElementById('question').focus();
  }

  render(){
    let classes = classNames(this.props.classes);
    return (
      <div className={classes}>
        <form id="point-form" onSubmit={this.submitPoint.bind(this)}>
          <div>
            <input ref="question" type="text" id="question" placeholder="Question"/>
          </div>
          <div >
            <textarea ref="answer" type="text" id="answer" placeholder="Answer"/>
          </div>
          <div>
            <input type="submit"/>
          </div>
        </form>
      </div>
    )
  }
}

export default PointForm
