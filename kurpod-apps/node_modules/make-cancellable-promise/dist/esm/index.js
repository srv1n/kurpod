export default function makeCancellablePromise(promise) {
    var isCancelled = false;
    var wrappedPromise = new Promise(function (resolve, reject) {
        promise
            .then(function (value) { return !isCancelled && resolve(value); })
            .catch(function (error) { return !isCancelled && reject(error); });
    });
    return {
        promise: wrappedPromise,
        cancel: function () {
            isCancelled = true;
        },
    };
}
