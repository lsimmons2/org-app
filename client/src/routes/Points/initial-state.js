
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
      pointCategorySelector: {
        selected: false
      }
    }
  }
}

export default initialState
