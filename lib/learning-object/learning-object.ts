/**
 * Provide abstract representations for learning objects.
 */

import { User } from '../user/user';
import { LearningGoal } from '../learning-goal';
import { LearningOutcome } from '../learning-outcome/learning-outcome';
import { LEARNING_OBJECT_ERRORS } from './error-messages';

export enum Restriction {
  FULL = 'full',
  PUBLISH = 'publish',
  DOWNLOAD = 'download'
}
export type LearningObjectLock = {
  date?: string;
  restrictions: Restriction[];
};

/**
 * Provide abstract representations for Materials.
 */
export type Material = {
  files: File[];
  urls: Url[];
  notes: string;
  folderDescriptions: FolderDescription[];
  pdf: LearningObjectPDF;
};

export type LearningObjectPDF = {
  name: string;
  url: string;
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

  private _name!: string;
  /**
   * @property {string} name
   *       the object's identifying name, unique over a user
   *
   */
  get name(): string {
    return this._name;
  }

  set name(name: string) {
    // Condition is true if name is defined and the value returned from name.trim() is not an empty string
    // name.trim() is used to verify that name is not a string of whitespaces
    if (name !== undefined && name !== null && name.trim()) {
      this._name = name.trim();
      this.updateDate();
    } else {
      throw new Error(LEARNING_OBJECT_ERRORS.INVALID_NAME);
    }
  }

  private _description!: string;
  /**
   * @property {string} description
   *       description of the object's content
   *
   */
  get description(): string {
    return this._description;
  }
  set description(description: string) {
    if (description !== undefined && description !== null) {
      this._description = description.trim();
      this.updateDate();
    } else {
      throw new Error(LEARNING_OBJECT_ERRORS.INVALID_DESCRIPTION);
    }
  }

  private _date: string;
  /**
   * @property {string} date
   *       the object's last-modified date
   */
  get date(): string {
    return this._date;
  }

  /**
   * Updates LearningObject's last-modified date
   *
   * @private
   * @memberof LearningObject
   */
  private updateDate() {
    this._date = Date.now().toString();
  }

  private _length!: LearningObject.Length;
  /**
   * @property {string} length
   *       the object's class, determining its length (eg. module)
   *       values are restricted according to available lengths
   */
  get length(): LearningObject.Length {
    return this._length;
  }

  set length(length: LearningObject.Length) {
    if (this.isValidLength(length)) {
      this._length = length;
      this.updateDate();
    } else {
      throw new Error(LEARNING_OBJECT_ERRORS.INVALID_LENGTH(length));
    }
  }

  /**
   * Validates length
   *
   * @private
   * @param {LearningObject.Length} length
   * @returns {boolean}
   * @memberof LearningObject
   */
  private isValidLength(length: LearningObject.Length): boolean {
    const validLengths: LearningObject.Length[] = Object.keys(
      LearningObject.Length
    ).map(
      // @ts-ignore Keys are not numbers and element is of type Length
      (key: string) => LearningObject.Length[key] as LearningObject.Length
    );
    if (validLengths.includes(length)) {
      return true;
    }
    return false;
  }

  private _levels: LearningObject.Level[];
  /**
   * @property {string[]} levels
   *       this object's Academic Level. (ie K-12)
   */
  get levels(): LearningObject.Level[] {
    return this._levels;
  }

  /**
   * Adds new LearningObject.Level to array of levels if level is not present in this object's levels
   *
   * @memberof LearningObject
   */
  addLevel(level: LearningObject.Level) {
    const [alreadyAdded, isValid] = this.isValidLevel(level);
    if (!alreadyAdded && isValid) {
      this._levels.push(level);
      this.updateDate();
    } else if (alreadyAdded) {
      throw new Error(LEARNING_OBJECT_ERRORS.LEVEL_EXISTS(level));
    } else {
      throw new Error(LEARNING_OBJECT_ERRORS.INVALID_LEVEL(level));
    }
  }

  /**
   * Removes LearningObject.Level from this object's levels
   *
   * @param {number} index
   * @returns {LearningObject.Level}
   * @memberof LearningObject
   */
  removeLevel(index: number): LearningObject.Level {
    if (this.levels.length > 1) {
      this.updateDate();
      return this._levels.splice(index, 1)[0];
    } else {
      throw new Error(LEARNING_OBJECT_ERRORS.INVALID_LEVELS);
    }
  }

  /**
   * Validates level and checks if level has already been added
   *
   * @private
   * @param {LearningObject.Level} level
   * @returns {boolean}
   * @memberof LearningObject
   */
  private isValidLevel(level: LearningObject.Level): boolean[] {
    const validLevels: LearningObject.Level[] = Object.keys(
      LearningObject.Level
    ).map(
      // @ts-ignore Keys are not numbers and element is of type LearningObject.Level
      (key: string) => LearningObject.Level[key] as LearningObject.Level
    );
    const alreadyAdded = this.levels.includes(level);
    const isValid = validLevels.includes(level);
    if (!alreadyAdded && isValid) {
      return [alreadyAdded, isValid];
    }
    return [alreadyAdded, isValid];
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
  /**
   * Adds a new learning goal to this object.
   * Returns the index of the new goal
   *
   * @param {string} text
   * @returns {number}
   * @memberof LearningObject
   */
  addGoal(text: string): number {
    const goal = new LearningGoal(text);
    this.updateDate();
    return this._goals.push(goal) - 1;
  }
  /**
   * Removes the object's i-th learning goal.
   * @param {number} index the index to remove from this object's goals
   *
   * @returns {LearningGoal} the goal which was removed
   */
  removeGoal(index: number): LearningGoal {
    this.updateDate();
    return this._goals.splice(index, 1)[0];
  }

  private _outcomes: LearningOutcome[];
  /**
   * @property {LearningOutcome[]} outcomes
   *       outcomes this object should enable students to achieve
   *
   */
  get outcomes(): LearningOutcome[] {
    return this._outcomes;
  }
  /**
   * Adds a passed outcome or new, blank learning outcome to this object.
   * @returns {number} index of the outcome
   */
  addOutcome(outcome?: LearningOutcome): number {
    if (outcome && outcome instanceof LearningOutcome) {
      const addingOutcome = outcome || new LearningOutcome();
      this.updateDate();
      return this._outcomes.push(addingOutcome) - 1;
    } else {
      throw new Error(LEARNING_OBJECT_ERRORS.INVALID_OUTCOME);
    }
  }
  /**
   * Removes the object's i-th learning outcome.
   * @param {number} index the index to remove from this objects' outcomes
   *
   * @returns {LearningOutcome} the learning outcome which was removed
   */
  removeOutcome(index: number): LearningOutcome {
    this.updateDate();
    return this._outcomes.splice(index, 1)[0];
  }

  private _materials!: Material;
  /**
   * @property {Material} materials neutrino file/url storage
   *
   */
  get materials(): Material {
    return this._materials;
  }
  set materials(material: Material) {
    if (material) {
      this.updateDate();
      this._materials = material;
    } else {
      throw new Error(LEARNING_OBJECT_ERRORS.INVALID_MATERIAL);
    }
  }

  private _metrics!: Metrics;
  /**
   * @property {Metrics} metrics neutrino file/url storage
   *
   */
  get metrics(): Metrics {
    return this._metrics;
  }
  set metrics(metrics: Metrics) {
    if (metrics) {
      this._metrics = metrics;
    } else {
      throw new Error(LEARNING_OBJECT_ERRORS.INVALID_METRICS);
    }
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
   * Sets LearningObject's status to published and published flag to true
   *
   * @memberof LearningObject
   */
  publish(): void {
    this._published = true;
    this.updateDate();
  }
  /**
   * Sets LearningObject's published flag to false
   *
   * @memberof LearningObject
   */
  unpublish(): void {
    this._published = false;
    this.updateDate();
  }

  private _children: LearningObject[];
  get children(): LearningObject[] {
    return this._children;
  }

  /**
   * Adds LearningObject to this object's children
   *
   * @param {LearningObject} object
   * @returns {number} index of the child object
   * @memberof LearningObject
   */
  addChild(object: LearningObject): number {
    if (object) {
      this.updateDate();
      return this._children.push(object) - 1;
    } else {
      throw new Error(LEARNING_OBJECT_ERRORS.INVALID_CHILD);
    }
  }
  /**
   * Removes the object's i-th child.
   * @param {number} index the index to remove from this objects' children
   *
   * @returns {LearningObject} the child object which was removed
   */
  removeChild(index: number): LearningObject {
    this.updateDate();
    return this._children.splice(index, 1)[0];
  }

  private _contributors: User[];
  /**
   * @property {contributors} User[] array of Users
   *
   */
  get contributors(): User[] {
    return this._contributors;
  }

  /**
   * Adds User to this object's contributors
   *
   * @param {User} contributor
   * @returns {number} index of the contributor
   * @memberof LearningObject
   */
  addContributor(contributor: User): number {
    if (contributor) {
      this.updateDate();
      return this._contributors.push(contributor) - 1;
    } else {
      throw new Error(LEARNING_OBJECT_ERRORS.INVALID_CONTRIBUTOR);
    }
  }
  /**
   * Removes the object's i-th contributor.
   * @param {number} index the index to remove from this object's contributors
   *
   * @returns {User} the user object which was removed
   */
  removeContributor(index: number): User {
    this.updateDate();
    return this._contributors.splice(index, 1)[0];
  }

  private _lock?: LearningObjectLock;

  /**
   * @property {lock} LearningObjectLock
   *
   */
  get lock(): LearningObjectLock | undefined {
    return this._lock;
  }
  set lock(lock: LearningObjectLock | undefined) {
    this._lock = lock;
    this.updateDate();
  }
  private _collection!: string;
  /**
   * @property {collection} string the collection this object belongs to
   *
   */
  get collection(): string {
    return this._collection;
  }
  set collection(collection: string) {
    if (collection !== undefined && collection !== null) {
      this._collection = collection;
      this.updateDate();
    } else {
      throw new Error(LEARNING_OBJECT_ERRORS.INVALID_COLLECTION);
    }
  }

  private _status!: LearningObject.Status;
  /**
   * @property {status} Status Represents current state of Learning Object
   *
   */
  get status(): LearningObject.Status {
    return this._status;
  }
  set status(status: LearningObject.Status) {
    if (this.isValidStatus(status)) {
      this._status = status;
      if (this.status === LearningObject.Status.RELEASED) {
        this.publish();
      }
      this.updateDate();
    } else {
      throw new Error(LEARNING_OBJECT_ERRORS.INVALID_STATUS(status));
    }
  }

  /**
   * Validates status passed is a valid status
   *
   * @private
   * @param {LearningObject.Status} status
   * @returns {boolean}
   * @memberof LearningObject
   */
  private isValidStatus(status: LearningObject.Status): boolean {
    const validStatuses: LearningObject.Status[] = Object.keys(
      LearningObject.Status
    ).map(
      // @ts-ignore Keys are not numbers and element is of type Status
      (key: string) => LearningObject.Status[key] as LearningObject.Status
    );
    if (validStatuses.includes(status)) {
      return true;
    }
    return false;
  }

  /**
   *Creates an instance of LearningObject.
   * @param {Partial<LearningObject>} [object]
   * @memberof LearningObject
   */
  constructor(object?: Partial<LearningObject>) {
    this._author = new User('', '', '', '');
    this._name = '';
    this._description = '';
    this._date = Date.now().toString();
    this.length = LearningObject.Length.NANOMODULE;
    this._levels = [LearningObject.Level.Undergraduate];
    this._goals = [];
    this._outcomes = [];
    this.materials = {
      files: [],
      urls: [],
      notes: '',
      folderDescriptions: [],
      pdf: { name: '', url: '' }
    };
    this._children = [];
    this._contributors = [];
    this.collection = '';
    this.status = LearningObject.Status.UNRELEASED;
    this.metrics = { saves: 0, downloads: 0 };
    this._published = false;
    this.lock = undefined;

    if (object) {
      this.copyObject(object);
    }
  }

  /**
   * Copies properties of object to this learning object if defined
   *
   * @private
   * @param {Partial<LearningObject>} object
   * @memberof LearningObject
   */
  private copyObject(object: Partial<LearningObject>): void {
    this._author = <User>object.author || this.author;
    this.name = <string>object.name || this.name;
    this.description = <string>object.description || this.description;
    this._date = <string>object.date || this.date;
    this.length = <LearningObject.Length>object.length || this.length;
    if (object.levels) {
      (<LearningObject.Level[]>object.levels)
        .filter(level => !this.levels.includes(level))
        .map(level => this.addLevel(level));
    }
    if (object.goals) {
      (<LearningGoal[]>object.goals).map(goal => this.addGoal(goal.text));
    }
    if (object.outcomes) {
      (<LearningOutcome[]>object.outcomes).map(outcome =>
        this.addOutcome(outcome)
      );
    }
    this.materials = <Material>object.materials || this.materials;
    if (object.children) {
      (<LearningObject[]>object.children).map(child => this.addChild(child));
    }
    if (object.contributors) {
      (<User[]>object.contributors).map(contributor =>
        this.addContributor(contributor)
      );
    }
    this.collection = <string>object.collection || this.collection;
    this.status = <LearningObject.Status>object.status || this.status;
    this.metrics = <Metrics>object.metrics || this.metrics;
    this._published = <boolean>object.published || this.published;
    this.lock = <LearningObjectLock>object.lock || this.lock;
  }

  public static instantiate(object: Partial<LearningObject>): LearningObject {
    return new LearningObject(object);
  }
}

export namespace LearningObject {
  export enum Length {
    NANOMODULE = 'nanomodule',
    MICROMODULE = 'micromodule',
    MODULE = 'module',
    UNIT = 'unit',
    COURSE = 'course'
  }

  export enum Status {
    REJECTED = 'rejected',
    UNRELEASED = 'unreleased',
    WAITING = 'waiting',
    REVIEWED = 'reviewed',
    PROOFING = 'proofing',
    RELEASED = 'released'
  }

  export enum Level {
    Elementary = 'elementary',
    Middle = 'middle',
    High = 'high',
    Undergraduate = 'undergraduate',
    Graduate = 'graduate',
    PostGraduate = 'post graduate',
    CC = 'community college',
    Training = 'training'
  }
}
