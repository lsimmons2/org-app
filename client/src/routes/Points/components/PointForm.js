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

  render(){
    let classes = classNames(this.props.classes);
    return (
      <div className={classes}>
        <form onSubmit={this.submitPoint.bind(this)}>
          <div className="form-group">
            <input ref="question" type="text" className="form-control" id="question" placeholder="Question"/>
          </div>
          <div className="form-group">
            <input ref="answer" type="text" className="form-control" id="answer" placeholder="Password"/>
          </div>
          <div className="form-group">
            <input type="submit" className="form-control"/>
          </div>
        </form>
      </div>
    )
  }
}

export default PointForm
