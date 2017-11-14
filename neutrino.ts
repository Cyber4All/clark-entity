/**
 * Provide abstract representations for neutrino requirements.
 * 
 * TODO: LearningObjectFile and LearningObjectURL likely warrant
 *      their own files, and repository can probably just be in
 *      learning-object.ts (if it's needed at all).
 */
export interface Repository {
    files: LearningObjectFile[],
    urls: LearningObjectUrl[],
    notes: string
}

export interface LearningObjectFile {
    id: string,
    name: string,
    fileType: string,
    url: string,
    date: string
}

export interface LearningObjectUrl {
    title: string,
    url: string
}