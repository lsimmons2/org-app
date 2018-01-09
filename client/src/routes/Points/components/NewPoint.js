import React from 'react'
import _ from 'underscore'

import TagsList from './TagsList'
import TagForm from './TagForm'
import PointForm from './PointForm'
import TagSearchContainer from '../containers/TagSearchContainer'


class NewPoint extends React.Component {

  render(){

    let view = this.props.view;
    let sections = view.sections

    if (!view.in_focus){
      return null;
    }

    let question_section = _.find(sections, function(section){
      return section.name === 'point_question_input';
    });

    let answer_section = _.find(sections, function(section){
      return section.name === 'point_answer_input';
    });

    let tags_list_section = _.find(sections, function(section){
      return section.name === 'tags_list';
    });

    let tag_form_section = _.find(sections, function(section){
      return section.name === 'tag_form';
    });

    return (
      <div>
        <PointForm
          post_point={this.props.post_point}
          question_section_in_focus={question_section.in_focus}
          answer_section_in_focus={answer_section.in_focus}
        />
        <TagsList
          tags={tags_list_section.tags}
          in_focus={tags_list_section.in_focus}
        />
        <TagForm
          section={tag_form_section}
          in_focus={tag_form_section.in_focus}
          post_tag={this.props.post_tag}
        />
        <TagSearchContainer/>
      </div>
    )
  }
}

export default NewPoint
