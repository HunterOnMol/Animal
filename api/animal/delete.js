const { deleteAnimal } = require('./helpers')

fastify.route({
  method: 'POST',
  url: __filename.replace(__entry, '').replace(/\\/g, '/').replace('.js', ''),
  preValidation: [fastify.authenticate],
  handler: async (req) => {
    const { id = null } = req.body
    const user_id = req.user.id
    try {
      await deleteAnimal({ id, user_id })
      return true
    } catch (err) {
      return err
    }
  }
})
