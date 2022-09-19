const app = require('./Application')

app
    .register()
    .then(() => {
        app.connect()
    })
    .catch(
        console.error
    )
