/**
 * A class to represent CLARK users.
 * @class
 */
export class User {
  _username: string;
  /**
   * @property {string} username a user's unique log-in username
   */
  get username(): string {
    return this._username;
  }

  _name: string;
  /**
   * @property {string} name a user's real-life name
   */
  get name(): string {
    return this._name;
  }
  set name(name: string) {
    if (name && name.trim()) {
      this._name = name.trim();
    }
  }

  _email: string;
  /**
   * @property {string} email a user's email on file
   */
  get email(): string {
    return this._email;
  }
  set email(email: string) {
    if (email) {
      this._email = email;
    }
  }

  _emailVerified: boolean;
  /**
   * @property {boolean} emailVerified a user's email on file
   */
  get emailVerified(): boolean {
    return this._emailVerified;
  }
  set emailVerified(emailVerified: boolean) {
    if (emailVerified) {
      this._emailVerified = emailVerified;
    }
  }

  _organization: string;
  /**
   * @property {string} organization a user's associate organization
   */
  get organization(): string {
    return this._organization;
  }
  set organization(organization: string) {
    if (organization && organization.trim()) {
      this._organization = organization;
    }
  }

  _bio: string;
  /**
   * @property {string} bio a user's bio
   */
  get bio(): string {
    return this._bio;
  }
  set bio(bio: string) {
    if (bio) {
      this._bio = bio.trim();
    }
  }
  /**
   * @property {string} createdAt timestamp of user entity creation
   */
  _createdAt: string;
  get createdAt(): string {
    return this._createdAt;
  }

  /**
   *Creates an instance of User.
   * @param {Partial<User>} [user]
   * @memberof User
   */
  constructor(user?: Partial<User>) {
    this._username = '';
    this._name = '';
    this._email = '';
    this._emailVerified = false;
    this._organization = '';
    this._bio = '';
    this._createdAt = Date.now().toString();
    if (user) {
      this.copyUser(user);
    }
  }

  /**
   * Copies properties of user to this user if defined
   *
   * @private
   * @param {Partial<User>} user
   * @memberof User
   */
  private copyUser(user: Partial<User>): void {
    this._username = user.username || this.username;
    this.name = user.name || this.name;
    if (user.email) {
      this.email = <string>user.email;
    }
    this._emailVerified = user.emailVerified || this.emailVerified;
    this.organization = user.organization || this.organization;
    this.bio = user.bio || this.bio;
    this._createdAt = user.createdAt || this.createdAt;
  }
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
