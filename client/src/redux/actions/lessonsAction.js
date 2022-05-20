export const allLessons = (lessons) => {
  return {
    type: 'ALL POSTS',
    payload: lessons,
  };
};

export const deleteLesson = (id) => {
  return {
    type: 'DELETE_LESSON',
    payload: id,
  };
};

export const addLesson = (lesson) => {
  return {
    type: 'ADD_LESSON',
    payload: lesson
  };
};

export const editLesson = (lesson) => {
  return {
    type: 'EDIT_LESSON',
    payload: lesson
  };
};
