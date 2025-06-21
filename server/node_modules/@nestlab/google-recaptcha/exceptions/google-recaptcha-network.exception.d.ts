import { GoogleRecaptchaException } from './google-recaptcha.exception';
export declare class GoogleRecaptchaNetworkException extends GoogleRecaptchaException {
    readonly networkErrorCode?: string;
    constructor(networkErrorCode?: string);
}
