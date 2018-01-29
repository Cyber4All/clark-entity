/**
 * Provide an abstract representation for a learning object's
 * learning goal.
 */
import { LearningObject } from './learning-object';

/**
 * A class to represent a learning object's learning goal.
 * @class
 */
export class LearningGoal {

    private _text: string;
    /**
     * @property {string} text text content of this learning goal
     */
    get text(): string { return this._text; }
    set text(text: string) { this._text = text; }

    /**
     * Construct a new Learning Goal with text.
     * @param {string} text the text of the new Learning Goal
     *
     * @constructor
     */
    constructor(text: string) {
        this._text = text;
    }
    static serialize = function (entity: LearningGoal): string {
        return JSON.stringify({
            text: entity.text,
        });
    };

    static unserialize = function (msg: string): LearningGoal {
        let doc = JSON.parse(msg);
        let entity = new LearningGoal(doc.text);
        return entity;
    };
}
