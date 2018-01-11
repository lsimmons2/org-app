
import { connect } from 'react-redux'
import TabBar from '../components/TabBar'


const mapStateToProps = (globalState) => {
  return {
    collections: globalState.points.tabs
  }
}

export default connect(mapStateToProps)(TabBar)
