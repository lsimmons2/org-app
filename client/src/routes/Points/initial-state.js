const initialState = {
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

export default initialState

const ninitialState = {
  domain: {
    points: []
  },
  app: {
    sections: {
      pointList: {
        selected: true
      },
      pointForm: {
        selected: false
      },
      categories: [
        {
          ml: {
            selected: true,
            points: []
          },
          economics: {
            selected: false,
            points: []
          },
          front: {
            selected: false,
            points: []
          }
        }
      ]
    }
  }
}

