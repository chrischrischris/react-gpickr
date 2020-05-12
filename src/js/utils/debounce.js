/**
 * Creates a debounced function that delays invoking func until after wait
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a cancel method to cancel delayed
 * func invocations.
 * @param {function} fn : function to debounce
 * @param {int} wait : number of ms to delay
 * @returns {function} : debounced function
 */
const debounce = (fn, wait) => {
    let timeout;

    const cancel = () => {
        if (timeout) {
            clearTimeout(timeout);
        }
    };

    // Return non-arrow func to preserve this context
    const debounceFunc = function debounceFunc(...args) {
        const functionCall = () => fn.apply(this, args);

        clearTimeout(timeout);
        timeout = setTimeout(functionCall, wait);
    };

    debounceFunc.cancel = cancel;

    return debounceFunc;
};

export default debounce;
