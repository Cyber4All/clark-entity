/**
 * Provide abstract representations for learning objects.
 */

import { User } from './user';
import { LearningGoal } from './learning-goal';
import { LearningOutcome } from './learning-outcome';
import { lengths } from '@cyber4all/clark-taxonomy';

/**
 * Provide abstract representations for Materials.
 */
export interface Material {
  files: File[];
  urls: Url[];
  notes: string;
}

export interface File {
  id: string;
  name: string;
  fileType: string;
  url: string;
  date: string;
}

export interface Url {
  title: string;
  url: string;
}

export interface Metric {
  saves: number;
}

export enum AcademicLevel {
  K_12 = 'k-12',
  Undergraduate = 'undergraduate',
  Graduate = 'graduate'
}

/**
 * A class to represent a learning object.
 * @class
 */
export class LearningObject {
  private _author: User;
  /**
   * @property {User} author (immutable)
   *       the user this learning object belongs to
   */
  get author(): User {
    return this._author;
  }

  private _name: string;
  /**
   * @property {string} length
   *       the object's identifying name, unique over a user
   *
   * TODO: ensure uniqueness of name if author is not null
   */
  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }

  private _date: string;
  /**
   * @property {string} length
   *       the object's last-modified date
   * FIXME: if there's a reason to use an actual Date class
   */
  get date(): string {
    return this._date;
  }
  set date(date: string) {
    this._date = date;
  }

  private _length: string;
  /**
   * @property {string} length
   *       the object's class, determining its length (eg. module)
   *       values are resetricted according to available lengths
   */
  get length(): string {
    return this._length;
  }
  set length(length: string) {
    if (lengths.has(length)) this._length = length;
    else throw length + ' is not a valid Learning Object class';
  }

  private _levels: AcademicLevel[];
  /**
   * @property {string[]} levels
   *       the array of the object's Academic Level. (ie K-12)
   */
  get levels(): AcademicLevel[] {
    return this._levels;
  }
  /**
   * Adds new AcademicLevel to Array of levels if level is not present in the array
   *
   * @memberof LearningObject
   */
  set addLevel(level: AcademicLevel) {
    if (!this._levels.includes(level)) this._levels.push(level);
  }
  /**
   * Removes AcademicLevel from array of AcademicLevels
   *
   * @param {number} index
   * @returns {AcademicLevel}
   * @memberof LearningObject
   */
  removeLevel(index: number): AcademicLevel {
    return this._levels.splice(index, 1)[0];
  }

  private _goals: LearningGoal[];
  /**
   * @property {LearningGoal[]} goals (immutable)
   *       goals this learning object should achieve
   *
   * NOTE: individual elements are freely accessible, but the array
   *       reference itself is immutable, and elements can only be
   *       added and removed by the below functions
   */
  get goals(): LearningGoal[] {
    return this._goals;
  }

  private _outcomes: LearningOutcome[];
  /**
   * @property {LearningOutcome[]} outcomes (immutable)
   *       outcomes this object should enable students to achieve
   *
   * NOTE: individual elements are freely accessible, but the array
   *       reference itself is immutable, and elements can only be
   *       added and removed by the below functions
   */
  get outcomes(): LearningOutcome[] {
    return this._outcomes;
  }

  private _materials: Material;
  /**
   * @property {Material} materials neutrino file/url storage
   *
   * TODO: extend constituents into full-fledged entities
   */
  get materials(): Material {
    return this._materials;
  }
  set materials(materials: Material) {
    this._materials = materials;
  }

  private _metrics: Metric;
  /**
   * @property {Metrics} metrics neutrino file/url storage
   *
   * TODO: extend constituents into full-fledged entities
   */
  get metrics(): Metric {
    return this._metrics;
  }
  set metrics(metrics: Metric) {
    this._metrics = metrics;
  }

  private _published: boolean;
  /**
   * @property {boolean} published
   *       Whether or not the Learning Object is published
   */
  get published(): boolean {
    return this._published;
  }
  /**
   * Sets LearningObject's published flag to true
   *
   * @memberof LearningObject
   */
  publish(): void {
    this._published = true;
  }
  /**
   * Sets LearningObject's published flag to false
   *
   * @memberof LearningObject
   */
  unpublish(): void {
    this._published = false;
  }

  /**
   * Construct a new, blank LearningOutcome.
   * @param {User} source the author the new object belongs to
   *
   * @constructor
   */
  constructor(author: User = new User('', '', '', '', ''), name: string = '') {
    this._author = author;
    this._name = name;
    this._date = Date.now().toString();
    this._length = Array.from(lengths)[0];
    this._levels = [AcademicLevel.Undergraduate];
    this._goals = [];
    this._outcomes = [];
    this._materials = {
      files: [],
      urls: [],
      notes: ''
    };
    this._metrics = {
      saves: 0
    };
    this._published = false;
  }

  /**
   * Adds a new learning goal to this object.
   *
   */
  addGoal(text: string): void {
    let goal = new LearningGoal(text);
    this._goals.push(goal);
  }

  /**
   * Removes the object's i-th learning goal.
   * @param {number} i the index to remove from the goals array
   *
   * @returns {LearningObject} the goal which was removed
   */
  removeGoal(i: number): LearningGoal {
    return this._goals.splice(i, 1)[0];
  }

  /**
   * Adds a new, blank learning outcome to this object.
   * @returns {AssessmentPlan} a reference to the new outcome
   */
  addOutcome(): LearningOutcome {
    let outcome = new LearningOutcome(this);
    this._outcomes.push(outcome);
    return outcome;
  }

  /**
   * Removes the object's i-th learning outcome.
   * @param {number} i the index to remove from the outcomes array
   *
   * @returns {LearningObject} the learning outcome which was removed
   */
  removeOutcome(i: number): LearningOutcome {
    return this._outcomes.splice(i, 1)[0];
  }
}
