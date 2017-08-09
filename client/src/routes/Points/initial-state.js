
const ninitialState = {
  points: [],
  sections: {
    pointList: {
      is_selected: false
    },
    pointForm: {
      is_selected: false
    },
    pointCategorySelector: {
      is_selected: true
    }
  }
}


const initialState = {
  domain: {
    categories: [
      //{
        //name: 'economics',
        //time_last_updated: Date,
        //points: []
      //}
    ]
  },
  app: {
    sections: {
      pointList: {
        is_selected: true
      },
      pointForm: {
        is_selected: false
      },
      pointCategorySelector: {
        is_selected: false
      }
    },
    categories: [
      //{
        //name: 'economics',
        //is_selected: true,
        //in_focus: true,
        //time_last_updated: Date,
        //points: [
          //{
            //id: 'blah',
            //is_selected: true
          //},
          //{
            //id: 'blah2',
            //is_selected: false
          //}
        //]
      //},
      //{
        //name: 'ml',
        //is_selected: false,
        //in_focus: false,
        //time_last_updated: Date,
        //points: [
          //{
            //id: 'blah',
            //is_selected: true
          //},
          //{
            //id: 'blah2',
            //is_selected: false
          //}
        //]
      //}
    ],
    category_stack: []
  }
}

export default initialState
