
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Tag from './Tag'



class TagsList extends React.Component {

  get_tag_list(){
    let list = this.props.app.tags.map(tag => {
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
