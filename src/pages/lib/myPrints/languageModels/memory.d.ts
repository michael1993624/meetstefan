import { ChatMessageRoleEnum } from ".";
export interface IMemory {
    role: ChatMessageRoleEnum;
    entity: string;
    action: string;
    content: string;
}
export declare class Memory {
    memory: IMemory;
    constructor(memory: IMemory);
    isMessage(): boolean;
    toString(): string;
}
export declare class Thought extends Memory {
}
