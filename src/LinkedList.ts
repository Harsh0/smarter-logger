import { LLNode } from './LLNode';
export class LinkedList {
    _head: LLNode | null;
    _tail: LLNode | null;
    _size: number;

    constructor() {
        this._head = null;
        this._tail = null;
        this._size = 0;
    }

    get size() {
        return this._size;
    }

    addToTail(element: any) {
        // creates a new node
        const node = new LLNode(element);
        if (this._tail == null) {
            this._tail = node;
            this._head = node;
        } else {
            this._tail._next = node;
            this._tail = this._tail._next;
        }
        this._size++;
    }

    getHead() {
        if (this._head == null) {
            return null;
        }
        const head = this._head;
        this._head = this._head._next;
        if (this._tail === head) {
            this._tail = this._tail._next;
        }

        this._size--;
        return head._element;
    }
}
