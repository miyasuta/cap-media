module.exports = async function () {

    const { Files } = cds.entities

    this.before('CREATE', 'Files', req => {
        console.log('Create called')
        console.log(JSON.stringify(req.data))
        req.data.url = `/attachments/Files(${req.data.ID})/content`
    })

    this.before('READ', 'Files', req => {
        console.log('content-type: ', req.headers['content-type'])
    })
}