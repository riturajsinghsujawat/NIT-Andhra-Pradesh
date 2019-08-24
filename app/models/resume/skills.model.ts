import { Language } from './languages.model';
import { Knowledge } from './knowledge.model';
import { SkillSet } from './skillset.model';

export class Skills {
    shortDescription?: string;
    skills?: SkillSet;
    language?: Language;
    knowledge?: Knowledge;
    constructor() {
        this.shortDescription = null;
        this.skills = Object.assign({}, new SkillSet());
        this.language = Object.assign({}, new Language());
        this.knowledge = Object.assign({}, new Knowledge());
    }
}
