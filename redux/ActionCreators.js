import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

//Category Action Creators
export const fetchCategories = () => dispatch => {

  dispatch(categoriesLoading());

  return fetch(baseUrl + 'categories')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        const error = new Error(`Error ${response.status}: ${response.statusText}`);
        // @ts-ignore
        error.response = response;
        throw error;
      }
    },
      error => {
        const errMess = new Error(error.message);
        throw errMess;
      })
    .then(response => response.json())
    .then(categories => dispatch(addCategories(categories)))
    .catch(error => dispatch(categoriesFailed(error.message)));
};

export const categoriesLoading = () => ({
  type: ActionTypes.CATEGORIES_LOADING
});

export const categoriesFailed = errMess => ({
  type: ActionTypes.CATEGORIES_FAILED,
  payload: errMess
});

export const addCategories = (categories) => ({
  type: ActionTypes.ADD_CATEGORIES,
  payload: categories
})

export const deleteCategory = categoryId => ({
  type: ActionTypes.DELETE_CATEGORY,
  payload: categoryId
})

export const postCategory = category => dispatch => {
  const newCategory = {
    category
  };

  dispatch(addCategory(newCategory));
}

export const addCategory = category => ({
  type: ActionTypes.ADD_CATEGORY,
  payload: category
});


//Notes Action Creators
export const fetchNotes = () => dispatch => {

  dispatch(notesLoading());

  return fetch(baseUrl + 'notes')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        const error = new Error(`Error ${response.status}: ${response.statusText}`);
        // @ts-ignore
        error.response = response;
        throw error;
      }
    },
      error => {
        const errMess = new Error(error.message);
        throw errMess;
      })
    .then(response => response.json())
    .then(notes => dispatch(addNotes(notes)))
    .catch(error => dispatch(notesFailed(error.message)));
};

export const notesLoading = () => ({
  type: ActionTypes.NOTES_LOADING
});

export const notesFailed = errMess => ({
  type: ActionTypes.NOTES_FAILED,
  payload: errMess
});

export const addNotes = notes => ({
  type: ActionTypes.ADD_NOTES,
  payload: notes
});

export const deleteNote = noteId => ({
  type: ActionTypes.DELETE_NOTE,
  payload: noteId
});

export const postNote = (categoryId, title, text) => dispatch => {
  const newNote = {
    categoryId,
    title,
    text
  };

  dispatch(addNote(newNote));
}

export const addNote = note => ({
  type: ActionTypes.ADD_NOTE,
  payload: note
});