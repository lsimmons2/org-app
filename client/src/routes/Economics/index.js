import { injectReducer } from '../../store/reducers'
import { getAll } from './modules/points'

function getPoints(store){
  console.log(store);
  console.log(store.getState());
}

export default (store) => ({
  path : 'economics',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Points = require('./containers/PointsContainer').default
      const reducer = require('./modules/points').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'points', reducer })

      /*  Return getComponent   */
      cb(null, Points)

    /* Webpack named bundle   */
    }, 'points')
  }
})
