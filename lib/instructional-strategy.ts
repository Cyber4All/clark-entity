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
   *       values are resetricted according to source's bloom taxon
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
    let strategy = new InstructionalStrategy(source);

    strategy._plan = object._plan ? object._plan : object.plan;
    strategy._text = object._text ? object._text : object.text;

    // Remove known properties
    delete object._plan;
    delete object._text;

    // Remove probable properties
    delete object.plan;
    delete object.text;

    // Copy over injected props
    Object.keys(object).forEach((key: string) => {
      strategy[key] = object[key];
    });

    return strategy;
  }
}

export type InstructionalStrategyProperties = {
  _plan: string;
  _text: string;
  [key: string]: any;
};
