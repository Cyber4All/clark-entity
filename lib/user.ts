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
    let user = new User(
      object._username ? object._username : object.username,
      object._name ? object._name : object.name,
      object._email ? object._email : object.email,
      object._organization ? object._organization : object.organization,
      object._password ? object._password : object.password
    );
    // Remove known props;
    delete object._username;
    delete object._name;
    delete object._email;
    delete object._organization;
    delete object._password;

    // Remove probable properties
    delete object.usernmae;
    delete object.name;
    delete object.email;
    delete object.organization;
    delete object.password;

    // Copy over injected props
    Object.keys(object).forEach((key: string) => {
      user[key] = object[key];
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
  [key: string]: any;
};
