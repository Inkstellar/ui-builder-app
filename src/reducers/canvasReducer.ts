const initialState = {
  elements: [],
};

export const canvasReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_ELEMENT':
      return {
        ...state,
        elements: [...state.elements, action.payload],
      };
    default:
      return state;
  }
};