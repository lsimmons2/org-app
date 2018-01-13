import { connect } from 'react-redux'
import { get_focused_array_item, search } from '../modules'
import NewPoint from '../components/NewPoint'



const mapDispatchToProps = {
  search
}

const mapStateToProps = (globalState) => {
  let collection = get_focused_array_item(globalState.points.tabs);
  let view = collection.app.views.new_point;
  return {
    view,
    search
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPoint)
