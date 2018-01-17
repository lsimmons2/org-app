import { connect } from 'react-redux'
import { post_collection, search, get_focused_array_item } from '../modules'
import _ from 'underscore'
import CollectionEditor from '../components/CollectionEditor'



const mapDispatchToProps = {
  post_collection,
  search
}

const mapStateToProps = (globalState) => {
  let collection = get_focused_array_item(globalState.points.tabs);
  let view = collection.app.views.collection_editor;
  let mode = collection.app.mode;
  let tags = collection.tags;
  let tags_search = _.find(collection.app.views.collection_editor.sections, section => {
    return section.name === 'tags_search'
  });
  let tags_search_input_id = tags_search.input_id;
  return {
    view,
    mode,
    tags,
    tags_search_input_id
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionEditor)
