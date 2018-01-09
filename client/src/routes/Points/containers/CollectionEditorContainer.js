import { connect } from 'react-redux'
import { post_collection, get_focused_array_item } from '../modules'
import CollectionEditor from '../components/CollectionEditor'



const mapDispatchToProps = {
  post_collection
}

const mapStateToProps = (globalState) => {
  let collection = get_focused_array_item(globalState.points.collections);
  let view = collection.app.views.collection_editor;
  let mode = collection.app.mode;
  let tags = collection.tags;
  return {
    view,
    mode,
    tags
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionEditor)
