
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
    return (
      <div className={this.props.classes}>
        {this.get_tag_list()}
      </div>
    )
  }
}


export default TagsList
