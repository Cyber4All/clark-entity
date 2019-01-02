/**
 * Provide an abstract representation for a CLARK user.
 */

import { LearningObject } from '../learning-object/learning-object';

/**
 * A class to represent CLARK users.
 * @class
 */
export class User {
  // Index Signature to allow extra properties;
  [key: string]: any;
  /**
   * @property {string} id a user's unique log-in username
   */
  username: string;

  /**
   * @property {string} name a user's real-life name
   */
  name: string;

  /**
   * @property {string} email a user's email on file
   */
  email: string;

  /**
   * @property {string} organization a user's associate organization
   */
  organization: string;

  /**
   * @property {string} password a user's password authentication
   */
  password: string;

  /**
   * @property {LearningObject[]} objects (immutable)
   *       an array of a user's learning objects
   *
   * NOTE: individual elements are freely accessible, but the array
   *       reference itself is immutable, and elements can only be
   *       added and removed by the below functions
   */
  objects: LearningObject[];

  /**
   * Returns User's Bio
   *
   * @type {string}
   * @memberof User
   */
  bio: string;

  /**
   * @property {string} createdAt timestamp of user entity creation
   */
  createdAt: string;

  /**
   * Construct a new User, given starting user id and name.
   * @param {string} username the user's unique log-in username
   * @param {string} name the user's real-life name
   *
   * @constructor
   */
  constructor(
    username: string,
    name: string,
    email: string,
    organization: string,
    password: string
  ) {
    this.username = username;
    this.name = name;
    this.email = email;
    this.organization = organization;
    this.password = password;
    this.objects = [];
    this.bio = '';
    this.createdAt = '';
  }

  /**
   * Adds a new, blank learning object to this user.
   * @returns {LearningObject} a reference to the new learning object
   */
  addObject(): LearningObject {
    let object = new LearningObject(this, '');
    this._objects.push(object);
    return object;
  }

  /**
   * Removes the user's i-th learning object.
   * @param {number} i the index to remove from the objects array
   *
   * @returns {LearningObject} the learning object which was removed
   */
  removeObject(i: number): LearningObject {
    return this._objects.splice(i, 1)[0];
  }

  public static instantiate(object: any): User {
    const obj = { ...object };
    const user = new User(
      obj.username ? obj.username : '',
      obj.name ? obj.name : '',
      obj.email ? obj.email : '',
      obj.organization ? obj.organization : '',
      obj.password ? obj.password : ''
    );
    // Copy over props not in constructor
    Object.keys(obj).forEach((key: string) => {
      user[key] = obj[key];
    });

    return user;
  }
}

export type UserProperties = {
  _username: string;
  _name: string;
  _email: string;
  _organization: string;
  _password: string;
  _bio: string;
  _createdAt: string;
  [key: string]: any;
};
