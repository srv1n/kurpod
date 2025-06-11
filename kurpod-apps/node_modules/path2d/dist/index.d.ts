/**
 * Implements a browser's Path2D api
 * https://developer.mozilla.org/en-US/docs/Web/API/Path2D
 */
declare class Path2D implements IPath2D {
    commands: PathCommand[];
    constructor(path?: Path2D | string);
    addPath(path: Path2D): void;
    moveTo(x: number, y: number): void;
    lineTo(x: number, y: number): void;
    arc(x: number, y: number, r: number, start: number, end: number, ccw: boolean): void;
    arcTo(x1: number, y1: number, x2: number, y2: number, r: number): void;
    ellipse(x: number, y: number, rx: number, ry: number, angle: number, start: number, end: number, ccw: boolean): void;
    closePath(): void;
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
    rect(x: number, y: number, width: number, height: number): void;
    roundRect(x: number, y: number, width: number, height: number, radii?: number | number[]): void;
}
declare function buildPath(ctx: ICanvasRenderingContext2D, commands: PathCommand[]): void;

type Command = "M" | "m" | "L" | "l" | "H" | "h" | "V" | "v" | "A" | "a" | "C" | "c" | "S" | "s" | "Q" | "q" | "T" | "t" | "Z" | "z" | "AC" | "AT" | "E" | "R" | "RR";
type MovePathCommand = ["m" | "M", number, number];
type LinePathCommand = ["l" | "L", number, number];
type HorizontalPathCommand = ["h" | "H", number];
type VerticalPathCommand = ["v" | "V", number];
type ArcPathCommand = ["a" | "A", number, number, number, boolean, boolean, number, number];
type CurvePathCommand = ["c" | "C", number, number, number, number, number, number];
type ShortCurvePathCommand = ["s" | "S", number, number, number, number];
type QuadraticCurvePathCommand = ["q" | "Q", number, number, number, number];
type ShortQuadraticCurvePathCommand = ["t" | "T", number, number];
type ClosePathCommand = ["z" | "Z"];
type ArcCommand = ["AC", number, number, number, number, number, boolean];
type ArcToCommand = ["AT", number, number, number, number, number];
type EllipseCommand = ["E", number, number, number, number, number, number, number, boolean];
type RectCommand = ["R", number, number, number, number];
type RoundRectCommand = ["RR", number, number, number, number, number | number[]];
type GenericCommand = [Command, ...(number | boolean | number[])[]];
type CanvasFillRule = "nonzero" | "evenodd";
type PathCommand = MovePathCommand | LinePathCommand | HorizontalPathCommand | VerticalPathCommand | ArcPathCommand | CurvePathCommand | ShortCurvePathCommand | QuadraticCurvePathCommand | ShortQuadraticCurvePathCommand | ClosePathCommand | ArcCommand | ArcToCommand | EllipseCommand | RectCommand | RoundRectCommand | GenericCommand;
interface IPath2D {
    addPath(path: IPath2D): void;
    moveTo(x: number, y: number): void;
    lineTo(x: number, y: number): void;
    arc(x: number, y: number, r: number, start: number, end: number, ccw: boolean): void;
    arcTo(x1: number, y1: number, x2: number, y2: number, r: number): void;
    ellipse(x: number, y: number, rx: number, ry: number, angle: number, start: number, end: number, ccw: boolean): void;
    closePath(): void;
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
    rect(x: number, y: number, width: number, height: number): void;
    roundRect(x: number, y: number, width: number, height: number, radii: number | number[]): void;
}
interface ICanvasRenderingContext2D {
    beginPath(): void;
    save(): void;
    translate(x: number, y: number): void;
    rotate(angle: number): void;
    scale(x: number, y: number): void;
    restore(): void;
    moveTo(x: number, y: number): void;
    lineTo(x: number, y: number): void;
    arc(x: number, y: number, r: number, start: number, end: number, ccw: boolean): void;
    arcTo(x1: number, y1: number, x2: number, y2: number, r: number): void;
    ellipse(x: number, y: number, rx: number, ry: number, angle: number, start: number, end: number, ccw: boolean): void;
    closePath(): void;
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
    rect(x: number, y: number, width: number, height: number): void;
    isPointInPath(x: number, y: number, fillRule?: CanvasFillRule): boolean;
    isPointInPath(path: Path2D, x: number, y: number, fillRule?: CanvasFillRule): boolean;
    clip(fillRule?: CanvasFillRule): void;
    clip(path: Path2D, fillRule?: CanvasFillRule): void;
    fill(fillRule?: CanvasFillRule): void;
    fill(path: Path2D, fillRule?: CanvasFillRule): void;
    stroke(): void;
    stroke(path: Path2D): void;
    roundRect(x: number, y: number, width: number, height: number, radii: number | number[]): void;
}
interface ICanvasRenderingContext2DWithoutPath2D {
    beginPath(): void;
    save(): void;
    translate(x: number, y: number): void;
    rotate(angle: number): void;
    scale(x: number, y: number): void;
    restore(): void;
    moveTo(x: number, y: number): void;
    lineTo(x: number, y: number): void;
    arc(x: number, y: number, r: number, start: number, end: number, ccw: boolean): void;
    arcTo(x1: number, y1: number, x2: number, y2: number, r: number): void;
    ellipse(x: number, y: number, rx: number, ry: number, angle: number, start: number, end: number, ccw: boolean): void;
    closePath(): void;
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
    rect(x: number, y: number, width: number, height: number): void;
    isPointInPath(x: number, y: number, fillRule?: CanvasFillRule): boolean;
    clip(fillRule?: CanvasFillRule): void;
    fill(fillRule?: CanvasFillRule): void;
    stroke(): void;
    roundRect(x: number, y: number, width: number, height: number, radii: number | number[]): void;
}
type IPrototype<T> = {
    prototype: T;
    new (): T;
};
type PartialBy<T, K extends keyof T> = Omit<T, K> & {
    [P in K]?: T[P];
};
type CanvasRenderingContext2DProt = IPrototype<ICanvasRenderingContext2D>;

/**
 * Adds Path2D capabilities to CanvasRenderingContext2D stroke, fill and isPointInPath
 * @param global - window like object containing a CanvasRenderingContext2D constructor
 */
declare function applyPath2DToCanvasRenderingContext(CanvasRenderingContext2D?: IPrototype<ICanvasRenderingContext2DWithoutPath2D>): void;
/**
 * Polyfills roundRect on CanvasRenderingContext2D
 * @param CanvasRenderingContext2D - CanvasRenderingContext2D constructor object
 */
declare function applyRoundRectToCanvasRenderingContext2D(CanvasRenderingContext2D?: IPrototype<PartialBy<ICanvasRenderingContext2D, "roundRect">>): void;
/**
 * Polyfills roundRect on Path2D
 * @param Path2D - Path2D constructor object
 */
declare function applyRoundRectToPath2D(P2D?: IPrototype<PartialBy<IPath2D, "roundRect">>): void;

/**
 * parse an svg path data string. Generates an Array
 * of commands where each command is an Array of the
 * form `[command, arg1, arg2, ...]`
 *
 * https://www.w3.org/TR/SVG/paths.html#PathDataGeneralInformation
 * @ignore
 *
 * @param {string} path
 * @returns {array}
 */
declare function parsePath(path: string): PathCommand[];

declare function roundRect(this: IPath2D | ICanvasRenderingContext2D, x: number, y: number, width: number, height: number, radii?: number | number[]): void;

export { type ArcCommand, type ArcPathCommand, type ArcToCommand, type CanvasFillRule, type CanvasRenderingContext2DProt, type ClosePathCommand, type Command, type CurvePathCommand, type EllipseCommand, type GenericCommand, type HorizontalPathCommand, type ICanvasRenderingContext2D, type ICanvasRenderingContext2DWithoutPath2D, type IPath2D, type IPrototype, type LinePathCommand, type MovePathCommand, type PartialBy, Path2D, type PathCommand, type QuadraticCurvePathCommand, type RectCommand, type RoundRectCommand, type ShortCurvePathCommand, type ShortQuadraticCurvePathCommand, type VerticalPathCommand, applyPath2DToCanvasRenderingContext, applyRoundRectToCanvasRenderingContext2D, applyRoundRectToPath2D, buildPath, parsePath, roundRect };
