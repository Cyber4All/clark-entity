/**
 * Provide abstract representations for learning objects.
 */

import { User, UserProperties } from './user';
import { LearningGoal, LearningGoalProperties } from './learning-goal';
import { LearningOutcome, LearningOutcomeProperties } from './learning-outcome';
import { lengths } from '@cyber4all/clark-taxonomy';

/**
 * Provide abstract representations for Materials.
 */
export type Material = {
  files: File[];
  urls: Url[];
  notes: string;
  folderDescriptions: FolderDescription[];
};

export type File = {
  id: string;
  name: string;
  fileType: string;
  extension: string;
  url: string;
  date: string;
  fullPath?: string;
  size?: number;
  description?: string;
};

export type Url = {
  title: string;
  url: string;
};

export type FolderDescription = {
  path: string;
  description: string;
};

export type Metrics = {
  saves: number;
  downloads: number;
};

export enum AcademicLevel {
  K_12 = 'k-12',
  Undergraduate = 'undergraduate',
  Graduate = 'graduate',
  PostGraduate = 'post graduate',
  CC = 'community college',
  Training = 'training'
}

/**
 * A class to represent a learning object.
 * @class
 */
export class LearningObject {
  // Index Signature to allow extra properties;
  [key: string]: any;

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
   *       values are restricted according to available lengths
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
   * Sets Array of Academic Levels
   *
   * @memberof LearningObject
   */
  set levels(levels: AcademicLevel[]) {
    this._levels = levels;
  }
  /**
   * Adds new AcademicLevel to Array of levels if level is not present in the array
   *
   * @memberof LearningObject
   */
  addLevel(level: AcademicLevel) {
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

  private _metrics: Metrics;
  /**
   * @property {Metrics} metrics neutrino file/url storage
   *
   * TODO: extend constituents into full-fledged entities
   */
  get metrics(): Metrics {
    return this._metrics;
  }
  set metrics(metrics: Metrics) {
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

  private _children: LearningObject[];
  /**
   * Returns Array of Children Learning Objects
   *
   * @readonly
   * @type {LearningObject[]}
   * @memberof LearningObject
   */
  get children(): LearningObject[] {
    return this._children;
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
    this._length = <string>Array.from(lengths)[0];
    this._levels = [AcademicLevel.Undergraduate];
    this._goals = [];
    this._outcomes = [];
    this._materials = {
      files: [],
      urls: [],
      notes: '',
      folderDescriptions: []
    };
    this._metrics = { saves: 0, downloads: 0 };
    this._published = false;
    this._children = [];
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
  /**
   * Adds new child
   *
   * @param {string} name
   * @returns {LearningObject}
   * @memberof LearningObject
   */
  addChild(name: string): LearningObject {
    const child = new LearningObject(this._author, name);
    this._children.push(child);
    return child;
  }

  public static instantiate(object: LearningObjectProperties): LearningObject {
    const obj = { ...object };
    let author = User.instantiate(obj._author);
    let learningObject = new LearningObject(author, obj._name);

    learningObject._date = obj._date ? obj._date : obj.date;
    learningObject._length = obj._length ? obj._length : obj.length;
    learningObject._levels = obj._levels ? obj._levels : obj.levels;
    learningObject._goals = obj._goals
      ? obj._goals.map(goal => LearningGoal.instantiate(goal))
      : obj.goals.map((goal: LearningGoalProperties) =>
          LearningGoal.instantiate(goal)
        );
    learningObject._outcomes = obj._outcomes
      ? obj._outcomes.map(outcome =>
          LearningOutcome.instantiate(learningObject, outcome)
        )
      : obj.outcomes.map((outcome: LearningOutcomeProperties) =>
          LearningOutcome.instantiate(learningObject, outcome)
        );
    learningObject._materials = obj._materials ? obj._materials : obj.materials;
    learningObject._metrics = obj._metrics ? obj._metrics : obj.metrics;
    learningObject._published = obj._published ? obj._published : obj.published;
    learningObject._children = obj._children
      ? obj._children.map((child: LearningObjectProperties) =>
          LearningObject.instantiate(child)
        )
      : obj.children
        ? obj.children.map((child: LearningObjectProperties) =>
            LearningObject.instantiate(child)
          )
        : [];

    // Remove known props;
    delete obj._author;
    delete obj._name;
    delete obj._date;
    delete obj._length;
    delete obj._levels;
    delete obj._goals;
    delete obj._outcomes;
    delete obj._materials;
    delete obj._metrics;
    delete obj._published;
    delete obj._children;

    // Remove probable props;
    delete obj.author;
    delete obj.name;
    delete obj.date;
    delete obj.length;
    delete obj.levels;
    delete obj.goals;
    delete obj.outcomes;
    delete obj.materials;
    delete obj.metrics;
    delete obj.published;
    delete obj.children;

    // Copy over injected props
    Object.keys(obj).forEach((key: string) => {
      learningObject[key] = obj[key];
    });

    return learningObject;
  }
}

export type LearningObjectProperties = {
  _author: UserProperties;
  _name: string;
  _date: string;
  _length: string;
  _levels: AcademicLevel[];
  _goals: LearningGoalProperties[];
  _outcomes: LearningOutcomeProperties[];
  _materials: Material;
  _metrics: Metrics;
  _published: boolean;
  _children: LearningObjectProperties[];
  [key: string]: any;
};
