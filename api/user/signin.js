const bcrypt = require('bcryptjs')

const User = require('../../models/User')

fastify.route({
  method: 'POST',
  url: __filename.replace(__entry, '').replace(/\\/g, '/').replace('.js', ''),
  preValidation: [fastify.authenticate],
  handler: async (req, res) => {
    const { email = null, password = null } = req.body

    const user = await User.findOne({
      where: {
        email
      }
    })

    if (!user) {
      return res.code(401).send({
        statusCode: 401,
        error: `Unauthorized`,
        message: `Пользователь с указанной почтой не найден`
      })
    }

    const match = await bcrypt.compare(password, user.hash)

    if (!match) {
      return res.code(401).send({
        statusCode: 401,
        error: `Unauthorized`,
        message: `Неверный пароль`
      })
    }

    const token = await res.jwtSign({
      id: user.id,
      email: user.email,
      name: user.name,
      surname: user.surname,
      patronymic: user.patronymic
    })

    return res.header('token', token).send({ token })
  }
})
