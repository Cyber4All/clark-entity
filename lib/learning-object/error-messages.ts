export const LEARNING_OBJECT_ERRORS = {
  INVALID_NAME: 'Name must be defined',
  INVALID_LENGTH(length: string) {
    if (!length) {
      return 'Length must be defined';
    }
    return `${length} is not a valid length`;
  }
};
