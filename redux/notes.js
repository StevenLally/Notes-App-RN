import * as ActionTypes from './ActionTypes';

export const notes = (state = {
  isLoading: true,
  errMess: null,
  notes: []
}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_NOTES:
      return { ...state, isLoading: false, errMess: null, notes: action.payload };

    case ActionTypes.NOTES_LOADING:
      return { ...state, isLoading: true, errMess: null, notes: [] };

    case ActionTypes.NOTES_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    case ActionTypes.DELETE_NOTE:
      return state.filter(note => note !== action.payload);

    case ActionTypes.ADD_NOTE:
      const lastNoteIndex = state.notes.length - 1;
      action.payload.id = state.notes[lastNoteIndex].id + 1;
      return { ...state, isLoading: false, errMess: null, notes: state.notes.concat(action.payload) };

    default:
      return state;
  }
};