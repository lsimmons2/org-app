import { connect } from 'react-redux'
import { get_focused_array_item } from '../modules'
import TabView from '../components/TabView'



const mapStateToProps = (globalState) => {
  let collection = get_focused_array_item(globalState.points.collections);
  return {
    collection
  }
}

export default connect(mapStateToProps)(TabView)
