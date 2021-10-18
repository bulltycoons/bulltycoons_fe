import { toast } from 'react-toastify';

export const moneyFormat = (rawMoney:(Number|String)) => {
    const re = /(\d)(?=(\d{3})+(?!\d))/g;
    return String(Number(rawMoney).toFixed(2)).replace(re, "$1,");
}


type ErrorType = {
    data?: {
        message?: String;
    };
    message?: String;
}

export const displayErrorMessage = (error:ErrorType, defaultMessage="An unknown error occurred") => {
    let { data, message=null } = error;
    if (message === null) {
        message = data?.message || null;
    }
    toast.error(message !== null ? message : defaultMessage);
}