import React from 'react'
import _ from 'underscore'
import classNames from 'classnames'

import CollectionModeEditor from './CollectionModeEditor'
import TagsList from './TagsList'
import TagForm from './TagForm'
import Search from './Search'


class CollectionEditor extends React.Component {

  render() {
    if (!this.props.view.in_focus){
      return null;
    }

    let sections = this.props.view.sections;

    let mode_section = _.find(sections, function(section){
      return section.name === 'mode_form';
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
        <CollectionModeEditor
          in_focus={mode_section.in_focus}
          mode={this.props.mode}
        />
        <TagsList
          in_focus={tags_list_section.in_focus}
          tags={this.props.tags}
        />
        <TagForm
          in_focus={tag_form_section.in_focus}
        />
        <Search
          search={this.props.search}
          in_focus={tags_search_section.in_focus}
          search_suggestions={tags_search_section.search_suggestions}
          search_type='tags'
        />
      </div>
    )
  }

}


export default CollectionEditor
