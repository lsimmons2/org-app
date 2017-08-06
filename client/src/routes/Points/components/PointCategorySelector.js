import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import PointCategory from './PointCategory'


class PointCategorySelector extends React.Component {


  getCategoryList(){
    let list = this.props.categories.map((cat, i) => {
      return <PointCategory key={cat.name} pointCategory={cat}/>
      //let listItem = [<PointCategory pointCategory={cat}/>]
      //if (i !== this.props.categories.length-1){
        //listItem.push(' · ');
      //}
      //return listItem
    })
    return (
        <ul className='category-list'>
          {list} 
        </ul>
    )
  }

  render(){
    let classes = classNames(this.props.classes);
    let categoryList = this.getCategoryList();
    return (
      <div className={classes}>
        <div id="point-category-selector">
          <h4>Selector</h4>
          {categoryList}
        </div>
      </div>
    )
  }
}

export default PointCategorySelector
