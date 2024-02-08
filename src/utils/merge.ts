export type Indexed<T = unknown> = {
    [key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (let p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }
        lhs[p] = rhs[p];
    }

    return lhs;
}

// export function merge(lhs: Indexed, rhs: Indexed): Indexed {
//     for (let p in rhs) {
//         if (!rhs.hasOwnProperty(p)) {
//             continue;
//         }
//
//         try {
//             if ((rhs[p] as object).constructor === Object) {
//                 rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
//             } else {
//                 lhs[p] = rhs[p];
//             }
//         } catch(e) {
//             lhs[p] = rhs[p];
//         }
//     }
//
//     return lhs;
// }

