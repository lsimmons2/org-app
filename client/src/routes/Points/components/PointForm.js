import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'underscore'


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
    let input = document.getElementById('question-input');
    if (input){
      input.focus()
    }
  }

  render(){

    let app = this.props.app;
    let sections = app.sections

    if (!app.in_focus){
      return null;
    }

    let question_section = _.find(sections, function(section){
      return section.name === 'point_question_input';
    });
    let question_classes = classNames({
      'big_section': true,
      'big_section_in_focus': question_section.app.in_focus
    });

    let answer_section = _.find(sections, function(section){
      return section.name === 'point_answer_input';
    });
    let answer_classes = classNames({
      'big_section': true,
      'big_section_in_focus': answer_section.app.in_focus
    });

    return (
      <div>
        <form onSubmit={this.submitPoint.bind(this)}>
          <div className={question_classes}>
            <input ref="question" type="text" id="question-input" placeholder="Question"/>
          </div>
          <div className={answer_classes}>
            <textarea ref="answer" type="text" id="answer-input" placeholder="Answer"/>
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
