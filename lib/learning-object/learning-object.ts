/**
 * Provide abstract representations for learning objects.
 */

import { User, UserProperties } from '../user/user';
import { LearningGoal, LearningGoalProperties } from '../learning-goal';
import { LearningOutcome } from '../learning-outcome/learning-outcome';
import { lengths } from '@cyber4all/clark-taxonomy';

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

export enum AcademicLevel {
  Elementary = 'elementary',
  Middle = 'middle',
  High = 'high',
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

  /**
   * @property {User} author (immutable)
   *       the user this learning object belongs to
   */
  author: User;

  /**
   * @property {string} length
   *       the object's identifying name, unique over a user
   *
   * TODO: ensure uniqueness of name if author is not null
   */
  name: string;

  /**
   * @property {string} length
   *       the object's last-modified date
   * FIXME: if there's a reason to use an actual Date class
   */
  date: string;

  /**
   * @property {string} length
   *       the object's class, determining its length (eg. module)
   *       values are restricted according to available lengths
   */
  length: string;

  /**
   * @property {string[]} levels
   *       the array of the object's Academic Level. (ie K-12)
   */
  levels: AcademicLevel[];

  /**
   * Adds new AcademicLevel to Array of levels if level is not present in the array
   *
   * @memberof LearningObject
   */
  addLevel(level: AcademicLevel) {
    if (!this.levels.includes(level)) {
      this.levels.push(level);
    }
  }
  /**
   * Removes AcademicLevel from array of AcademicLevels
   *
   * @param {number} index
   * @returns {AcademicLevel}
   * @memberof LearningObject
   */
  removeLevel(index: number): AcademicLevel {
    return this.levels.splice(index, 1)[0];
  }

  /**
   * @property {LearningGoal[]} goals (immutable)
   *       goals this learning object should achieve
   *
   * NOTE: individual elements are freely accessible, but the array
   *       reference itself is immutable, and elements can only be
   *       added and removed by the below functions
   */
  goals: LearningGoal[];

  /**
   * @property {LearningOutcome[]} outcomes
   *       outcomes this object should enable students to achieve
   *
   */
  outcomes: LearningOutcome[];

  /**
   * @property {Material} materials neutrino file/url storage
   *
   * TODO: extend constituents into full-fledged entities
   */
  materials: Material;

  /**
   * @property {Metrics} metrics neutrino file/url storage
   *
   * TODO: extend constituents into full-fledged entities
   */
  metrics: Metrics;

  /**
   * @property {boolean} published
   *       Whether or not the Learning Object is published
   */
  published: boolean;

  /**
   * Sets LearningObject's published flag to true
   *
   * @memberof LearningObject
   */
  publish(): void {
    this.published = true;
  }
  /**
   * Sets LearningObject's published flag to false
   *
   * @memberof LearningObject
   */
  unpublish(): void {
    this.published = false;
  }

  children: LearningObject[] | string[];

  /**
   * @property {contributors} User[] array of Users
   *
   */
  contributors: User[];

  lock: LearningObjectLock | undefined;

  collection: string;
  /**
   * @property {status} string Represents current state of Learning Object
   *
   */
  status: string;

  /**
   * Adds a new learning goal to this object.
   *
   */
  addGoal(text: string): void {
    let goal = new LearningGoal(text);
    this.goals.push(goal);
  }

  /**
   * Removes the object's i-th learning goal.
   * @param {number} i the index to remove from the goals array
   *
   * @returns {LearningObject} the goal which was removed
   */
  removeGoal(i: number): LearningGoal {
    return this.goals.splice(i, 1)[0];
  }

  /**
   * Adds a new, blank learning outcome to this object.
   * @returns {AssessmentPlan} a reference to the new outcome
   */
  addOutcome(): LearningOutcome {
    let outcome = new LearningOutcome();
    this.outcomes.push(outcome);
    return outcome;
  }

  /**
   * Removes the object's i-th learning outcome.
   * @param {number} i the index to remove from the outcomes array
   *
   * @returns {LearningObject} the learning outcome which was removed
   */
  removeOutcome(i: number): LearningOutcome {
    return this.outcomes.splice(i, 1)[0];
  }

  /**
   * Construct a new, blank LearningOutcome.
   * @param {User} source the author the new object belongs to
   *
   * @constructor
   */
  constructor(author: User = new User('', '', '', '', ''), name: string = '') {
    this.author = author;
    this.name = name;
    this.date = Date.now().toString();
    this.length = <string>Array.from(lengths)[0];
    this.levels = [AcademicLevel.Undergraduate];
    this.goals = [];
    this.outcomes = [];
    this.materials = {
      files: [],
      urls: [],
      notes: '',
      folderDescriptions: [],
      pdf: { name: '', url: '' }
    };
    this.metrics = { saves: 0, downloads: 0 };
    this.published = false;
    this.children = [];
    this.contributors = [];
    this.lock = undefined;
    this.collection = '';
    this.status = '';
  }

  public static instantiate(object: LearningObjectProperties): LearningObject {
    const obj = { ...object };
    let author = User.instantiate(obj.author);
    let learningObject = new LearningObject(author, obj.name);

    learningObject.goals = obj.goals
      ? obj.goals.map(goal => LearningGoal.instantiate(goal))
      : learningObject.goals;
    learningObject.outcomes = obj.outcomes
      ? obj.outcomes.map((outcome: Partial<LearningOutcome>) =>
          LearningOutcome.instantiate(outcome)
        )
      : learningObject.outcomes;

    learningObject.children = obj.children
      ? obj.children
          .filter(
            (lo: LearningObjectProperties | string) => typeof lo !== 'string'
          )
          .map((child: LearningObjectProperties) =>
            LearningObject.instantiate(child)
          )
      : learningObject.children;

    learningObject.contributors = obj.contributors
      ? obj.contributors.map((user: UserProperties) => User.instantiate(user))
      : [];

    learningObject.lock = obj.lock ? obj.lock : obj.lock;

    // Remove Remove entities that required instantiation;;
    delete obj.goals;
    delete obj.outcomes;
    delete obj.children;
    delete obj.contributors;

    // Copy over injected props
    Object.keys(obj).forEach((key: string) => {
      learningObject[key] = obj[key];
    });

    return learningObject;
  }
}

export type LearningObjectProperties = {
  author: UserProperties;
  name: string;
  date: string;
  length: string;
  levels: AcademicLevel[];
  goals: LearningGoalProperties[];
  materials: Material;
  metrics: Metrics;
  published: boolean;
  children: LearningObjectProperties[];
  contributors: UserProperties[];
  lock: LearningObjectLock;
  [key: string]: any;
};
