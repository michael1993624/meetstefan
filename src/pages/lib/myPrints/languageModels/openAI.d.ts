import OpenAI from "openai";
import { CompletionCreateParams } from "openai/dist/cjs/resources/chat";
import { ChatCompletionStreamer, ChatMessage, CreateChatCompletionParams, LanguageModelProgramExecutor } from ".";
export declare enum Model {
    GPT_4 = "gpt-4",
    GPT_3_5_turbo = "gpt-3.5-turbo",
    GPT_3_5_turbo_0613 = "gpt-3.5-turbo-0613",
    GPT_3_5_turbo_16k = "gpt-3.5-turbo-16k"
}
type Config = ConstructorParameters<typeof OpenAI>[0];
type StreamCompletionParams = Partial<CompletionCreateParams.CreateChatCompletionRequestStreaming>;
type DefaultStreamParams = StreamCompletionParams & {
    model: Model | string;
    stream: true;
};
export declare class OpenAIStreamingChat implements ChatCompletionStreamer {
    client: OpenAI;
    defaultParams: DefaultStreamParams;
    constructor(openAIConfig?: Config, defaultParams?: StreamCompletionParams);
    create(opts: CreateChatCompletionParams): Promise<{
        stream: import("openai/dist/cjs/core").APIResponse<import("openai/dist/cjs/streaming").Stream<import("openai/dist/cjs/resources/chat").ChatCompletionEvent>>;
        abortController: AbortController;
    }>;
}
type ChatCompletionParams = Partial<CompletionCreateParams.CreateChatCompletionRequestNonStreaming>;
type DefaultCompletionParams = ChatCompletionParams & {
    model: Model | string;
};
export declare class OpenAILanguageProgramProcessor implements LanguageModelProgramExecutor {
    client: OpenAI;
    defaultParams: DefaultCompletionParams;
    constructor(openAIConfig?: Config, defaultParams?: ChatCompletionParams);
    execute(messages: ChatMessage[]): Promise<string>;
}
export {};
