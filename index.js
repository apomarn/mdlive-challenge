const express = require('express')

const server = express()

const paginateApps = require('./paginate-apps')

server.get('/apps', (request, response) => {
    var by = request.query.by

    var start = request.query.start

    var end = request.query.end

    var max = request.query.max

    var order = request.query.order

    const filteredApps = paginateApps(by, start, end, max, order)

    response.json({ apps: filteredApps })
})

server.listen(3000, () => {
    console.log('server is listening in port 3000')
})