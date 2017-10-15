
const initialState = {
  domain: {
    categories: []
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
      },
      pointCategoryForm: {
        is_selected: false
      }
    },
    categories: [],
    category_stack: []
  }
}

export default initialState
