import { PortfolioItem } from "./portfolioitem.model";

export class Portfolio{
    shortDescription?:string;
    items?:PortfolioItem[];
    constructor(){
        this.shortDescription=null
        this.items=[]
    }
}