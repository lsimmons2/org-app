import { connect } from 'react-redux'
import { populatePoints, submitPoint, detectKeypress } from '../modules'


import Points from '../components/Points'


const mapDispatchToProps = {
  populatePoints,
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
