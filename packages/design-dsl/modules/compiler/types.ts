
export interface Node {
  type: 'tag',
  name: string;
  blockParameters?: string[];
  attribs?: {
    [key: string]: any;
  }
  children?: Node[];
}

export interface IVisitor {
  tagName: string;
  visit(walker: IOutput): void;
}


export interface IOutput {
  /**
   * Return the basename of the input file
   */
  getBaseName(): string;


  /**
   * Save some source code
   */
  save(source: string): void

  saveImport(importString: string): void;

  /**
   * Defers writing a string to source because it's dependant on someVar
   * child information. The required information is described as strings
   * in the reqs array. We store the cb function in the source which
   * can be called back later once the child nodes have been traversed.
   * at that point the deferred source can be replaced with static source
   */
  saveDeferred(reqs: string[], cb: (deps: string[]) => string): void

  /**
   * Element stuff
   */

  getRequirements(): string[];
  fullFillReq(req: string, source: string): void;

  getIdentifier(): string;


  getAttributes(): any;

  /**
   * Get final results
   */

   source: string;
}

export interface IAtomDb {
  elements: {
    [key: string]: {
      attributes: string[];
    }
  };

  byAttribute: {
    [key: string]: {
      [key: string]: string | number
    }
  }
}