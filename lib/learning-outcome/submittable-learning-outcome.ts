import { LearningOutcome } from './learning-outcome';

/**
 * A class to represent a submittable learning outcome.
 * @class
 */
export class SubmittableLearningOutcome extends LearningOutcome {
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
      throw new Error('Text must not be an empty string.');
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
