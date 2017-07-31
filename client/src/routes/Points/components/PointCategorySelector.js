import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'


class PointCategorySelector extends React.Component {

  //submitPoint(e){
    //e.preventDefault();
    //let formData = {};
    //for (const field in this.refs){
      //formData[field] = this.refs[field].value;
    //}
    //this.props.submitPoint(formData);
  //}

  //componentDidMount(e){
    //document.getElementById('question-input').focus();
  //}

  render(){
    let classes = classNames(this.props.classes);
    return (
      <div className={classes}>
        <div id="point-category-selector">
          <h4>Selector</h4>
          <ul>
           <li className="category-list-item">Economics</li>
           {' · '}
           <li className="category-list-item">Machine Learning</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default PointCategorySelector
