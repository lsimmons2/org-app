import { connect } from 'react-redux'
import { post_point, post_tag, get_focused_array_item, search } from '../modules'
import NewPoint from '../components/NewPoint'



const mapDispatchToProps = {
  search,
  post_point,
  post_tag
}

const mapStateToProps = (globalState) => {
  let collection = get_focused_array_item(globalState.points.collections);
  let view = collection.app.views.point_form;
  return {
    view,
    search,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPoint)
