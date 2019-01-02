import { LearningOutcome } from './learning-outcome';
import { SUBMITTABLE_LEARNING_OUTCOME_ERROR_MESSAGES } from './error-messages';

/**
 * A class to represent a submittable learning outcome.
 * @class
 */
export class SubmittableLearningOutcome extends LearningOutcome {
  /**
   * Returns text from parent's getter
   *
   * @type {string}
   * @memberof SubmittableLearningOutcome
   */
  get text(): string {
    return super.text;
  }

  /**
   * Sets text to trimmed text string.
   * If text is empty an error is thrown
   *
   * @memberof SubmittableLearningOutcome
   */
  set text(text: string) {
    if (text && text.trim()) {
      super.text = text;
    } else {
      throw new Error(SUBMITTABLE_LEARNING_OUTCOME_ERROR_MESSAGES.INVALID_TEXT);
    }
  }
  /**
   *Creates an instance of SubmittableLearningOutcome.
   * @param {LearningOutcome} outcome
   * @memberof SubmittableLearningOutcome
   */
  constructor(outcome: LearningOutcome) {
    super(outcome);
    this.text = outcome.text;
  }
}
