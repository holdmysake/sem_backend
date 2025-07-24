import moment from 'moment-timezone'
import cron from 'node-cron'
import { cronBSNW } from '../controller/data.controller.js'

const tes = () => {
    const timestamp = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm')
    cronBSNW(timestamp)
}

cron.schedule('* * * * *', () => {
    tes()
})