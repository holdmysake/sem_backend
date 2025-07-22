import moment from 'moment-timezone'
import cron from 'node-cron'

const tes = () => {
    const timestamp = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')
    console.log(`tes cron ${timestamp}`)
}

cron.schedule('* * * * *', () => {
    tes()
})