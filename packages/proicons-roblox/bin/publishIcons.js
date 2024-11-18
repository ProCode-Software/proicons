import axios from 'axios'

const assetId = 91617261691418

axios.get(`https://apis.roblox.com/assets/v1/assets/${assetId}`, {
    headers: {
        'x-api-key': process.env.ROBLOX_PUBLISH_KEY
    },
    responseType: 'json'
}).then(res => {
}).catch(err => {
    console.log(err.message)
})