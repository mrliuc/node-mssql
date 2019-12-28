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

describe('datetime dates and times (local)', () => {
    before(function(done) {
        const cfg = config()
        cfg.options.useUTC = false
        sql.connect(cfg, done)
    })

    it('2019-12-19 23:59:16', done => {
        const date = new Date(2019, 11, 19, 23, 59, 16, 0, 100)

        const req = new sql.Request()
        req.input('dt1', sql.DateTime2, date)
        req.query('insert into [TestCreateTime] values(@dt1)').then(result => {
            // assert.strictEqual(+result.recordset[0].dt1, date.getTime())

            done()
        }).catch(done)
    })

    it('2019-12-19 23:59:17', done => {
        const date = new Date(2019, 11, 19, 23, 59, 17, 999)

        const req = new sql.Request()
        req.input('dt1', sql.DateTime, date)
        req.query('insert into [TestCreateTime] values(@dt1)').then(result => {
            // assert.strictEqual(+result.recordset[0].dt1, date.getTime())

            done()
        }).catch(done)
    })

    it('2019-12-19 00:00:01', done => {
        const date = new Date(2019, 11, 19, 00, 00, 01)

        const req = new sql.Request()
        req.input('dt1', sql.DateTime, date)
        req.query('insert into [TestCreateTime] values(@dt1)').then(result => {
            // assert.strictEqual(+result.recordset[0].dt1, date.getTime())

            done()
        }).catch(done)
    })

    return after(done => sql.close(done))
})

describe('datetime dates and times (local)', () => {
    before(function(done) {
        const cfg = config()
        cfg.options.useUTC = false
        sql.connect(cfg, done)
    })

    it('2019-12-19 23:59:16', done => {
        const date = new Date(2019, 11, 19, 23, 59, 16, 0, 999)

        const req = new sql.Request()
        req.input('dt1', sql.DateTime, date)
        req.query('select @dt1 as dt1').then(result => {
            assert.strictEqual(+result.recordset[0].dt1, date.getTime())

            done()
        }).catch(done)
    })

    it('2019-12-19 23:59:17', done => {
        const date = new Date(2019, 11, 19, 23, 59, 17)

        const req = new sql.Request()
        req.input('dt1', sql.DateTime, date)
        req.query('select @dt1 as dt1').then(result => {
            assert.strictEqual(+result.recordset[0].dt1, date.getTime())

            done()
        }).catch(done)
    })

    it('2019-12-19 00:00:01', done => {
        const date = new Date(2019, 11, 19, 0, 0, 1)

        const req = new sql.Request()
        req.input('dt1', sql.DateTime, date)
        req.query('select @dt1 as dt1').then(result => {
            assert.strictEqual(+result.recordset[0].dt1, date.getTime())

            done()
        }).catch(done)
    })

    return after(done => sql.close(done))
})

describe('datetime2 dates and times (local)', () => {
    before(function(done) {
        const cfg = config()
        cfg.options.useUTC = false
        sql.connect(cfg, done)
    })

    it('2019-12-19 23:59:59:999', done => {
        const date = new Date(2019, 11, 19, 23, 59, 59, 999)

        const req = new sql.Request()
        req.input('dt1', sql.DateTime2, date)
        req.query('insert into [TestCreateTime] values(@dt1)').then(result => {
            // assert.strictEqual(+result.recordset[0].dt1, date.getTime())

            done()
        }).catch(done)
    })

    it('2019-12-19 23:59:59:999', done => {
        const date = new Date(2019, 11, 19, 23, 59, 59, 001)

        const req = new sql.Request()
        req.input('dt1', sql.DateTime2, date)
        req.query('select @dt1 as dt1').then(result => {
            assert.strictEqual(+result.recordset[0].dt1, date.getTime())

            done()
        }).catch(done)
    })

    it('2019-12-19 23:59:16', done => {
        const date = new Date(2019, 11, 19, 23, 59, 16, 999)

        const req = new sql.Request()
        req.input('dt1', sql.DateTime2, date)
        req.query('select @dt1 as dt1').then(result => {
            assert.strictEqual(+result.recordset[0].dt1, date.getTime())

            done()
        }).catch(done)
    })

    it('2019-12-19 23:59:17', done => {
        const date = new Date(2019, 11, 19, 23, 59, 17, 0)

        const req = new sql.Request()
        req.input('dt1', sql.DateTime2, date)
        req.query('select @dt1 as dt1').then(result => {

            assert.strictEqual(+result.recordset[0].dt1, date.getTime())

            done()
        }).catch(done)
    })

    it('2019-12-19 00:00:01:001', done => {
        const date = new Date(2019, 11, 19, 0, 0, 1, 1)

        const req = new sql.Request()
        req.input('dt1', sql.DateTime2, date)
        req.query('select @dt1 as dt1').then(result => {

            assert.strictEqual(+result.recordset[0].dt1, date.getTime())

            done()
        }).catch(done)
    })

    return after(done => sql.close(done))
})


describe('datetime dates and times (local) UTC', () => {
    before(function(done) {
        const cfg = config()
        cfg.options.useUTC = true
        sql.connect(cfg, done)
    })

    it('2019-12-19 23:59:16 UTC', done => {
        const date = new Date(Date.UTC(2019, 11, 19, 23, 59, 16, 0))

        const req = new sql.Request()
        req.input('dt1', sql.DateTime, date)
        req.query('select @dt1 as dt1').then(result => {
            assert.strictEqual(+result.recordset[0].dt1, date.getTime())

            done()
        }).catch(done)
    })

    it('2019-12-19 23:59:17 UTC', done => {
        const date = new Date(Date.UTC(2019, 11, 19, 23, 59, 17))

        const req = new sql.Request()
        req.input('dt1', sql.DateTime, date)
        req.query('select @dt1 as dt1').then(result => {
            assert.strictEqual(+result.recordset[0].dt1, date.getTime())

            done()
        }).catch(done)
    })

    return after(done => sql.close(done))
})