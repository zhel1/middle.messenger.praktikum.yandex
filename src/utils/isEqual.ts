 // import {IProps} from "../core/Block";

type PlainObject<T = unknown> = {
    [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
    return isPlainObject(value) || isArray(value);
}

// function isEqual<T extends object>(lhs: { [index: string]: T }, rhs: { [index: string]: T }) {
//     if (Object.keys(lhs).length !== Object.keys(rhs).length) {
//         return false;
//     }
//
//     for (const [key, value] of Object.entries(lhs)) {
//         const rightValue = rhs[key];
//         if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
//             if (isEqual<IProps>(value as { [index: string]: IProps }, rightValue as { [index: string]: IProps })) {
//                 continue;
//             }
//             return false;
//         }
//
//         if (value !== rightValue) {
//             return false;
//         }
//     }
//
//     return true;
// }

function isEqual<T extends object>(lhs:  T , rhs: T ) {
    if (Object.keys(lhs).length !== Object.keys(rhs).length) {
        return false;
    }

    for (const [key, value] of Object.entries(lhs)) {
        const rightValue = rhs[key as keyof T];
        if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
            if (isEqual<object>(value as { [index: string | number | symbol]: object }, rightValue as { [index: string | number | symbol]: object })) {
                continue;
            }
            return false;
        }

        if (value !== rightValue) {
            return false;
        }
    }

    return true;
}


export default isEqual
