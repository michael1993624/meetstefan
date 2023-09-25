"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAILanguageProgramProcessor = exports.OpenAIStreamingChat = exports.Model = void 0;
const openai_1 = __importDefault(require("openai"));
var Model;
(function (Model) {
    Model["GPT_4"] = "gpt-4";
    Model["GPT_3_5_turbo"] = "gpt-3.5-turbo";
    Model["GPT_3_5_turbo_0613"] = "gpt-3.5-turbo-0613";
    Model["GPT_3_5_turbo_16k"] = "gpt-3.5-turbo-16k";
})(Model = exports.Model || (exports.Model = {}));
class OpenAIStreamingChat {
    constructor(openAIConfig = {}, defaultParams = {}) {
        this.client = new openai_1.default(openAIConfig);
        this.defaultParams = {
            model: Model.GPT_3_5_turbo_16k,
            stream: true,
            ...defaultParams,
        };
    }
    async create(opts) {
        const stream = await this.client.chat.completions.create({
            ...this.defaultParams,
            ...opts,
        });
        return {
            stream,
            abortController: stream.controller,
        };
    }
}
exports.OpenAIStreamingChat = OpenAIStreamingChat;
class OpenAILanguageProgramProcessor {
    constructor(openAIConfig = {}, defaultParams = {}) {
        this.client = new openai_1.default(openAIConfig);
        this.defaultParams = {
            model: Model.GPT_3_5_turbo_16k,
            ...defaultParams,
            stream: false,
        };
    }
    async execute(messages) {
        const res = await this.client.chat.completions.create({
            ...this.defaultParams,
            messages: messages,
        });
        return res?.choices[0]?.message?.content || "";
    }
}
exports.OpenAILanguageProgramProcessor = OpenAILanguageProgramProcessor;
