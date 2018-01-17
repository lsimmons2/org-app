import uuid from 'uuid/v4'


const get_new_point_view = () => ({
  in_focus: false,
  sections: [
    {
      name: 'point_question_input',
      in_focus: true,
      input_id: uuid()
    },
    {
      name: 'point_answer_input',
      in_focus: false,
      input_id: uuid()
    },
    {
      name: 'tags_list',
      tags: [],
      in_focus: false
    },
    {
      name: 'tag_form',
      in_focus: false,
      input_id: uuid()
    },
    {
      name: 'tags_search',
      search_suggestions: [],
      in_focus: false,
      input_id: uuid()
    }
  ]
})

export const get_just_add_points = () => ({
  name: 'just add points',
  app: {
    in_focus: true,
    is_just_add_points: true,
    views: {
      new_point: get_new_point_view()
    }
  }
})

export const get_blank_tab = () => ({
  name: 'blank tab',
  app: {
    in_focus: true,
    is_blank: true,
    sections: [
      {
        name: 'collection_search',
        in_focus: true,
        search_suggestions: [],
        input_id: uuid()
      },
      {
        name: 'collection_name_form',
        in_focus: false,
        input_id: uuid()
      },
      {
        name: 'just_add_points_button',
        in_focus: false
      }
    ]
  }
})

const initialState = {
  global: {
    alert: '',
    most_recent_tags: [],
    most_recent_collections: []
  },
  tabs: [get_blank_tab()]
}

export const get_default_collection = () => ({
  name: 'new_collection',
  collection_id: 1,
  points: [],
  tags: [],
  mode: {
    tags_exclusive: false,
    tags_inclusive: true,
    select_points: false
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
      //point_list: {
        //in_focus: true
      //},

      //VIEW: NEW_POINT
      new_point: get_new_point_view(),

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
            in_focus: false,
            input_id: uuid()
          },
          {
            name: 'collection_save',
            in_focus: false
          }//,
          //{
            //name: 'collection_name_form',
            //in_focus: false
          //},
          //{
            //name: 'point_answer_input',
            //in_focus: false
          //},
          //{
            //name: 'filter_form',
            //in_focus: false
          //}
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
      }

    }
  }
})

export default initialState
