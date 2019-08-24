import { Resume } from "./resume/resume.model";
import { Project } from "./project/project.model";

export class Request{
    docId : string;
    message : string;
    id_user : string;
    id_lead : string;
    project_title : string;
    type : string;
    pid : string;
    user? : Resume;
    project? : Project;
    status?: string;
    updatedOn : Date;
}