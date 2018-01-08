
import { connect } from 'react-redux'
import TabBar from '../components/TabBar'


const mapStateToProps = (globalState) => {
  return {
    collections: globalState.points.collections
  }
}

export default connect(mapStateToProps)(TabBar)
