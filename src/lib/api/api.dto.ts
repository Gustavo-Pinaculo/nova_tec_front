export interface ResponseDTO {
    status: number;
    message: string;
    data: {
        count: number;
        results: any[];
        previous: string|null;
        next: string|null;
    };
}