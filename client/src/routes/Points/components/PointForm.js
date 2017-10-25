import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'underscore'


class PointForm extends React.Component {


  submitPoint(e){
    e.preventDefault();
    let form_data = {};
    for (const field in this.refs){
      form_data[field] = this.refs[field].value;
    }
    this.props.post_point(form_data);
  }

  componentDidUpdate(e){
    if (!this.props.app.in_focus){
      return;
    }
    let sections = this.props.app.sections;
    let question_section = _.find(sections, function(section){
      return section.name === 'point_question_input';
    });
    let answer_section = _.find(sections, function(section){
      return section.name === 'point_answer_input';
    });
    if (question_section.app.in_focus){
      document.getElementById('question_input').focus();
    }
    if (answer_section.app.in_focus){
      document.getElementById('answer_input').focus();
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
            <input ref="question" type="text" id="question_input" placeholder="Question"/>
          </div>
          <div className={answer_classes}>
            <textarea ref="answer" type="text" id="answer_input" placeholder="Answer"/>
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
