import Router from "../core/router.ts";
import {RoutesStrs} from "../core/config.ts";
import {TResult} from "../core/Http.ts";
import {ApiError} from "../models/IUser.ts";

export const responseHasError = (response: TResult<unknown>): response is TResult<ApiError> => {
    switch (response.status) {
        case 200:
            return false;
        case 500:
            Router.getRouter().go(RoutesStrs["500"]);
            return false;
        default: {
            return true//(response.data as { reason: string }).reason;
        }
    }
}
