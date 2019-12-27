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
        sql.connect(cfg, () => {

            sql.query(`
            if exists (select * from sys.tables where name = 'TestCreateTime')
            drop table TestCreateTime
            
            CREATE TABLE [dbo].[TestCreateTime](
                [CreateTime] [datetime] NULL
            )`, done)

        })

    })

    it('2019-12-19 23:59:59:997 DB', done => {
        const date = new Date(2019, 11, 19, 23, 59, 59, 997)

        const req = new sql.Request()
        req.input('dt1', sql.DateTime, date)
        req.query('insert into [TestCreateTime] values(@dt1);select CreateTime dt1 from TestCreateTime').then(result => {
            assert.strictEqual(+result.recordset[0].dt1, date.getTime())

            done()
        }).catch(done)
    })

    it('2019-12-19 23:59:59:998 DB', done => {
        const date = new Date(2019, 11, 19, 23, 59, 59, 998)

        const req = new sql.Request()
        req.input('dt1', sql.DateTime, date)
        req.query('insert into [TestCreateTime] values(@dt1);select CreateTime dt1 from TestCreateTime').then(result => {
            assert.strictEqual(+result.recordset[0].dt1, date.getTime())

            done()
        }).catch(done)
    })

    it('2019-12-19 23:59:59:999 DB', done => {
        const date = new Date(2019, 11, 19, 23, 59, 59, 999)

        const req = new sql.Request()
        req.input('dt1', sql.DateTime, date)
        req.query('insert into [TestCreateTime] values(@dt1);select CreateTime dt1 from TestCreateTime').then(result => {
            assert.strictEqual(+result.recordset[0].dt1, date.getTime())

            done()
        }).catch(done)
    })

    it('2019-12-19 23:59:59:997', done => {
        const date = new Date(2019, 11, 19, 23, 59, 59, 997)

        const req = new sql.Request()
        req.input('dt1', sql.DateTime2, date)
        req.query('select @dt1 dt1').then(result => {
            assert.strictEqual(+result.recordset[0].dt1, date.getTime())

            done()
        }).catch(done)
    })

    it('2019-12-19 23:59:59:998', done => {
        const date = new Date(2019, 11, 19, 23, 59, 59, 998)

        const req = new sql.Request()
        req.input('dt1', sql.DateTime2, date)
        req.query('select @dt1 dt1').then(result => {
            assert.strictEqual(+result.recordset[0].dt1, date.getTime())

            done()
        }).catch(done)
    })

    return after(done => sql.close(done))
})