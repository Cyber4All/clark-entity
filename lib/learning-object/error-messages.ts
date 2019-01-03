export const LEARNING_OBJECT_ERRORS = {
  INVALID_NAME: 'Name must be defined.',
  INVALID_LENGTH(length: string) {
    if (!length) {
      return 'Length must be defined.';
    }
    return `${length} is not a valid length.`;
  },
  LEVEL_EXISTS(level: string) {
    return `${level} has already been added.`;
  },
  INVALID_LEVEL(level: string) {
    return `${level} is not a valid level.`;
  },
  INVALID_LEVELS: 'Levels must contain at least one valid academic level.'
};
