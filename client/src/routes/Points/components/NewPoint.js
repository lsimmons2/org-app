import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'underscore'
import TagsList from './TagsList'
import TagForm from './TagForm'
import TagSearchContainer from '../containers/TagSearchContainer'


class NewPoint extends React.Component {


  submitPoint(e){
    e.preventDefault();
    let form_data = {};
    for (const field in this.refs){
      form_data[field] = this.refs[field].value;
    }
    this.props.post_point(form_data);
  }

  componentDidUpdate(e){
    if (!this.props.view.in_focus){
      return;
    }
    let sections = this.props.view.sections;
    let question_section = _.find(sections, function(section){
      return section.name === 'point_question_input';
    });
    let answer_section = _.find(sections, function(section){
      return section.name === 'point_answer_input';
    });
    if (question_section.app.in_focus){
      this.refs['question'].focus();
    } else if (answer_section.app.in_focus){
      this.refs['answer'].focus();
    } else {
      this.refs['question'].blur();
      this.refs['answer'].blur();
    }
  }

  render(){

    let view = this.props.view;
    let sections = view.sections

    if (!view.in_focus){
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
    
    let tags_list_section = _.find(sections, function(section){
      return section.name === 'tags_list';
    });

    let tag_form_section = _.find(sections, function(section){
      return section.name === 'tag_form';
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
        <TagsList
          app={tags_list_section}
          in_focus={tags_list_section.app.in_focus}
        />
        <TagForm
          app={tag_form_section}
          in_focus={tag_form_section.app.in_focus}
          post_tag={this.props.post_tag}
        />
        <TagSearchContainer/>
      </div>
    )
  }
}

export default NewPoint
