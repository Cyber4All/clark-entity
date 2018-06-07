/**
 * Provide an abstract representation for a learning outcome's
 * instructional strategy.
 */

import { LearningOutcome } from './learning-outcome';
import { levels, instructions } from '@cyber4all/clark-taxonomy';

/**
 * A class to represent a learning outcome's instructional strategy.
 * @class
 */
export class InstructionalStrategy {
  // Index Signature to allow extra properties;
  [key: string]: any;

  private _sourceBloom: string;
  /**
   * @property {string} sourceBloom (immutable)
   *       the outcome's bloom taxon this assessment plan belongs to
   */
  get sourceBloom(): string {
    return this._sourceBloom;
  }

  private _plan: string;
  /**
   * @property {string} plan
   *       the class of this instructional strategy (eg. lecture)
   *       values are restricted according to source's bloom taxon
   */
  get plan(): string {
    return this._plan;
  }
  set plan(plan: string) {
    if (instructions[this._sourceBloom].has(plan)) {
      this._plan = plan;
    } else {
      throw `${plan} is not a valid instructional strategy for the ${
        this._sourceBloom
      } taxon`;
    }
  }

  private _text: string;
  /**
   * @property {string} text
   *       full text description of this instructional strategy
   */
  get text(): string {
    return this._text;
  }
  set text(text: string) {
    this._text = text;
  }

  /**
   * Construct a new, blank InstructionalStrategy.
   * @param {LearningOutcome} source the learning outcome
   *       the new instructional strategy belongs to
   *
   * @constructor
   */
  constructor(source: LearningOutcome) {
    this._sourceBloom = source.bloom;
    this._plan = Array.from(instructions[source.bloom])[0];
    this._text = '';
  }

  public static instantiate(
    source: LearningOutcome,
    object: InstructionalStrategyProperties
  ): InstructionalStrategy {
    const obj = { ...object };
    const strategy = new InstructionalStrategy(source);

    strategy._plan = obj._plan ? obj._plan : obj.plan;
    strategy._text = obj._text ? obj._text : obj.text;

    // Remove known properties
    delete obj._plan;
    delete obj._text;

    // Remove probable properties
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
  _plan: string;
  _text: string;
  [key: string]: any;
};
