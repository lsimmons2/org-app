import { connect } from 'react-redux'
import { post_collection, get_focused_array_item } from '../modules'
import _ from 'underscore'
import CollectionForm from '../components/CollectionForm'



const mapDispatchToProps = {
  post_collection
}

const mapStateToProps = (globalState) => {
  let collection = get_focused_array_item(globalState.points.collections);
  let collection_name_form = _.find(collection.app.sections, section => {
    return section.name === 'collection_name_form';
  });
  return {
    in_focus: collection_name_form.in_focus
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionForm)
