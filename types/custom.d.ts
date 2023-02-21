import "styled-components";

declare global {
    var mongoose: {
        promise: Promise<Mongoose> | null;
        conn: Mongoose | null;
    };
}

export interface ITransitionState {
    TransitionState: TransitionStatus;
}

declare module "styled-components" {
    export interface DefaultTheme {
        space: {
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
        };
        colors: {
            primary: string;
            body: string;
            text: string;
            neutral1: string;
            neutral2: string;
            neutral3: string;
            danger: string;
            success: string;
        };
    }
}
