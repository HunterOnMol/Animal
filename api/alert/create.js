const { createAlert } = require('./helpers')

fastify.route({
  method: 'POST',
  url: __filename.replace(__entry, '').replace(/\\/g, '/').replace('.js', ''),
  preValidation: [fastify.authenticate],
  handler: async (req) => {
    const { animal_id, day_of_week, time, description, type_id } = req.body
    try {
      await createAlert({ animal_id, day_of_week, time, description, type_id })
      return true
    } catch (err) {
      return err
    }
  }
})
