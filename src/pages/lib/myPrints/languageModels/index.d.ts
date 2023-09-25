/**
 * Get the content of a tag in a response from OpenAI.
 */
export declare function getTag({ tag, input }: TagRecord): string;
/**
 * Stream the results of a chat completion, returning a stream of deltas
 */
export interface ChatCompletionStreamer {
    create: (opts: CreateChatCompletionParams) => Promise<{
        abortController: AbortController;
        stream: ChatStream;
    }>;
}
/**
 * Execute a language model program and get the results as a string (non-streaming)
 */
export interface LanguageModelProgramExecutor {
    execute(records: ChatMessage[]): Promise<string>;
}
/**
 * The below is mostly taken directly from the OpenAI types, but the idea is to keep these
 * stable between different LLMs and between different OpenAI versions.
 */
export declare enum ChatMessageRoleEnum {
    System = "system",
    User = "user",
    Assistant = "assistant",
    Function = "function"
}
export interface ChatMessage {
    role: ChatMessageRoleEnum;
    content: string;
    name?: string;
    function_call?: FunctionCall;
}
type ChatStream = AsyncIterable<StreamingChatCompletionEvent>;
type TagRecord = {
    tag: string;
    input: string;
};
export interface FunctionSpecification {
    /**
     * The name of the function to be called. Must be a-z, A-Z, 0-9, or contain
     * underscores and dashes, with a maximum length of 64.
     */
    name: string;
    /**
     * The description of what the function does.
     */
    description?: string;
    /**
     * The parameters the functions accepts, described as a JSON Schema object. See the
     * [guide](/docs/guides/gpt/function-calling) for examples, and the
     * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
     * documentation about the format.
     */
    parameters?: Record<string, unknown>;
}
export interface FunctionCall {
    /**
     * The arguments to call the function with, as generated by the model in JSON
     * format. Note that the model does not always generate valid JSON, and may
     * hallucinate parameters not defined by your function schema. Validate the
     * arguments in your code before calling your function.
     */
    arguments?: string;
    /**
     * The name of the function to call.
     */
    name?: string;
}
export interface StreamingDelta {
    /**
     * The contents of the chunk message.
     */
    content?: string | null;
    /**
     * The name and arguments of a function that should be called, as generated by the
     * model.
     */
    function_call?: FunctionCall;
    /**
     * The role of the author of this message.
     */
    role?: "system" | "user" | "assistant" | "function";
}
export interface StreamingChatCompletionEventChoices {
    delta?: StreamingDelta;
    finish_reason?: "stop" | "length" | "function_call";
    index?: number;
}
export interface StreamingChatCompletionEvent {
    choices: StreamingChatCompletionEventChoices[];
    created: number;
    id: string;
    model: string;
    object: string;
}
export interface FunctionSpecification {
    /**
     * The name of the function to be called. Must be a-z, A-Z, 0-9, or contain
     * underscores and dashes, with a maximum length of 64.
     */
    name: string;
    /**
     * The description of what the function does.
     */
    description?: string;
    /**
     * The parameters the functions accepts, described as a JSON Schema object. See the
     * [guide](/docs/guides/gpt/function-calling) for examples, and the
     * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
     * documentation about the format.
     */
    parameters?: Record<string, unknown>;
}
export interface CreateChatCompletionParams {
    /**
     * A list of messages comprising the conversation so far.
     * [Example Python code](https://github.com/openai/openai-cookbook/blob/main/examples/How_to_format_inputs_to_ChatGPT_models.ipynb).
     */
    messages: ChatMessage[];
    /**
     * Controls how the model responds to function calls. "none" means the model does
     * not call a function, and responds to the end-user. "auto" means the model can
     * pick between an end-user or calling a function. Specifying a particular function
     * via `{"name":\ "my_function"}` forces the model to call that function. "none" is
     * the default when no functions are present. "auto" is the default if functions
     * are present.
     */
    function_call?: "none" | "auto" | (FunctionCall & {
        name: string;
    });
    /**
     * A list of functions the model may generate JSON inputs for.
     */
    functions?: FunctionSpecification[];
    /**
     * The maximum number of [tokens](/tokenizer) to generate in the chat completion.
     *
     * The total length of input tokens and generated tokens is limited by the model's
     * context length.
     * [Example Python code](https://github.com/openai/openai-cookbook/blob/main/examples/How_to_count_tokens_with_tiktoken.ipynb)
     * for counting tokens.
     */
    max_tokens?: number;
    /**
     * A unique identifier representing your end-user, which can help OpenAI to monitor
     * and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
     */
    user?: string;
}
export {};
