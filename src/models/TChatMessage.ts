import {TFile} from "./TFile.ts";

export interface TChatMessage {
    id: number;
    user_id: number;
    chat_id: number;
    time: string;
    type: string|'message'|'file';
    content: number | string;
    file?: TFile;
    main?: boolean;
    is_read?:boolean;
}
