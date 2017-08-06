import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'


class PointCategorySelector extends React.Component {


  getCategoryList(){
    let list = this.props.categories.map((cat, i) => {
      let listItem = [<li key={cat.name} className="category-list-item">{cat.name}</li>]
      if (i !== this.props.categories.length-1){
        listItem.push(' · ');
      }
      return listItem
    })
    //<li className="category-list-item">Economics</li>
    //{' · '}
    //<li className="category-list-item">Machine Learning</li>
    return (
        <ul>
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
