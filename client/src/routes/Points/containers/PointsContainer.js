import { connect } from 'react-redux'
import { populatePoints, toggleAnswerVisibility, submitPoint, detectKeypress } from '../modules'


import Points from '../components/Points'


const mapDispatchToProps = {
  populatePoints,
  toggleAnswerVisibility,
  submitPoint,
  detectKeypress
}

const mapStateToProps = (globalState) => {
  return {
    points: globalState.points.domain.points,
    sections: globalState.points.app.sections
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Points)
