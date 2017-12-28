
import initialState from '../initial-state'
import { 
  get_default_collection,
  get_new_collection
} from '../initial-state'

export const IGNORE = 'IGNORE'
export const MOVE_TAB_FOCUS = 'MOVE_TAB_FOCUS'
export const ADD_NEW_COLLECTION = 'ADD_NEW_COLLECTION'

export const detect_keypress_global = (dispatch, event) => {

  let key = event.key;

    //TAB ACTIONS
    if (event.altKey && key == 't'){
      let new_collection = get_new_collection();
      console.log('dispatching erh');
      return dispatch({
        type: ADD_NEW_COLLECTION,
        collection: new_collection
      })
    }

    //if (collection_index < 0){
      //return dispatch({
        //type: IGNORE
      //})
    //}

    if (event.altKey && key == '['){
      return dispatch({
        type: MOVE_TAB_FOCUS,
        direction: -1
      })
    }

    if (event.altKey && key == ']'){
      return dispatch({
        type: MOVE_TAB_FOCUS,
        direction: 1
      })
    }

}


const GLOBAL_ACTION_HANDLERS = {
  [IGNORE]: (state, action) => state,
  [MOVE_TAB_FOCUS]: (state, action) => {
    return {
      ...state,
      collections: move_array_focus(state.collections, action.direction)
    };
  },
  [ADD_NEW_COLLECTION]: (state, action) => {
    console.log('hereeeeeee');
    let new_collections = state.collections.map(collection => {
      collection.app.in_focus = false;
      return collection
    })
    new_collections.push(action.collection);
    return {
      ...state,
      collections: new_collections
    };
  }
}


export const global_reducer = (state = initialState, action) => {
  console.log('in globallllll redu');
  const handler = GLOBAL_ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

