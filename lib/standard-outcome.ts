/**
 * Provide abstract representations for standard outcomes.
 */

import { Outcome } from './outcome';

/**
 * A class to represent a standard outcome. Immutable.
 * @class
 */
export class StandardOutcome implements Outcome {
  /**
   * @property {string} source
   *       the organization or document this outcome is drawn from
   */
  author: string;

  /**
   * @property {string} name the label or unit of the outcome
   */
  name: string;

  /**
   * @property {string} date the year this standard was established
   */
  date: string;

  /**
   * @property {string} outcome the text of the outcome
   */
  outcome: string;

  /**
   * Create a new StandardOutcome.
   * @param {string} author the new outcome's source
   * @param {string} name the new outcome's label
   * @param {string} outcome the new outcome's text
   */
  constructor(author: string, name: string, date: string, outcome: string) {
    this.author = author;
    this.name = name;
    this.date = date;
    this.outcome = outcome;
  }
}
