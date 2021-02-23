const { updateAnimal } = require('./helpers')

fastify.route({
  method: 'POST',
  url: __filename.replace(__entry, '').replace(/\\/g, '/').replace('.js', ''),
  preValidation: [fastify.authenticate],
  handler: async (req) => {
    const { id = null, day_of_week, time, description, type_id } = req.body

    const values = {
      day_of_week,
      time,
      description,
      type_id
    }

    try {
      await updateAnimal({ id, values })
      return true
    } catch (err) {
      return err
    }
  }
})
