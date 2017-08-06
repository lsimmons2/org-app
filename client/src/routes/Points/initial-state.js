
const ninitialState = {
  points: [],
  sections: {
    pointList: {
      selected: false
    },
    pointForm: {
      selected: false
    },
    pointCategorySelector: {
      selected: true
    }
  }
}


const initialState = {
  //domain: {
    //points: []
  //},
  domain: {
    categories: [
      {
        name: 'economics',
        time_last_updated: Date,
        points: []
      }
    ]
  },
  app: {
    sections: {
      pointList: {
        selected: true
      },
      pointForm: {
        selected: false
      },
      pointCategorySelector: {
        selected: false
      }
    },
    categories: [
      {
        name: 'economics',
        is_selected: true,
        time_last_updated: Date,
        points: [
          {
            id: 'blah',
            selected: true
          },
          {
            id: 'blah2',
            selected: false
          }
        ]
      },
      {
        name: 'ml',
        is_selected: false,
        time_last_updated: Date,
        points: [
          {
            id: 'blah',
            selected: true
          },
          {
            id: 'blah2',
            selected: false
          }
        ]
      }
    ],
    category_stack: []
  }
}

export default initialState
