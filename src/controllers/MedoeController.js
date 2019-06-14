const CommandService = require('../services/CommandService')
const Log = require('../utils/Log')

const TOKEN = 'medoe'

module.exports = {
    build(req, res) {
        const { branch, version } = req.params

        Log.log('Branch', branch)
        Log.log('Version', version)

        CommandService.execute(TOKEN, req.params, (error, success) => {
            if (error != null)
                return res.status(500).send('Build failed!')
            return res.status(200).send('Build started!')
        })
    }
}