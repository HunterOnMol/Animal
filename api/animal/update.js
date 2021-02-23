const { updateAnimal } = require('./helpers')

fastify.route({
  method: 'POST',
  url: __filename.replace(__entry, '').replace(/\\/g, '/').replace('.js', ''),
  preValidation: [fastify.authenticate],
  handler: async (req) => {
    const { id = null, name, birth, description } = req.body
    const user_id = req.user.id

    const values = {
      name,
      birth,
      description
    }

    try {
      await updateAnimal({ id, user_id, values })
      return true
    } catch (err) {
      return err
    }
  }
})
