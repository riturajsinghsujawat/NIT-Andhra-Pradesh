import { ExperienceItem } from './experienceitem.model';

export class Experience {
    years?: number;
    shortDescription?: string;
    items?: ExperienceItem[];
    constructor() {
        this.years = null;
        this.shortDescription = null;
        this.items = [];
    }
}
