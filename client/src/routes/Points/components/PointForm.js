import React from 'react'
import classNames from 'classnames'



class PointForm extends React.Component {

  handle_focusing(){
    if (this.props.question_section_in_focus){
      this.refs['question'].focus();
    } else if (this.props.answer_section_in_focus){
      this.refs['answer'].focus();
    } else {
      this.refs['question'].blur();
      this.refs['answer'].blur();
    }
  }

  componentDidMount(e){
    this.handle_focusing()
  }

  componentDidUpdate(e){
    this.handle_focusing()
  }

  render() {

    let question_classes = classNames({
      'big_section': true,
      'big_section_in_focus': this.props.question_section_in_focus
    });

    let answer_classes = classNames({
      'big_section': true,
      'big_section_in_focus': this.props.answer_section_in_focus
    });

    return (
      <form onSubmit={e => e.preventDefault()}>
        <div className={question_classes}>
          <input id={this.props.question_input_id} ref="question" type="text" placeholder="Question"/>
        </div>
        <div className={answer_classes}>
          <input id={this.props.answer_input_id} ref="answer" type="text" placeholder="Answer"/>
        </div>
        <input type="submit" style={{visibility:'hidden',height:'0'}}/>
      </form>
    )

  }

}


export default PointForm
