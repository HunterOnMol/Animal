const { deleteAlert } = require('./helpers')

fastify.route({
  method: 'POST',
  url: __filename.replace(__entry, '').replace(/\\/g, '/').replace('.js', ''),
  preValidation: [fastify.authenticate],
  handler: async (req) => {
    const { id = null } = req.body
    try {
      await deleteAlert({ id })
      return true
    } catch (err) {
      return err
    }
  }
})
