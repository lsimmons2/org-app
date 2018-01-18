import React from 'react'
import _ from 'underscore'

import TagsList from './TagsList'
import TagForm from './TagForm'
import PointForm from './PointForm'
import Search from './Search'


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

    let tags_search_section = _.find(sections, function(section){
      return section.name === 'tags_search';
    });

    return (
      <div>
        <PointForm
          question_section_in_focus={question_section.in_focus}
          answer_section_in_focus={answer_section.in_focus}
          question_input_id={question_section.input_id}
          answer_input_id={answer_section.input_id}
        />
        <TagsList
          tags={tags_list_section.tags}
          in_focus={tags_list_section.in_focus}
        />
        <TagForm
          in_focus={tag_form_section.in_focus}
          tag_input_id={tag_form_section.input_id}
        />
        <Search
          in_focus={tags_search_section.in_focus}
          search_suggestions={tags_search_section.search_suggestions}
          search_type='tags'
          input_id={tags_search_section.input_id}
        />
      </div>
    )
  }
}


export default NewPoint
