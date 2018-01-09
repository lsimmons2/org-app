import React from 'react'
import classNames from 'classnames'

import Point from './Point'


class PointForm extends React.Component {

  componentDidUpdate(e){
    if (this.props.question_section_in_focus){
      this.refs['question'].focus();
    } else if (this.props.answer_section_in_focus){
      this.refs['answer'].focus();
    } else {
      this.refs['question'].blur();
      this.refs['answer'].blur();
    }
  }

  submitPoint(e){
    e.preventDefault();
    let form_data = {};
    for (const field in this.refs){
      form_data[field] = this.refs[field].value;
    }
    this.props.post_point(form_data);
  }

  render() {

    let question_classes = classNames({
      'big_section': true,
      'big_section_in_focus': this.props.question_section_in_focus
    });

    let answer_classes = classNames({
      'big_section': true,
      'big_section_in_focus': this.props.answer_section_in_focus
    });

    return (
      <form onSubmit={this.submitPoint.bind(this)}>
        <div className={question_classes}>
          <input ref="question" type="text" id="question_input" placeholder="Question"/>
        </div>
        <div className={answer_classes}>
          <input ref="answer" type="text" id="answer_input" placeholder="Answer"/>
        </div>
        <input type="submit" style={{visibility:'hidden',height:'0'}}/>
      </form>
    )

  }

}


export default PointForm
