import * as fs from "fs";
//import SearchElement from './SearchElement';

type ElementType = "and" | "or" | "base";

type ColorGradient = {
  color1: String;
  color2: String;
};

export type Color = ColorGradient | undefined;

export type ContentArray = Array<SearchElement>;

export type BaseContent = SearchWidget;

type Content = ContentArray | BaseContent | null;

interface DisplayWidget {
  phoneme: String;
  color: Color;
}

interface SearchWidget extends DisplayWidget {}

export interface SearchElement {
  getContent(): any;
  setContent(e: any): any;
  readonly elementType: ElementType;
  readonly content: any;
  getElementType(): ElementType;
  acceptAnd(e: SearchElement): SearchElement;
  acceptOr(e: SearchElement): SearchElement;
  acceptBase(e: SearchElement): SearchElement;
  accept(e: SearchElement): SearchElement;
  addAndConnection(i: any): any;
}

interface BaseElementInterface extends SearchElement {
  readonly content: BaseContent;
  setContent(e: BaseContent): void;
  getContent(): BaseContent;
  //removeElement(e: SearchElement): null;
}

interface AndOrElementInterface extends SearchElement {
  readonly content: ContentArray;
  setContent(e: ContentArray): void;
  getContent(): ContentArray;
  addAndConnection(i: Number): SearchElement;
  //removeElement(e: SearchElement): Content;
}

export type SearchBar = ContentArray;

export interface DisplayText extends Array<BaseElement> {};

function orOrBase(e: ContentArray): SearchElement {
  if (e.length === 1) {
    return new BaseElement(e[0].getContent());
  } else {
    return new OrElement(e.map((c) => c.getContent()));
  }
}

export class BaseElement implements BaseElementInterface {
  constructor(content: SearchWidget) {
    this.content = content;
    this.elementType = "base";
  }
  elementType: "base";
  content: BaseContent;
  acceptAnd(e: AndOrElementInterface): AndOrElementInterface {
    const returnArray: ContentArray = [];
    const ca1 = e.getContent();
    returnArray.push(this.accept(ca1[0]));
    returnArray.push(...ca1.slice(1));
    return new AndElement(returnArray);
  }
  acceptOr(e: AndOrElementInterface): AndOrElementInterface {
    const or0: ContentArray = [this];
    const ca1 = e.getContent();
    or0.push(...ca1);
    return new OrElement(or0);
  }
  acceptBase(e: BaseElementInterface): AndOrElementInterface {
    const or0: ContentArray = [this];
    or0.push(e);
    return new OrElement(or0);
  }
  accept(e: SearchElement): SearchElement {
    if (e.getElementType() === "and") {
      return this.acceptAnd(e);
    } else if (e.getElementType() === "or") {
      return this.acceptOr(e);
    } else {
      return this.acceptBase(e);
    }
  }
  setContent(e: BaseContent): void {
    this.content = e;
  }
  getContent(): BaseContent {
    return this.content;
  }
  getElementType(): ElementType {
    return this.elementType;
  }
  addAndConnection(i: any) {
    return null;
  }
}

class OrElement implements AndOrElementInterface {
  constructor(content: ContentArray) {
    this.content = content;
    this.elementType = "or";
  }
  elementType: "or";
  content: ContentArray;
  acceptAnd(e: AndOrElementInterface): AndOrElementInterface {
    const returnArray: ContentArray = [];
    const ca1 = e.getContent();
    returnArray.push(this.accept(ca1[0]));
    returnArray.push(...ca1.slice(1));
    return new AndElement(returnArray);
  }
  acceptOr(e: AndOrElementInterface): AndOrElementInterface {
    const or0: ContentArray = this.getContent();
    const ca1 = e.getContent();
    or0.push(...ca1);
    return new OrElement(or0);
  }
  acceptBase(e: BaseElementInterface): AndOrElementInterface {
    const or0: ContentArray = this.getContent();
    const ca1 = e.getContent();
    or0.push(new BaseElement(ca1));
    return new OrElement(this.getContent());
  }
  accept(e: SearchElement): SearchElement {
    if (e.getElementType() === "and") {
      return this.acceptAnd(e);
    } else if (e.getElementType() === "or") {
      return this.acceptOr(e);
    } else {
      return this.acceptBase(e);
    }
  }
  addAndConnection(i: number): SearchElement {
    const returnArray: ContentArray = [];
    const or0: ContentArray = this.getContent();
    const or1 = orOrBase(or0.slice(0, i));
    const or2 = orOrBase(or0.slice(i));
    returnArray.push(or1);
    returnArray.push(or2);
    return new AndElement(returnArray);
  }
  setContent(e: ContentArray): void {
    this.content = e;
  }
  getContent(): ContentArray {
    return this.content;
  }
  getElementType(): ElementType {
    return this.elementType;
  }
}

class AndElement implements AndOrElementInterface {
  constructor(content: ContentArray) {
    this.content = content;
    this.elementType = "and";
  }
  elementType: "and";
  content: ContentArray;
  acceptAnd(e: AndOrElementInterface): AndOrElementInterface {
    const returnArray: ContentArray = [];
    const ca0 = this.getContent();
    const ca1 = e.getContent();
    const or0 = ca0[ca0.length - 1];
    returnArray.push(...ca0.slice(0, -1));
    //console.log('test 1');
    //console.log(returnArray);
    if (or0) {
      returnArray.push(or0.accept(ca1[0]));
    }
    //console.log('test 2');
    //console.log(returnArray);
    returnArray.push(...ca1.slice(1));
    //console.log('test 3');
    //console.log(returnArray);
    return new AndElement(returnArray);
  }
  acceptOr(e: AndOrElementInterface): AndOrElementInterface {
    const returnArray: ContentArray = [];
    const ca0 = this.getContent();
    const ca1 = e.getContent();
    const or0 = ca0[ca0.length - 1];
    returnArray.push(...ca0.slice(0, -1));
    if (or0) {
      returnArray.push(or0.accept(ca1[0]));
    }
    return new AndElement(returnArray);
  }
  acceptBase(e: BaseElementInterface): AndOrElementInterface {
    const returnArray: ContentArray = [];
    const ca0 = this.getContent();
    const ca1 = e;
    const or0 = ca0[ca0.length - 1];
    returnArray.push(...ca0.slice(0, -1));
    returnArray.push(or0.accept(ca1));
    return new AndElement(returnArray);
  }
  addAndConnection(i: number): SearchElement {
    let j = 0;
    let iLen = 0;
    let modEl: SearchElement = new BaseElement({
      phoneme: "",
      color: { color1: "", color2: "" },
    });
    while (iLen < i) {
      modEl = this.getContent()[j];
      j++;
      iLen += modEl.getContent().length;
    }
    const returnArray: ContentArray = [];
    const or0: ContentArray = [];
    j = i - iLen;
    or0.push(modEl.getContent().split());
    const or1 = orOrBase(or0.slice(0, j));
    const or2 = orOrBase(or0.slice(j));
    returnArray.push(or1);
    returnArray.push(or2);
    return new AndElement(returnArray);
  }
  accept(e: SearchElement): SearchElement {
    if (e.getElementType() === "and") {
      return this.acceptAnd(e);
    } else if (e.getElementType() === "or") {
      return this.acceptOr(e);
    } else {
      return this.acceptBase(e);
    }
  }
  setContent(e: ContentArray): void {
    this.content = e;
  }
  getContent(): ContentArray {
    return this.content;
  }
  getElementType(): ElementType {
    return this.elementType;
  }
}

export default { BaseElement, OrElement, AndElement };

//async function main() {
//const test = new BaseElement({phoneme: 'a', color: {color1: '', color2: ''}});
//const test2 = test.acceptBase(test); // a or a
//const test3 = test2.addAndConnection(1); // a and a
//const test4 = test.acceptAnd(test3); // (a or a) and (a)
//const test5 = test3.acceptAnd(test4); // (a or a or a) and (a) // (a) and (a or a) and (a)
//const test6 = test5.acceptAnd(test4); // (a) and (a or a) and (a) and (a or a) and (a)
//console.log(test3);
//console.log(test3.getContent()[0].getContent());
//console.log(test3.getContent()[1].getContent());
//console.log(JSON.stringify(test));
//console.log(JSON.stringify(test2));
//console.log(JSON.stringify(test3));
//console.log(JSON.stringify(test4));
//console.log(JSON.stringify(test5));
//console.log(JSON.stringify(test6));
//let someText = fs.readFileSync('../../tests/test1.json','utf8');
//console.log(JSON.stringify(JSON.parse(someText)));
//(JSON.stringify(test5) === JSON.stringify(JSON.parse(someText))) ? console.log('Good!') : console.log('Failed')
//console.log(test4.getContent()[1]);
//console.log(test4.getElementType());
//console.log(test3.getContent());
//}

//main();
