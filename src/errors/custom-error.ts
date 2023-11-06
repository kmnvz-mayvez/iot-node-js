export abstract class CustomError extends Error {
    abstract statusCode: number;
  
    constructor(message: string) {
      super(message);
  
      // extends super class constructor
      Object.setPrototypeOf(this, CustomError.prototype);
    }
  
    abstract serializeErrors(): { message: string; field?: string }[];
  }
  