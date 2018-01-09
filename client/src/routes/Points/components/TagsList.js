
import React from 'react'
import classNames from 'classnames'
import Tag from './Tag'



class TagsList extends React.Component {

  get_tag_list(){
    let list = this.props.tags.map(tag => {
      return <Tag key={tag.tag_id} tag={tag}/>
    })
    return list
  }

  render(){
    let classes = classNames({
      'big_section': true,
      'big_section_in_focus': this.props.in_focus
    });
    return (
      <div>
        <div className={classes}>
          {this.get_tag_list()}
        </div>
      </div>
    )
  }
}


export default TagsList
