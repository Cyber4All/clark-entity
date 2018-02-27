/**
 * Provide abstract representations for standard outcomes.
 */

import { Outcome } from './outcome';

/**
 * A class to represent a standard outcome. Immutable.
 * @class
 */
export class StandardOutcome implements Outcome {
  private _author: string;
  /**
   * @property {string} source
   *       the organization or document this outcome is drawn from
   */
  get author(): string {
    return this._author;
  }

  private _name: string;
  /**
   * @property {string} name the label or unit of the outcome
   */
  get name(): string {
    return this._name;
  }

  private _date: string;
  /**
   * @property {string} date the year this standard was established
   */
  get date(): string {
    return this._date;
  }

  private _outcome: string;
  /**
   * @property {string} outcome the text of the outcome
   */
  get outcome(): string {
    return this._outcome;
  }

  /**
   * Create a new StandardOutcome.
   * @param {string} author the new outcome's source
   * @param {string} name the new outcome's label
   * @param {string} outcome the new outcome's text
   */
  constructor(author: string, name: string, date: string, outcome: string) {
    (this._author = author), (this._name = name);
    this._date = date;
    this._outcome = outcome;
  }
}
