import React from 'react'
import classNames from 'classnames'


class CollectionMetaEditor extends React.Component {

  render() {
    let mode;
    for (let k in this.props.mode){
      if (this.props.mode[k]){
        mode = k;
      }
    }
    let classes = classNames({
      'big_section': true,
      'big_section_in_focus': this.props.in_focus
    });
    return (
      <div className={classes}>
        mode editor
      </div>
    )
  }

}


export default CollectionMetaEditor
