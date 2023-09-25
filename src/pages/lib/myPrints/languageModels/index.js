"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessageRoleEnum = exports.getTag = void 0;
/**
 * Get the content of a tag in a response from OpenAI.
 */
function getTag({ tag, input }) {
    const regex = new RegExp(`<${tag}>(.*?)</${tag}>`, "is");
    const match = input.match(regex);
    return match ? match[1] : "";
}
exports.getTag = getTag;
/**
 * The below is mostly taken directly from the OpenAI types, but the idea is to keep these
 * stable between different LLMs and between different OpenAI versions.
 */
var ChatMessageRoleEnum;
(function (ChatMessageRoleEnum) {
    ChatMessageRoleEnum["System"] = "system";
    ChatMessageRoleEnum["User"] = "user";
    ChatMessageRoleEnum["Assistant"] = "assistant";
    ChatMessageRoleEnum["Function"] = "function";
})(ChatMessageRoleEnum = exports.ChatMessageRoleEnum || (exports.ChatMessageRoleEnum = {}));
