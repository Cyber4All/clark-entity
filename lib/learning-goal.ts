/**
 * Provide an abstract representation for a learning object's
 * learning goal.
 */

/**
 * A class to represent a learning object's learning goal.
 * @class
 */
export class LearningGoal {
  // Index Signature to allow extra properties;
  [key: string]: any;

  /**
   * @property {string} text text content of this learning goal
   */
  text: string;

  /**
   * Construct a new Learning Goal with text.
   * @param {string} text the text of the new Learning Goal
   *
   * @constructor
   */
  constructor(text: string) {
    this.text = text;
  }

  public static instantiate(object: LearningGoalProperties): LearningGoal {
    const obj = { ...object };
    let goal = new LearningGoal(obj.text ? obj.text : obj.text ? obj.text : '');

    // Copy over props
    Object.keys(obj).forEach((key: string) => {
      goal[key] = obj[key];
    });

    return goal;
  }
}

export type LearningGoalProperties = {
  text: string;
  [key: string]: any;
};
