/**
 * Provide an abstract representation for a learning outcome's
 * instructional strategy.
 */

import { LearningOutcome } from './learning-outcome';
import { levels, instructions } from '@cyber4all/clark-taxonomy';

/**
 * A class to represent a learning outcome's instructional strategy.
 * @class
 */
export class InstructionalStrategy {
    private _sourceBloom: string;
    /**
     * @property {string} sourceBloom (immutable)
     *       the outcome's bloom taxon this assessment plan belongs to
     */
    get sourceBloom(): string { return this._sourceBloom; }

    private _instruction: string;
    /**
     * @property {string} instruction
     *       the class of this instructional strategy (eg. lecture)
     *       values are resetricted according to source's bloom taxon
     */
    get instruction(): string { return this._instruction; }
    set instruction(instruction: string) {
        if (instructions[this._sourceBloom].has(instruction)) {
            this._instruction = instruction;
        } else {
            throw instruction + ' is not a valid instructional strategy for the ' + this._sourceBloom + ' taxon';
        }
    }

    private _text: string;
    /**
     * @property {string} text
     *       full text description of this instructional strategy
     */
    get text(): string { return this._text; }
    set text(text: string) { this._text = text; }

    /**
     * Construct a new, blank InstructionalStrategy.
     * @param {LearningOutcome} source the learning outcome
     *       the new instructional strategy belongs to
     *
     * @constructor
     */
    constructor(source: LearningOutcome) {
        this._sourceBloom = source.bloom;
        this._instruction = Array.from(instructions[source.bloom])[0];
        this._text = '';
    }

    static serialize = function (entity: InstructionalStrategy): string {
        return JSON.stringify({
            instruction: entity.instruction,
            text: entity.text,
        });
    };

    static unserialize = function (msg: string, parent: LearningOutcome): InstructionalStrategy {
        let doc = JSON.parse(msg);
        let entity = new InstructionalStrategy(parent);
        entity._instruction = doc.instruction;
        entity._text = doc.text;
        return entity;
    };
}
