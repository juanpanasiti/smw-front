export interface HTTPValidationError {
    detail: ItemValidationError[];
}

export interface ItemValidationError {
    loc: string[];
    msg: string;
    type: string;
    // input: object;
    // url: string;
}

export interface ApiError {
    detail: string;
}
