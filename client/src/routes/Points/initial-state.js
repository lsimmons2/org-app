
const initialState = {
  global: {
    most_recent_tags: [],
    most_recent_collections: []
  },
  collections: []
}


export const get_new_collection = () => ({
  name: 'new_collection',
  app: {
    in_focus: true,
    is_new: true,
    sections: {
      collection_search: {
        in_focus: true,
        search_suggestions: []
      },
      collection_name_form: {
        in_focus: false
      }
    }
  }
})

export const get_default_collection = () => ({
  name: 'new_collection',
  collection_id: 1,
  points: [],
  tags: [],
  app: {
    tags: {
      associated: [],
      most_recent: [],
    },
    is_saved: false,
    in_focus: true,
    mode: {
      tags_exclusive: true,
      tags_inclusive: false,
      select_points: false
    },
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

      point_list: {
        in_focus: true
      },

      point_form: {
        in_focus: false,
        sections: [
          {
            name: 'point_question_input',
            app: {
              in_focus: true
            }
          },
          {
            name: 'point_answer_input',
            app: {
              in_focus: false
            }
          },
          {
            name: 'tags_list',
            app: {
              in_focus: false,
              show_search: false
            }
          }
        ]
        //sections: {
          //point_question_input: {
            //in_focus: true
          //},
          //point_answer_input: {
            //in_focus: false
          //},
          //tags_list: {
            //in_focus: false,
            //show_search: false
          //}
        //}
      },

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

      collection_editor: {
        in_focus: false,
        sections: {
          collection_name_form: {
            in_focus: true
          },
          new_tag_form: {
            in_focus: false
          },
          tag_search: {
            in_focus: false
          },
          tags_list: {
            in_focus: false,
            show_search: false
          },
          mode_radios: {
            in_focus: false
          },
          filter_form: {
            in_focus: false
          }
        }
      }

    }
  }
})

export default initialState
