const exec = require('child_process').exec
const Log = require('../utils/Log')

require('dotenv').config()
const { JENKINS_URI, JENKINS_USER, JENKINS_PASS } = process.env

module.exports = {
    execute(token, params, callback) {

        const cmdParams = `-d '${JSON.stringify(params)}'`
        const cmdType = `-H "Content-Type: application/json" -X POST`
        const cmdUri = `http://${JENKINS_USER}:${JENKINS_PASS}@${JENKINS_URI}/generic-webhook-trigger/invoke?token=${token}`
        const command = `curl -v ${cmdType} ${cmdParams} ${cmdUri}`

        Log.log('Command', command)

        exec(command, function (error, stdout, stderr) {
            // console.log('stdout: ' + stdout);
            // console.log('stderr: ' + stderr);

            if (error !== null) {
                Log.error('exec error: ' + error);
                callback(error, null)
            }

            return callback(null, stdout)
        });
    }
}