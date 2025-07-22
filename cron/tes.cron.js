const tes = () => {
    console.log('tes cron')
}

cron.schedule('* * * * *', () => {
    tes()
})