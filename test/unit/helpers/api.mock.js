/* eslint-disable no-empty-pattern / / eslint-disable prettier/prettier */
/* eslint-disable no-empty-pattern /
/ eslint-disable prettier/prettier */
const Mocker = (method, url, data, overwritePath = null) => {
    return new Promise((resolve, reject) => {
        const urlWithoutParams = url ? url.split('?')[0] : '/all'
        const fileName = method.toLowerCase() + urlWithoutParams.toLowerCase().replace('/', '.');
        let responseJson
        if (overwritePath) {
            overwritePath = overwritePath.replace('.spec', '')
            try {
                responseJson = require('../json/overwrites/' +
                    overwritePath +
                    '/' +
                    fileName +
                    '.json')
            } catch ({ }) {
                try {
                    overwritePath = overwritePath.split('/')
                    overwritePath.pop()
                    overwritePath = overwritePath.join('/')
                    responseJson = require('../json/overwrites/' +
                        overwritePath +
                        '/' +
                        fileName +
                        '.json')
                } catch ({ }) { }
            }

        }
        if (!responseJson) {
            responseJson = require('../json/overwrites/' + fileName + '.json')
        }
        if ([200, 201, 204].includes(responseJson.code) || !responseJson.code) {
            return resolve(responseJson)
        } else {
            return reject(responseJson)
        }
    })
}

export default {
    get(url, data = {}) {
        return Mocker('get', url, data, this.jsonOverwritesPath)
    },
    $get(url, data = {}) {
        return Mocker('get', url, data, this.jsonOverwritesPath)
    },
    $post(url, data = {}) {
        return Mocker('post', url, data, this.jsonOverwritesPath)
    },
    $patch(url, data = {}) {
        return Mocker('patch', url, data, this.jsonOverwritesPath)
    },
    $delete(url, data = {}) {
        return Mocker('delete', url, data, this.jsonOverwritesPath)
    },
}