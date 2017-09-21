import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import PointCategory from './PointCategory'
import PointCategoryForm from './PointCategoryForm'


class PointCategorySelector extends React.Component {


  getCategoryList(){
    let list = this.props.categories.map((cat, i) => {
      return <PointCategory key={cat.category_id} pointCategory={cat}/>
    })
    return (
        <ul className='category-list'>
          {list} 
        </ul>
    )
  }

  getCategoryForm(){
    if (this.props.is_category_form_selected){
      return <PointCategoryForm submitCategory={this.props.submitCategory}/>
    }
  }

  render(){
    let classes = classNames(this.props.classes);
    let categoryList = this.getCategoryList();
    let categoryForm = this.getCategoryForm();
    return (
      <div className={classes}>
        <div id="point-category-selector">
          <h4>Selector</h4>
          {categoryList}
          {categoryForm}
        </div>
      </div>
    )
  }
}

export default PointCategorySelector
