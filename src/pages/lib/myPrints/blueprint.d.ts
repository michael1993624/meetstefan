import { Model } from "./languageModels/openAI";
export declare enum ThoughtFramework {
    Introspective = 0,
    ReflectiveLP = 1
}
export interface Blueprint {
    name: string;
    essence: string;
    personality?: string;
    initialPlan?: string;
    thoughtFramework?: ThoughtFramework;
    languageProcessor: Model;
}
export declare const CONFIDANTE: Blueprint;
export declare const Blueprints: {
    SAMANTHA: Blueprint;
    STEFAN: Blueprint;
    CONFIDANTE: Blueprint;
};
