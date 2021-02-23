const { createAnimal } = require('./helpers')

fastify.route({
  method: 'POST',
  url: __filename.replace(__entry, '').replace(/\\/g, '/').replace('.js', ''),
  preValidation: [fastify.authenticate],
  handler: async (req) => {
    const { name = null, birth = Date.now(), description = null } = req.body
    const user_id = req.user.id
    try {
      await createAnimal({ name, birth, description, user_id })
      return true
    } catch (err) {
      return err
    }
  }
})
