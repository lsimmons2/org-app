import React from 'react'
import classNames from 'classnames'

import Mode from './Mode'

class CollectionModeEditor extends React.Component {

  render() {
    let mode_dict = this.props.mode;
    let is_tags_exclusive = <Mode name={'is_tags_exlusive'} in_focus={mode_dict['is_tags_exclusive']}/>
    let is_tags_inclusive = <Mode name={'is_tags_inclusive'} in_focus={mode_dict['is_tags_inclusive']}/>
    let is_select_points = <Mode name={'is_select_points'} in_focus={mode_dict['is_select_points']}/>
    let classes = classNames({
      'big_section': true,
      'big_section_in_focus': this.props.in_focus
    });
    return (
      <div className={classes}>
        {is_tags_exclusive}
        {is_tags_inclusive}
        {is_select_points}
      </div>
    )
  }

}


export default CollectionModeEditor
