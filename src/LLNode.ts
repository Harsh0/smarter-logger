export class LLNode {
    _element: any;
    _next: LLNode | null;
    constructor(element: any) {
        this._element = element;
        this._next = null;
    }
}
