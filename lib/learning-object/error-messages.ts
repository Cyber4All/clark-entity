export const LEARNING_OBJECT_ERRORS = {
  INVALID_NAME: 'Name must be defined.',
  INVALID_DESCRIPTION: 'Description must be defined.',
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
  LEVEL_DOES_NOT_EXIST(level: string) {
    return `${level} does not exist on this object.`;
  },
  INVALID_LEVELS: 'Levels must contain at least one valid academic level.',
  INVALID_STATUS(status: string) {
    if (!status) {
      return 'Status must be defined.';
    }
    return `${status} is not a valid status.`;
  },
  INVALID_OUTCOME: 'Outcome must be defined and be a valid outcome.',
  INVALID_CHILD: 'Child object must be defined.',
  INVALID_CONTRIBUTOR: 'Contributor must be defined.',
  INVALID_MATERIAL: 'Material must be defined.',
  INVALID_METRICS: 'Metrics must be defined.',
  INVALID_COLLECTION: 'Collection must be defined.'
};

export const SUBMITTABLE_LEARNING_OBJECT_ERRORS = {
  INVALID_DESCRIPTION: 'Description must not be an empty string.',
  INVALID_OUTCOMES: 'Outcomes must contain at least one valid outcome.'
};
