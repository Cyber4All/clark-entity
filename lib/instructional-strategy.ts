/**
 * Provide an abstract representation for a learning outcome's
 * instructional strategy.
 */

import { LearningOutcome } from './learning-outcome/learning-outcome';
import { levels, instructions } from '@cyber4all/clark-taxonomy';

/**
 * A class to represent a learning outcome's instructional strategy.
 * @class
 */
export class InstructionalStrategy {
  // Index Signature to allow extra properties;
  [key: string]: any;

  /**
   * @property {string} sourceBloom (immutable)
   *       the outcome's bloom taxon this assessment plan belongs to
   */
  sourceBloom: string;

  /**
   * @property {string} plan
   *       the class of this instructional strategy (eg. lecture)
   *       values are restricted according to source's bloom taxon
   */
  plan: string;

  /**
   * @property {string} text
   *       full text description of this instructional strategy
   */
  text: string;

  /**
   * Construct a new, blank InstructionalStrategy.
   * @param {LearningOutcome} source the learning outcome
   *       the new instructional strategy belongs to
   *
   * @constructor
   */
  constructor(source: LearningOutcome) {
    this.sourceBloom = source.bloom;
    this.plan = Array.from(instructions[source.bloom])[0];
    this.text = '';
  }

  public static instantiate(
    source: LearningOutcome,
    object: InstructionalStrategyProperties
  ): InstructionalStrategy {
    const obj = { ...object };
    const strategy = new InstructionalStrategy(source);

    strategy.plan = obj.plan ? obj.plan : obj.plan ? obj.plan : strategy.plan;
    strategy.text = obj.text ? obj.text : obj.text ? obj.text : strategy.text;

    // Remove known properties
    delete obj.plan;
    delete obj.text;

    // Copy over injected props
    Object.keys(obj).forEach((key: string) => {
      strategy[key] = obj[key];
    });

    return strategy;
  }
}

export type InstructionalStrategyProperties = {
  plan: string;
  text: string;
  [key: string]: any;
};
