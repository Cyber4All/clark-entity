/**
 * Provide abstract representations for learning objects.
 */

import { User } from './user';
import { LearningGoal } from './learning-goal';
import { LearningOutcome } from './learning-outcome';
import { Repository } from './neutrino';
import { Metrics } from './metrics';
import { lengths } from '@cyber4all/clark-taxonomy';


/**
 * Scalar data appropriate for a CuBE.
 */
export interface ObjectSuggestion {
    id: any;    // do NOT have any database dependencies in entities
    author: string;
    length: string;
    name: string;
    date: string;
}

export enum AcademicLevel {
    K_12 = 'k-12',
    Undergraduate = 'undergraduate',
    Graduate = 'graduate',
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
    get author(): User { return this._author; }

    private _name: string;
    /**
     * @property {string} length
     *       the object's identifying name, unique over a user
     *
     * TODO: ensure uniqueness of name if author is not null
     */
    get name(): string { return this._name; }
    set name(name: string) { this._name = name; }

    private _date: string;
    /**
     * @property {string} length
     *       the object's last-modified date
     * FIXME: if there's a reason to use an actual Date class
     */
    get date(): string { return this._date; }
    set date(date: string) { this._date = date; }

    private _length: string;
    /**
     * @property {string} length
     *       the object's class, determining its length (eg. module)
     *       values are resetricted according to available lengths
     */
    get length(): string { return this._length; }
    set length(length: string) {
        if (lengths.has(length)) this._length = length;
        else throw length + ' is not a valid Learning Object class';
    }

    private _level: string[];
    /**
     * @property {string[]} level
     *       the object's Academic Level. (ie K-12)
     */
    get level(): string[] { return this._level; }
    set level(level: string[]) {
        this._level = level;
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
    get goals(): LearningGoal[] { return this._goals; }

    private _outcomes: LearningOutcome[];
    /**
     * @property {LearningOutcome[]} outcomes (immutable)
     *       outcomes this object should enable students to achieve
     *
     * NOTE: individual elements are freely accessible, but the array
     *       reference itself is immutable, and elements can only be
     *       added and removed by the below functions
     */
    get outcomes(): LearningOutcome[] { return this._outcomes; }

    private _repository: Repository;
    /**
     * @property {Repository} repository neutrino file/url storage
     *
     * TODO: extend constituents into full-fledged entities
     */
    get repository(): Repository { return this._repository; }
    set repository(repository: Repository) { this._repository = repository; }

    private _metrics: Metrics;
    /**
     * @property {Metrics} metrics neutrino file/url storage
     *
     * TODO: extend constituents into full-fledged entities
     */
    get metrics(): Metrics { return this._metrics; }
    set metrics(metrics: Metrics) { this._metrics = metrics; }

    private _published: boolean;
    /**
     * @property {boolean} published
     *       Whether or not the Learning Object is published
     */
    get published(): boolean { return this._published; }
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
     * TODO: current constructor parameters (author required, name optional)
     *       are in place for reverse compatibility, but actually they should
     *       be backwards (name required, author optional [default to null])
     * TODO: constructor should confirm uniqueness of name if author is not null
     *
     * @constructor
     */
    constructor(author: User = new User('', '', '', '', ''), name: string = '') {
        this._author = author;
        this._name = name;
        this._date = Date.now().toString();
        this._length = Array.from(lengths)[0];
        this._level = [AcademicLevel.Undergraduate];
        this._goals = [];
        this._outcomes = [];
        this.repository = {
            files: [],
            urls: [],
            notes: '',
        };
        this._metrics = {
            downloads: 0
        }
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

    static serialize = function (entity: LearningObject): string {
        return JSON.stringify({
            author: User.serialize(entity.author),
            name: entity.name,
            date: entity.date,
            length: entity.length,
            level: entity.level,
            goals: entity.goals.map(goal => LearningGoal.serialize(goal)),
            outcomes: entity.outcomes.map(LearningOutcome.serialize),
            repository: entity.repository,
            published: entity.published,
            metrics: entity.metrics
        });
    };

    static unserialize = function (msg: string): LearningObject {
        let doc = JSON.parse(msg);
        let entity = new LearningObject(User.unserialize(doc.author), doc.name);
        entity._date = doc.date;
        entity._length = doc.length;
        entity._level = doc.level;
        entity._goals = doc.goals.map((goal: string) => LearningGoal.unserialize(goal));
        entity._outcomes = doc.outcomes.map((a: string) => {
            return LearningOutcome.unserialize(a, entity);
        });
        entity._repository = doc.repository;
        entity._published = doc.published;
        entity._metrics = doc.metrics;
        return entity;
    };
}
