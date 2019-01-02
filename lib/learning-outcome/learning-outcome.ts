/**
 * Provide abstract representations for learning outcomes.
 */

import { Outcome } from '../outcome/outcome';
import { User } from '../user/user';
import { LearningObject } from '../learning-object/learning-object';
import { AssessmentPlan, AssessmentPlanProperties } from '../assessment-plan';
import {
  InstructionalStrategy,
  InstructionalStrategyProperties
} from '../instructional-strategy';

export interface LearningOutcomeSource {
  author: User;
  name: string;
  date: string;
}

/**
 * A class to represent a learning outcome.
 * @class
 */
export class LearningOutcome implements Outcome {
  // Index Signature to allow extra properties;
  [key: string]: any;

  /**
   * @property {LearningOutcomeSource} source (immutable)
   *       the author, name, and date of the learning object this outcome belongs to
   */
  source: LearningOutcomeSource;

  /**
   * @property {number} tag (immutable)
   *       a unique (over the source) identifier
   */
  tag: number;

  /**
   * @property {string} instruction
   *       the bloom taxon of this learning outcome
   *       values are restricted according to available levels
   */
  bloom: string;

  /**
   * @property {string} instruction
   *       the verb this outcome text starts with (eg. define)
   *       values are restricted according to the bloom taxon
   */
  verb: string;

  /**
   * @property {string} text
   *       full text description of this outcome, except the verb
   */
  text: string;

  /**
   * @property {Outcome[]} mappings (immutable)
   *       outcomes which presumably achieve similar things as this
   *
   * NOTE: individual elements are freely accessible, but the array
   *       reference itself is immutable, and elements can only be
   *       added and removed by the below functions
   */
  mappings: Outcome[];

  /**
   * @property {AssessmentPlan[]} assessments (immutable)
   *       plans to assess how well the outcome is achieved
   *
   * NOTE: individual elements are freely accessible, but the array
   *       reference itself is immutable, and elements can only be
   *       added and removed by the below functions
   */
  assessments: AssessmentPlan[];

  /**
   * @property {InstructionalStrategy[]} strategies (immutable)
   *       strategies on how to achieve the outcome
   *
   * NOTE: individual elements are freely accessible, but the array
   *       reference itself is immutable, and elements can only be
   *       added and removed by the below functions
   */
  strategies: InstructionalStrategy[];

  /**
   * @property {number} author
   *      Learning Object's author's name
   */
  author: string;

  /**
   * @property {number} name
   *      Learning Object's name
   */
  name: string;

  /**
   * @property {number} date
   *      Learning Object's last edited date
   */
  date: string;

  /**
   * @property {number} outcome
   *       Bloom verb and text concatenated
   */
  outcome: string;

  /**
   * Construct a new, blank LearningOutcome.
   * @param {LearningObject} source the learning object
   *       the new learning outcome belongs to
   *
   * TODO: constructor should take EITHER source OR tag (the other should be null)
   *       If tag is given (0 allowed),
   *          If source exists, validate that tag is unique,
   *          Otherwise, trust it
   *       Otherwise, auto-increment tag as necessary based on source
   *
   *       The order of parameters should be consistent with LearningObject,
   *          ultimately that should be (tag, source)
   *
   * @constructor
   */
  constructor(source: LearningObject) {
    this.source = {
      author: source.author,
      name: source.name,
      date: source.date
    };
    this.tag = 0;

    // ensure tag is unique
    if (source) {
      // if outcome is independent of source, we obviously can't ensure a unique tag
      let searching = true;
      while (searching) {
        searching = false;
        for (let outcome of source.outcomes) {
          if (outcome.tag === this.tag) {
            this.tag++;
            searching = true;
            break;
          }
        }
      }
    }

    this.bloom = '';
    this.verb = '';
    this.text = '';
    this.mappings = [];
    this.assessments = [];
    this.strategies = [];

    this.author = this.source.author.name;
    this.name = this.source.name;
    this.date = this.source.date;
    this.outcome = `${this.verb} ${this.text}`;
  }

  /**
   * Maps an outcome to this learning outcome.
   * @returns {number} the new length of the mappings array
   */
  mapTo(mapping: Outcome): number {
    return this.mappings.push(mapping);
  }

  /**
   * Removes the outcome's i-th mapping.
   * @param {number} i the index to remove from the mappings array
   *
   * @returns {Outcome} the outcome which was removed
   */
  unmap(i: number): Outcome {
    return this.mappings.splice(i, 1)[0];
  }

  /**
   * Adds a new, blank assessment plan to this outcome.
   * @returns {AssessmentPlan} a reference to the new assessment plan
   */
  addAssessment(): AssessmentPlan {
    let assessment = new AssessmentPlan(this);
    this.assessments.push(assessment);
    return assessment;
  }

  /**
   * Removes the outcome's i-th assessment plan.
   * @param {number} i the index to remove from the assessments array
   *
   * @returns {LearningObject} the assessment plan which was removed
   */
  removeAssessment(i: number): AssessmentPlan {
    return this.assessments.splice(i, 1)[0];
  }

  /**
   * Adds a new, blank instructional strategy to this outcome.
   * @returns {InstructionalStrategy} a reference to the new strategy
   */
  addStrategy(): InstructionalStrategy {
    let strategy = new InstructionalStrategy(this);
    this.strategies.push(strategy);
    return strategy;
  }

  /**
   * Removes the outcome's i-th instructional strategy.
   * @param {number} i the index to remove from the strategies array
   *
   * @returns {LearningObject} the strategy which was removed
   */
  removeStrategy(i: number): InstructionalStrategy {
    return this.strategies.splice(i, 1)[0];
  }

  public static instantiate(
    source: LearningObject,
    object: LearningOutcomeProperties
  ): LearningOutcome {
    const obj = { ...object };
    const outcome = new LearningOutcome(source);
    outcome.assessments = obj.assessments
      ? obj.assessments.map(assessment =>
          AssessmentPlan.instantiate(outcome, assessment)
        )
      : outcome.assessments;
    outcome.strategies = obj.strategies
      ? obj.strategies.map(strategy =>
          InstructionalStrategy.instantiate(outcome, strategy)
        )
      : outcome.strategies;

    // Remove entities that required instantiation;
    delete obj.assessments;
    delete obj.strategies;

    // Copy over remaining props
    Object.keys(obj).forEach((key: string) => {
      outcome[key] = obj[key];
    });

    return outcome;
  }
}

export type LearningOutcomeProperties = {
  tag: number;
  bloom: string;
  verb: string;
  text: string;
  mappings: Outcome[];
  assessments: AssessmentPlanProperties[];
  strategies: InstructionalStrategyProperties[];
  [key: string]: any;
};
