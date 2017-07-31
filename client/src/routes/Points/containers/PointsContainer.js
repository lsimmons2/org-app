import { connect } from 'react-redux'
import { getAll, toggleAnswerVisibility, submitPoint, detectKeypress } from '../modules/points'


import Points from '../components/Points'


const mapDispatchToProps = {
  getAll,
  toggleAnswerVisibility,
  submitPoint,
  detectKeypress
}

//const mapStateToProps = (state) => ({
  //points : state.points.points
//})
const mapStateToProps = (globalState) => {
  return {
    points : globalState.points.points,
    sections: globalState.points.sections
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Points)
