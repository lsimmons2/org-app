

export const get_new_collection = () => ({
  name: 'new_collection',
  app: {
    in_focus: true,
    is_new: true,
    sections: [
      {
        name: 'collection_search',
        in_focus: true,
        search_suggestions: []
      },
      {
        name: 'collection_name_form',
        in_focus: false
      }
    ]
  }
})


const initialState = {
  global: {
    most_recent_tags: [],
    most_recent_collections: []
  },
  collections: [get_new_collection()]
}


export const get_default_collection = () => ({
  name: 'new_collection',
  collection_id: 1,
  points: [],
  tags: [],
  mode: {
    tags_exclusive: false,
    tags_inclusive: false,
    select_points: true
  },
  app: {
    tags: {
      associated: [],
      most_recent: [],
    },
    is_saved: false,
    in_focus: true,
    filter: {
      success_rate: 0,
      time_added: {
        before: null,
        after: null
      }
    },
    sorts: {
      shuffle: true,
      time_added: false
    },
    views: {

      //VIEW: POINT_LIST
      point_list: {
        in_focus: true
      },

      //VIEW: NEW_POINT
      new_point: {
        in_focus: false,
        sections: [
          {
            name: 'point_question_input',
            in_focus: true
          },
          {
            name: 'point_answer_input',
            in_focus: false
          },
          {
            name: 'tags_list',
            tags: [],
            in_focus: false
          },
          {
            name: 'tag_form',
            in_focus: false
          },
          {
            name: 'tags_search',
            search_suggestions: [],
            in_focus: false
          }
        ]
      },

      //VIEW: POINT_EDITOR
      point_editor: {
        in_focus: false,
        sections: {
          point_question_input: {
            in_focus: true
          },
          point_answer_input: {
            in_focus: false
          },
          tags_list: {
            in_focus: false,
            show_search: false
          }
        }
      },

      //VIEW: COLLECTION_EDITOR
      collection_editor: {
        in_focus: false,
        sections: [
          {
            name: 'mode_form',
            in_focus: true
          },
          {
            name: 'tags_list',
            in_focus: false
          },
          {
            name: 'collection_name_form',
            in_focus: false
          },
          {
            name: 'point_answer_input',
            in_focus: false
          },
          {
            name: 'tag_form',
            in_focus: false
          },
          {
            name: 'tags_search',
            search_suggestions: [],
            in_focus: false
          },
          {
            name: 'filter_form',
            in_focus: false
          }
        ]
      }

    }
  }
})

export default initialState
