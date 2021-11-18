const isDevelopment = process.env.REACT_APP_IS_DEVELOPMENT ? process.env.REACT_APP_IS_DEVELOPMENT == 'true' : true;
const log = (...args: any[]) => {
    if (isDevelopment) {
        console.log(...args);
    } else {
        // Log somewhere else
    }
}

const error = (...args: any[]) => {
    if (isDevelopment) {
        console.error(...args);
    } else {
        // Log somewhere else
    }
}

const Logger = {
    log,
    error
}

export default Logger;