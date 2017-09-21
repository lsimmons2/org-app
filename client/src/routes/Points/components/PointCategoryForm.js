import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'


class PointCategoryForm extends React.Component {


  submitCategory(e){
    e.preventDefault();
    let formData = {};
    for (const field in this.refs){
      formData[field] = this.refs[field].value;
    }
    this.props.submitCategory(formData)
  }

  componentDidMount(e){
    document.getElementById('category-input').focus();
  }

  render(){
    return (
      <div>
        <form id="point-category-form" onSubmit={this.submitCategory.bind(this)}>
          <div className="input-container">
            <input ref="category_name" type="text" id="category-input" placeholder="New Category Name"/>
          </div>
          <div className="input-container">
            <input type="submit"/>
          </div>
        </form>
      </div>
    )
  }
}

export default PointCategoryForm
