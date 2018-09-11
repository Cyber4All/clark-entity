/**
 * Provide an abstract representation for a CLARK user.
 */

import { LearningObject } from './learning-object';

/**
 * A class to represent CLARK users.
 * @class
 */
export class User {
  // Index Signature to allow extra properties;
  [key: string]: any;

  private _username: string;
  /**
   * @property {string} id a user's unique log-in username
   */
  get username(): string {
    return this._username;
  }
  set username(username: string) {
    this._username = username;
  }

  private _name: string;
  /**
   * @property {string} name a user's real-life name
   */
  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }

  private _email: string;
  /**
   * @property {string} email a user's email on file
   */
  get email(): string {
    return this._email;
  }
  set email(email: string) {
    this._email = email;
  }

  private _organization: string;
  /**
   * @property {string} organization a user's associate organization
   */
  get organization(): string {
    return this._organization;
  }
  set organization(organization: string) {
    this._organization = organization;
  }

  private _password: string;
  /**
   * @property {string} password a user's password authentication
   */
  get password(): string {
    return this._password;
  }
  set password(password: string) {
    this._password = password;
  }

  private _objects: LearningObject[];
  /**
   * @property {LearningObject[]} objects (immutable)
   *       an array of a user's learning objects
   *
   * NOTE: individual elements are freely accessible, but the array
   *       reference itself is immutable, and elements can only be
   *       added and removed by the below functions
   */
  get objects(): LearningObject[] {
    return this._objects;
  }

  private _bio: string;
  /**
   * Returns User's Bio
   *
   * @type {string}
   * @memberof User
   */
  get bio(): string {
    return this._bio;
  }
  /**
   * Sets User's Bio
   *
   * @memberof User
   */
  set bio(bio: string) {
    this._bio = bio;
  }

  private _createdAt: string;
  /**
   * @property {string} createdAt timestamp of user entity creation
   */
  get createdAt(): string {
    return this._createdAt;
  }
  set createdAt(createdAt: string) {
    this._createdAt = createdAt;
  }

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
    this._username = username;
    this._name = name;
    this._email = email;
    this._organization = organization;
    this._password = password;
    this._objects = [];
    this._bio = '';
    this._createdAt = '';
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

  public static instantiate(object: UserProperties): User {
    const obj = { ...object };
    const user = new User(
      obj._username ? obj._username : obj.username,
      obj._name ? obj._name : obj.name,
      obj._email ? obj._email : obj.email,
      obj._organization ? obj._organization : obj.organization,
      obj._password ? obj._password : obj.password
    );
    user._bio = obj._bio ? obj._bio : obj.bio ? obj.bio : user.bio;
    user._createdAt = obj._createdAt
      ? obj._createdAt
      : obj.createdAt
        ? obj.createdAt
        : user.createdAt;

    // Remove known props;
    delete obj._username;
    delete obj._name;
    delete obj._email;
    delete obj._organization;
    delete obj._password;
    delete obj._bio;
    delete obj._createdAt;

    // Remove probable properties
    delete obj.username;
    delete obj.name;
    delete obj.email;
    delete obj.organization;
    delete obj.password;
    delete obj.bio;
    delete obj.createdAt;

    // Copy over injected props
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
