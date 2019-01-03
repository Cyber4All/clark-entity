/**
 * Provide an abstract representation for a CLARK user.
 */

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
    organization: string
  ) {
    this.username = username;
    this.name = name;
    this.email = email;
    this.organization = organization;
    this.bio = '';
    this.createdAt = '';
  }

  public static instantiate(object: any): User {
    const obj = { ...object };
    const user = new User(
      obj.username ? obj.username : '',
      obj.name ? obj.name : '',
      obj.email ? obj.email : '',
      obj.organization ? obj.organization : ''
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
