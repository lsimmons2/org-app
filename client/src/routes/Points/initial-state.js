
const initialState = {
  global: {
    most_recent_tags: [],
    most_recent_collections: []
  },
  collections: [

  //{
      //name: 'sah111111111',
      //collection_id: 'blah1',
      //app: {
        //in_focus: true
      //}
    //}

    //{
      //name: 'sah2222222',
      //collection_id: 'blah22',
      //app: {
        //in_focus: false
      //}
    //},

    //{
      ////domain
      //name: 'booooooo',
      //collection_id: 'blah',
      //points: [
        //{
          //point_id: 1,
          //question: 'blah?',
          //answer: 'blah',
          //in_focus: false,
          //is_visible: false,
          //associated_tags: [],
          //searching_tags: []
        //}
      //],
      //tags: [],
      ////app
      //app: {
        //tags: {
          //associated: [],
          //most_recent: [],
        //},
        //searching: [],
        //is_saved: false,
        //in_focus: true,
        //mode: {
          //tags_exclusive: true,
          //tags_inclusive: false,
          //select_points: false
        //},
        //filter: {
          //success_rate: 0,
          //time_added: {
            //before: null,
            //after: null
          //}
        //},
        //sorts: {
          //shuffle: true,
          //time_added: false
        //},
        //sections: {
          //collection_name_form: {
            //is_selected: false
          //},
          //point_list: {
            //is_selected: true
          //},
          //point_form: { //is_selected: false
          //},
          //point_editor: {
            //is_selected: false
          //},
          //tags_manager: {
            //is_selected: false,
            //show_search: false
          //}
        //}
      //}
    //}

  ]
}

export const default_collection = {
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
    sections: {
      new_collection: {
        in_focus: true,
        sub_sections: {
          collection_name_form: {
            in_focus: true
          },
          collection_search: {
            in_focus: false
          }
        }
      },
      point_list: {
        in_focus: true
      },
      point_form: {
        in_focus: false
      },
      point_editor: {
        in_focus: false
      },
      tags_manager: {
        in_focus: false,
        show_search: false
      }
    }
  }
}

export default initialState



  //sections: {
    //collection_name_form: {
      //in_focus: true
    //},
    //collection_search: {
      //in_focus: false
    //},
    //point_list: {
      //in_focus: true
    //},
    //point_form: {
      //in_focus: false
    //},
    //point_editor: {
      //in_focus: false
    //},
    //tags_manager: {
      //in_focus: false,
      //show_search: false
    //}
  //}
