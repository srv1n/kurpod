export default class Ref {
    num: number;
    gen: number;
    constructor({ num, gen }: {
        num: number;
        gen: number;
    });
    toString(): string;
}
