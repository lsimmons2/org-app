import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'


class PointForm extends React.Component {


  submitPoint(e){
    e.preventDefault();
    let formData = {};
    for (const field in this.refs){
      formData[field] = this.refs[field].value;
    }
    this.props.submitPoint(formData);
  }

  componentDidMount(e){
    let input = document.getElementById('question-input');
    if (input){
      input.focus()
    }
  }

  render(){

    let app = this.props.app;

    if (!app.in_focus){
      return null;
    }

    //let classes = classNames(this.props.classes);
    return (
      <div>FORRRRMMMMMMMM</div>
      //<div className={classes}>
        //<form id="point-form" onSubmit={this.submitPoint.bind(this)}>
          //<div>
            //<input ref="question" type="text" id="question-input" placeholder="Question"/>
          //</div>
          //<div >
            //<textarea ref="answer" type="text" id="answer-input" placeholder="Answer"/>
          //</div>
          //<div>
            //<input type="submit"/>
          //</div>
        //</form>
      //</div>
    )
  }
}

export default PointForm
