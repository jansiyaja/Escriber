

import { CustomError } from './CustomError';



export class BadRequestError extends CustomError {
    statusCode = 400;

    constructor(public message: string) {
        super(message);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeError() {
        return [{ message: this.message }];
    }
}
 

export class  InternalServerError extends CustomError{
    statusCode = 500;

    constructor(public message:string){
        super(message);
        Object.setPrototypeOf(this,InternalServerError.prototype);
    }
    serializeError() {
        return [{ message: this.message }];
    }
    
}