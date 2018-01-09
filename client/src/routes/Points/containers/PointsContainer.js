import { connect } from 'react-redux'

import {
  detect_keypress,
  post_collection,
  post_point,
  post_tag,
  search
} from '../modules'
import Points from '../components/Points'


const mapDispatchToProps = {
  detect_keypress,
  post_collection,
  post_point,
  post_tag,
  search
}

export default connect(null, mapDispatchToProps)(Points)
