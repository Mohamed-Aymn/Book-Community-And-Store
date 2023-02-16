// declare global {
//     var mongoose: any;
// }

declare global {
    var mongoose: {
        promise: Promise<Mongoose> | null;
        conn: Mongoose | null;
    };
}

interface ITransitionState {
    TransitionState: TransitionStatus;
}
