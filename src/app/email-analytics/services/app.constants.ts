export const URLS = {
    // baseUrl: 'http://localhost:8000/email',
    // baseUrlv2: 'http://localhost:8000/email/v2',
    baseUrl: 'http://127.0.0.1:8000/email',
    baseUrlv2: 'http://127.0.0.1:8000/email/v2',
}

export const SETTINGS = {
    defaultLimit: 10,
    defaultSkip: 0,
    timeoutDuration: 60000,  // Timeout duration in milliseconds
}

export const ERRORS = {
    timeoutError: 'Request timed out. Please try again later.',
    unknownFetchError: 'Unknown error has occured while fetching data. Please try again later.',
}

export const INTERVALS = {
    pollingInterval: 20000 // 120,000 miliseconds
}