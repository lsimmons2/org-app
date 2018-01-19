import React from 'react'
import classNames from 'classnames'

import Mode from './Mode'

class CollectionModeEditor extends React.Component {

  render() {
    let mode_dict = this.props.mode;
    let tags_exclusive = <Mode name={'tags_exlusive'} in_focus={mode_dict['tags_exclusive']}/>
    let tags_inclusive = <Mode name={'tags_inclusive'} in_focus={mode_dict['tags_inclusive']}/>
    let select_points = <Mode name={'select_points'} in_focus={mode_dict['select_points']}/>
    let classes = classNames({
      'big_section': true,
      'big_section_in_focus': this.props.in_focus
    });
    return (
      <div className={classes}>
        {tags_exclusive}
        {tags_inclusive}
        {select_points}
      </div>
    )
  }

}


export default CollectionModeEditor
