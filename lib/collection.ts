import { LearningObject } from './learning-object';
export interface Collection {
    name: string;
    learningObjects: LearningObject[];
}