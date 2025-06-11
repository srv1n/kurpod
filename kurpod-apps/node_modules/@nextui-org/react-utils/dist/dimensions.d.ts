type ShapeType = {
    width: number;
    height: number;
};
declare const getCSSStyleVal: (str: string, parentNum: number) => number;
declare const getRealShape: (el: HTMLElement | null) => ShapeType;

export { ShapeType, getCSSStyleVal, getRealShape };
