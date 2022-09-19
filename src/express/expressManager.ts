const express = require('express')
export {}


class ExpressManager {
    private app: any;
    private express: typeof express;
    private router: typeof express.Router;
    constructor(app) {
        this.app = app
        this.express = express()
        this.router = express.Router()
    }

    initialize() {

        this.router.get('/keepAlive', this.keepAlive.bind(this))

        this.express.use(express.json(), express.urlencoded({ extended: false }), this.authenticate.bind(this), this.validateBody.bind(this))
        this.express.use('/api', this.router)
        this.express.set('json spaces', 2)

        this.express.listen(this.app.config.properties.express.port, () => {
            this.app.log.express(`API online and is running on http://localhost:${this.app.config.properties.express.port}/api/`)
        })
    }

    keepAlive(request, response) {
        return response.status(200).json({
            success: true,
            response: 'Still alive'
        })
    }

    authenticate(request, response, next) {
        try {
            this.app.log.express(`Incoming request from ${request.ip} to ${request.originalUrl} method: ${request.method}`)

            next()
        } catch (error) {
            this.app.log.error(error)

            return response.status(500).json({
                success: false,
                reason: 'An internal server error occurred'
            })
        }
    }

    validateBody(request, response, next) {
        try {
            const path = request.path.slice(5)

            switch (path) {
                case 'updateKey':
                    if (this.missing(['key'], request.body)) {
                        return response.status(400).json({
                            success: false,
                            reason: 'Malformed Body'
                        })
                    }
                    next()
                    break

                case 'updateActivityLog':
                    next()
                    break

                case 'keepAlive':
                    next()
                    break

                case 'override':
                    if (this.missing(['message'], request.body)) {
                        return response.status(400).json({
                            success: false,
                            reason: 'Malformed Body'
                        })
                    }
                    next()
                    break

                case 'mute':
                    if (this.missing(['username', 'duration'], request.body)) {
                        return response.status(400).json({
                            success: false,
                            reason: 'Malformed Body'
                        })
                    }
                    break

                default:
                    if (this.missing(['username'], request.body)) {
                        return response.status(400).json({
                            success: false,
                            reason: 'Malformed Body'
                        })
                    }
                    next()
            }
        } catch (error) {
            this.app.log.error(error)

            return response.status(500).json({
                success: false,
                reason: 'An internal server error occurred'
            })
        }
    }

    missing(array, object) {
        try {
            let missing = false

            array.forEach(element => {
                if (!object[element]) missing = true
            })

            return missing
        } catch (error) {
            return true
        }
    }

    override(request, response) {
        try {
            if (this.app.minecraft.bot?.player) {
                return response.status(200).json({
                    success: true
                })
            }
            return response.status(409).json({
                success: false,
                reason: 'Minecraft client is unavailable at this time'
            })
        } catch (error) {
            this.app.log.error(error)

            return response.status(500).json({
                success: false,
                reason: 'An internal server error occurred'
            })
        }
    }
}

module.exports = ExpressManager
