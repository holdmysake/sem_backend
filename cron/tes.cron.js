import cron from 'node-cron'

const tes = () => {
    console.log('tes cron')
}

cron.schedule('* * * * *', () => {
    tes()
})