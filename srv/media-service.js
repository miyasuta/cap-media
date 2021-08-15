module.exports = async function () {

    const { Files } = cds.entities

    this.before('CREATE', 'Files', req => {
        console.log('Create called')
        console.log(JSON.stringify(req.data))
        req.data.url = `/attachments/Files(${req.data.ID})/content`
    })
}