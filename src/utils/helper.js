// elementUI表单非空校验
export const validIsEmpty = ({rule, value, callback, errorText}) => {
    if (!value) {
        callback(new Error(errorText));
    } else {
        callback();
    }
};

// elementUI表单二次校验
export const validateAgain = ({rule, value, preValue, callback, errorText,errorTextAgain}) => {
    console.log('preValue',preValue,'value',value)
    if (!value) {
        callback(new Error(errorText));
    } else if (value !== preValue) {
        callback(new Error(errorTextAgain));
    } else {
        callback();
    }
};