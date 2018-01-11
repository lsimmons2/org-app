
import React from 'react'



class Alert extends React.Component {

  constructor(props){
    super(props);
    this.show = true;
  }

  componentDidUpdate(){
    setTimeout(function() {
      this.show = false;
      this.forceUpdate();
    }.bind(this), 1000);
  }

  render() {
    if (!this.show || !this.props.alert.length){
      return null;
    } else {
      return (
        <div className="alert" ref="alert">{this.props.alert}</div>
      )
    }
  }

}

export default Alert
