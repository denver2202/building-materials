import { HttpException } from '@nestjs/common';
import { ErrorCode } from '../enums/error-code';
export declare class GoogleRecaptchaException extends HttpException {
    readonly errorCodes: ErrorCode[];
    constructor(errorCodes: ErrorCode[], errorMessage?: string);
    private static getErrorMessage;
    private static getErrorStatus;
}
