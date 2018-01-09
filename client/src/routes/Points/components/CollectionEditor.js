import React from 'react'
import _ from 'underscore'
import classNames from 'classnames'

import CollectionModeEditor from './CollectionModeEditor'
import TagsList from './TagsList'


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

    return (
      <div>
        <CollectionModeEditor
          in_focus={mode_section.app.in_focus}
          mode={this.props.mode}
        />
        <TagsList
          in_focus={tags_list_section.app.in_focus}
          tags={this.props.tags}
        />
      </div>
    )
  }

}


export default CollectionEditor
