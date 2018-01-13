import { connect } from 'react-redux'
import { search, get_focused_array_item } from '../modules'
import _ from 'underscore'
import CollectionMeta from '../components/CollectionMeta'



const mapStateToProps = (globalState) => {
  let collection = get_focused_array_item(globalState.points.tabs);
  let mode = collection.mode;
  return {
    mode
  }
}

export default connect(mapStateToProps)(CollectionMeta)
