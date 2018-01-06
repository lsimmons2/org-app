import { connect } from 'react-redux'
import { get_focused_array_item } from '../modules'
import _ from 'underscore'
import PointList from '../components/PointList'



const mapStateToProps = (globalState) => {
  let collection = get_focused_array_item(globalState.points.collections);
  let points = collection.points
  return {
    points
  }
}

export default connect(mapStateToProps)(PointList)
