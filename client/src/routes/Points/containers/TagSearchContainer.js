import { connect } from 'react-redux'
import { search, get_focused_array_item } from '../modules'
import _ from 'underscore'
import Search from '../components/Search'



const mapDispatchToProps = {
  search
}

const mapStateToProps = (globalState) => {
  let collection = get_focused_array_item(globalState.points.collections);
  let sections = collection.app.views.point_form.sections;
  let tags_search = _.find(sections, section => {
    return section.name === 'tags_search'
  });
  return {
    in_focus: tags_search.app.in_focus,
    search_suggestions: tags_search.search_suggestions,
    search_type: 'collections'
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
