import { LearningObject } from './learning-object';
import { SubmittableLearningOutcome } from '../learning-outcome/submittable-learning-outcome';
import { SUBMITTABLE_LEARNING_OBJECT_ERRORS } from './error-messages';

export class SubmittableLearningObject extends LearningObject {
  get description(): string {
    return super.description;
  }

  /**
   * Sets trimmed text to description
   * If empty, throws an error
   *
   * @memberof SubmittableLearningObject
   */
  set description(description: string) {
    if (description.trim()) {
      super.description = description.trim();
    } else {
      throw new Error();
    }
  }

  /**
   * Adds outcome using parent's addOutcome method if it is a SubmittableOutcome.
   *  If not a SubmittableOutcome a new SubmittableOutcome is created with outcome's properties and added.
   *
   * @param {SubmittableLearningOutcome} outcome
   * @returns {number}
   * @memberof SubmittableLearningObject
   */
  addOutcome(outcome: SubmittableLearningOutcome): number {
    return super.addOutcome(
      outcome instanceof SubmittableLearningOutcome
        ? outcome
        : new SubmittableLearningOutcome(outcome)
    );
  }

  /**
   * Removes the object's i-th learning outcome.
   * Attempts to remove last outcome results in an error because the object must have at least one SubmittableOutcome to be a SubmittableLearningObject
   *
   * @param {number} index
   * @returns {SubmittableLearningOutcome} the learning outcome which was remove
   * @memberof SubmittableLearningObject
   */
  removeOutcome(index: number): SubmittableLearningOutcome {
    if (this.outcomes.length > 1) {
      return super.removeOutcome(index);
    } else {
      throw new Error(SUBMITTABLE_LEARNING_OBJECT_ERRORS.INVALID_OUTCOMES);
    }
  }

  /**
   * Adds SubmittableLearningObject to this object's children
   * If not a SubmittableLearningObject a new SubmittableLearningObject is created with outcome's properties and added.
   *
   * @param {SubmittableLearningObject} object
   * @returns {number}
   * @memberof SubmittableLearningObject
   */
  addChild(object: SubmittableLearningObject): number {
    return super.addChild(
      object instanceof SubmittableLearningObject
        ? object
        : new SubmittableLearningObject(object)
    );
  }

  /**
   *Creates an instance of SubmittableLearningObject.
   * @param {LearningObject} object
   * @memberof SubmittableLearningObject
   */
  constructor(object: LearningObject) {
    super(object);
    this.description = object.description;
    this.validateOutcomes(object.outcomes as SubmittableLearningOutcome[]);
    this.validateChildren(object.children as SubmittableLearningObject[]);
  }

  /**
   * Validates outcomes contain at least one SubmittableOutcome and that all outcomes are SubmittableOutcomes
   *
   * @private
   * @param {SubmittableLearningOutcome[]} outcomes
   * @memberof SubmittableLearningObject
   */
  private validateOutcomes(outcomes: SubmittableLearningOutcome[]): void {
    if (outcomes) {
      outcomes.map(outcome => this.addOutcome(outcome));
    } else {
      throw new Error(SUBMITTABLE_LEARNING_OBJECT_ERRORS.INVALID_OUTCOMES);
    }
  }

  /**
   * Validates children are SubmittableOutcomes
   *
   * @private
   * @param {SubmittableLearningObject[]} children
   * @memberof SubmittableLearningObject
   */
  private validateChildren(children: SubmittableLearningObject[]): void {
    if (children) {
      children.map(child => this.addChild(child));
    }
  }
}
