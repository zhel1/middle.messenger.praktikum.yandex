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

export const loadNewFileFromDrag = <TEvent>(evt: TEvent, name: string = 'avatar'): FormData | null => {
    let file = null;
    if (evt instanceof DragEvent){
        const dt = evt.dataTransfer;
        if (dt) {
            file = dt.files[0];
        }
    }

    if (evt instanceof Event) {
        const files = (evt.target as unknown as HTMLInputElement)?.files;
        if(files)file=files[0];
    }

    if (file) {
        const formData = new FormData();
        formData.append(name, file);
        return formData;
    }

    return null;
}

export const addActive=(e:Event)=>{
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLElement)?.classList.add('highlight');
}

export const removeActive=(e:Event)=>{
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLElement)?.classList.remove('highlight');
}