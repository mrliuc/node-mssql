const sql = require('../../tedious.js')
const assert = require('assert')

if (parseInt(process.version.match(/^v(\d+)\./)[1]) > 0) {
    require('../common/templatestring.js')
}

const config = function() {
    const cfg = JSON.parse(require('fs').readFileSync(`${__dirname}/../.mssql.json`))
    cfg.driver = 'tedious'
    return cfg
}


describe('dates and times (local)', () => {
    before(function(done) {
        const cfg = config()
        cfg.options.useUTC = false
        sql.connect(cfg, done)
    })

    it('2019-12-19 23:59:16', done => {
        const date = new Date(2019, 12, 19, 23, 59, 16)

        const req = new sql.Request()
        req.input('dt1', sql.DateTime, date)
        req.query('select @dt1 as dt1').then(result => {
            assert.strictEqual(+result.recordset[0].dt1, date.getTime())

            done()
        }).catch(done)
    })

    it('2019-12-19 23:59:17', done => {
        const date = new Date(2019, 12, 19, 23, 59, 17)

        const req = new sql.Request()
        req.input('dt1', sql.DateTime, date)
        req.input('dt2', sql.DateTime, null)
        req.query('select @dt1 as dt1').then(result => {
            assert.strictEqual(+result.recordset[0].dt1, date.getTime())

            done()
        }).catch(done)
    })

    return after(done => sql.close(done))
})