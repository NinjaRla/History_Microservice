const app = require('./app');
const PORT = process.env.PORT || 3070;

// LISTENER
app.listen(PORT, function () {
    console.log(
        `Running on port ${PORT}` +
            '; press Ctrl-C to terminate.'
    );
});