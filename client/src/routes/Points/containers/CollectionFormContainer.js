import { connect } from 'react-redux'
import { get_focused_array_item } from '../modules'
import _ from 'underscore'
import CollectionForm from '../components/CollectionForm'



const mapStateToProps = (globalState) => {
  let collection = get_focused_array_item(globalState.points.tabs);
  let collection_name_form = _.find(collection.app.sections, section => {
    return section.name === 'collection_name_form';
  });
  let in_focus = collection_name_form.in_focus;
  let input_id = collection_name_form.input_id;
  return {
    in_focus,
    input_id
  }
}

export default connect(mapStateToProps)(CollectionForm)
