export interface ApiResponseInterface<T = undefined> {
    success: boolean;
    message: string;
    data?: T;
    errors?: ErrorsInterface[];
}

export interface ErrorsInterface {
    type: string;
    value: string;
    msg: string;
    path: string;
    location: string;
}

