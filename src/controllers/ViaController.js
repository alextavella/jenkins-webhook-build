const CommandService = require('../services/CommandService')
const StringUtils = require('../utils/StringUtils')
const Log = require('../utils/Log')

const TOKEN = 'via'

const formatBranchName = (name) => {
    const getFolderName = (initial) => {
        switch (initial) {
            case 'F': return 'feature'
            case 'B': return 'bugfix'
            default: null
        }
    }
    const folder = getFolderName(name.charAt(0).toUpperCase())
    return (folder) ? `${folder}/${name.slice(1)}` : name
}

module.exports = {
    build(req, res) {
        const { branch, brand, env } = req.params
        Log.log('Original Branch', branch)

        const branchName = formatBranchName(branch)
        const brandName = StringUtils.capityalize(brand)
        const envName = StringUtils.capityalize(env)

        Log.log('Branch', branchName)
        Log.log('Brand', brandName)
        Log.log('Version', envName)

        const cmdParams = {
            branch: branchName,
            brand: brandName,
            env: envName
        }

        CommandService.execute(TOKEN, cmdParams, (error, success) => {
            if (error != null)
                return res.status(500).send('Build failed!')
            return res.status(200).send('Build started!')
        })
    }
}