
export const apiResponseFormat = (status_code: number, data: any, message: any, hint = null) => ({
    status_code,
    data,
    message,
    hint,
});