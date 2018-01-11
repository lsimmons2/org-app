
import { connect } from 'react-redux'
import _ from 'underscore'
import Alert from '../components/Alert'


const mapStateToProps = (globalState) => {
  let alert = globalState.points.global.alert;
  return {
    alert
  }
}

export default connect(mapStateToProps)(Alert)
