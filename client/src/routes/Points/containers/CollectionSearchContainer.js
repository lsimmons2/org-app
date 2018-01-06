import { connect } from 'react-redux'
import { search, get_focused_array_item } from '../modules'
import _ from 'underscore'
import Search from '../components/Search'



const mapDispatchToProps = {
  search
}

const mapStateToProps = (globalState) => {
  let collection = get_focused_array_item(globalState.points.collections);
  let collection_search = collection.app.sections.collection_search;
  return {
    in_focus: collection_search.in_focus,
    search_suggestions: collection_search.search_suggestions,
    search_type: 'collections'
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
