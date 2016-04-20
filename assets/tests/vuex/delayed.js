/**
 Helper function for testing asynchronous code

 Calls `setup` callback, then returns a promise that will resolve in `delay`
 milliseconds (default: 200).

 After the delay, `wrapup` callback is called.
 */
function delayed(setup, wrapup, delay=200) {
    const promise = new Promise(function(resolve) {
        setup();
        setTimeout(resolve, delay);
    }).then(wrapup);

    return promise;
}

export default delayed;
