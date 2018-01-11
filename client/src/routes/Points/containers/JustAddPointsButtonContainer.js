import { connect } from 'react-redux'
import { get_focused_array_item } from '../modules'
import _ from 'underscore'
import JustAddPointsButton from '../components/JustAddPointsButton'



const mapStateToProps = (globalState) => {
  let tab = get_focused_array_item(globalState.points.tabs);
  let just_add_points_button = _.find(tab.app.sections, section => {
    return section.name === 'just_add_points_button';
  });
  return {
    in_focus: just_add_points_button.in_focus
  }
}

export default connect(mapStateToProps)(JustAddPointsButton)
