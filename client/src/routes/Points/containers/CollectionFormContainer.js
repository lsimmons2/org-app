import { connect } from 'react-redux'
import { post_collection, get_focused_array_item } from '../modules'
import _ from 'underscore'
import CollectionForm from '../components/CollectionForm'



const mapDispatchToProps = {
  post_collection
}

const mapStateToProps = (globalState) => {
  let collection = get_focused_array_item(globalState.points.collections);
  return {
    in_focus: collection.app.sections.collection_name_form.in_focus
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionForm)
