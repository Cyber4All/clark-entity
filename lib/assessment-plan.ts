/**
 * Provide an abstract representation for a learning outcome's
 * assessment plan.
 */

import { LearningOutcome } from './learning-outcome/learning-outcome';
import { assessments } from '@cyber4all/clark-taxonomy';

/**
 * A class to represent a learning outcome's assessment plan.
 * @class
 */
export class AssessmentPlan {
  // Index Signature to allow extra properties;
  [key: string]: any;

  /**
   * @property {string} sourceBloom (immutable)
   *       the outcome's bloom taxon this assessment plan belongs to
   */
  sourceBloom: string;

  /**
   * @property {string} instruction
   *       the class of this assessment plan (essay, test, etc.)
   *       values are restricted according to source's bloom taxon
   */
  plan: string;

  /**
   * @property {string} text
   *       full text description of this instructional strategy
   */
  text: string;

  /**
   * Construct a new, blank AssessmentPlan.
   * @param {LearningOutcome} source the learning outcome
   *       the new assessment plan belongs to
   *
   * @constructor
   */
  constructor(source: LearningOutcome) {
    this.sourceBloom = source.bloom;
    this.plan = <string>Array.from(assessments[source.bloom])[0];
    this.text = '';
  }

  public static instantiate(
    source: LearningOutcome,
    object: AssessmentPlanProperties
  ): AssessmentPlan {
    const obj = { ...object };
    const assessment = new AssessmentPlan(source);

    assessment.plan = obj.plan ? obj.plan : assessment.plan;
    assessment.text = obj.text ? obj.text : assessment.text;

    // Remove known properties
    delete obj.plan;
    delete obj.text;

    // Copy over injected props
    Object.keys(obj).forEach((key: string) => {
      assessment[key] = obj[key];
    });

    return assessment;
  }
}

export type AssessmentPlanProperties = {
  plan: string;
  text: string;
  [key: string]: any;
};
