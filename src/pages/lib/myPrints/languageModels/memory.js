"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thought = exports.Memory = void 0;
class Memory {
    constructor(memory) {
        this.memory = memory;
        this.memory.entity = this.memory.entity.replace(/[^a-zA-Z0-9_-]/g, "");
        this.memory.action = this.memory.action.toUpperCase();
    }
    isMessage() {
        return this.memory.action === "MESSAGES";
    }
    toString() {
        return `<${this.memory.action}>${this.memory.content}</${this.memory.action}>`;
    }
}
exports.Memory = Memory;
class Thought extends Memory {
}
exports.Thought = Thought;
