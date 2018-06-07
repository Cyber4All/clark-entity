/**
 * Provide an abstract representation for a learning object's
 * learning goal.
 */
import { LearningObject } from './learning-object';

/**
 * A class to represent a learning object's learning goal.
 * @class
 */
export class LearningGoal {
  // Index Signature to allow extra properties;
  [key: string]: any;

  private _text: string;
  /**
   * @property {string} text text content of this learning goal
   */
  get text(): string {
    return this._text;
  }
  set text(text: string) {
    this._text = text;
  }

  /**
   * Construct a new Learning Goal with text.
   * @param {string} text the text of the new Learning Goal
   *
   * @constructor
   */
  constructor(text: string) {
    this._text = text;
  }

  public static instantiate(object: LearningGoalProperties): LearningGoal {
    const obj = { ...object };
    let goal = new LearningGoal(obj._text ? obj._text : obj.text);

    //Remove known properties
    delete obj._text;

    //Remove probable properties
    delete obj.text;

    // Copy over injected props
    Object.keys(obj).forEach((key: string) => {
      goal[key] = obj[key];
    });

    return goal;
  }
}

export type LearningGoalProperties = {
  _text: string;
  [key: string]: any;
};
