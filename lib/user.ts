/**
 * Provide an abstract representation for a Bloomin' Onion user.
 */

import { LearningObject } from './learning-object';

/**
 * A class to represent Bloomin' Onion users.
 * @class
 */
export class User {
    private _username: string;
    /**
     * @property {string} id a user's unique log-in username
     */
    get username(): string { return this._username; }
    set username(username: string) { this._username = username; }

    private _name: string;
    /**
     * @property {string} name a user's real-life name
     */
    get name(): string { return this._name; }
    set name(name: string) { this._name = name; }

    private _email: string;
    /**
     * @property {string} email a user's email on file
     */
    get email(): string { return this._email; }
    set email(email: string) { this._email = email; }

    private _pwd: string;
    /**
     * @property {string} pwdhash a user's password authentication
     */
    get pwd(): string { return this._pwd; }
    set pwd(pwd: string) { this._pwd = pwd; }

    private _objects: LearningObject[];
    /**
     * @property {LearningObject[]} objects (immutable)
     *       an array of a user's learning objects
     *
     * NOTE: individual elements are freely accessible, but the array
     *       reference itself is immutable, and elements can only be
     *       added and removed by the below functions
     */
    get objects(): LearningObject[] { return this._objects; }

    /**
     * Construct a new User, given starting user id and name.
     * @param {string} username the user's unique log-in username
     * @param {string} name the user's real-life name
     *
     * @constructor
     */
    constructor(username: string, name: string, email: string, pwd: string) {
        this._username = username;
        this._name = name;
        this._email = email;
        this._pwd = pwd;
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

    static serialize = function (entity: User): string {
        return JSON.stringify({
            username: entity.username,
            name: entity.name,
            email: entity.email,
            pwd: entity.pwd,
            objects: entity.objects.map(LearningObject.serialize),
        });
    };

    static unserialize = function (msg: string): User {
        let doc = JSON.parse(msg);
        let entity = new User(doc.username, doc.name, doc.email, doc.pwd);
        entity._objects = doc.objects.map((a: string) => {
            return LearningObject.unserialize(a);
        });
        return entity;
    };
}
