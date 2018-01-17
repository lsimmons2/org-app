import { connect } from 'react-redux'
import { search, get_focused_array_item } from '../modules'
import _ from 'underscore'
import Search from '../components/Search'



const mapDispatchToProps = {
  search
}

const mapStateToProps = (globalState) => {
  let collection = get_focused_array_item(globalState.points.tabs);
  let collection_search = _.find(collection.app.sections, section => {
    return section.name === 'collection_search';
  });
  return {
    in_focus: collection_search.in_focus,
    search_suggestions: collection_search.search_suggestions,
    search_type: 'collections',
    input_id: collection_search.input_id
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
