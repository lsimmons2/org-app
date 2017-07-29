
import { connect } from 'react-redux'
import { toggleAnswerVisibility } from '../modules/points'

import Point from '../components/Point'

const mapDispatchToProps = {
  toggleAnswerVisibility
}

const mapStateToProps = (state) => ({
  points : state.points
})

export default connect(mapStateToProps, mapDispatchToProps)(Point)
