export type Indexed<T = unknown> = {
    [key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (const p in rhs) {
        if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
            continue;
        }
        lhs[p] = rhs[p];
    }

    return lhs;
}
