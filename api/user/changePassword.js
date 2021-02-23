const crypto = require('crypto')
const User = require('../../models/User')
const { generateString } = require('../../helpers/getRandomString')
const { getConfirmMail } = require('../../helpers/generateConfirmMail')
const sendMail = require('../../helpers/mailer')

fastify.route({
  method: 'POST',
  url: __filename.replace(__entry, '').replace(/\\/g, '/').replace('.js', ''),
  preValidation: [fastify.authenticate],
  handler: async (req, res) => {
    const { email = null } = req.body

    if (!email) {
      return res.code(401).send({
        statusCode: 401,
        error: `Unauthorized`,
        message: `Заполните все поля`
      })
    }

    const user = await User.findOne({
      where: {
        email
      }
    })

    if (!user) {
      return res.code(409).send({
        statusCode: 409,
        error: `Conflict`,
        message: `Пользователя с таким логином не существует`
      })
    }

    const reset_token = crypto
      .createHash('md5')
      .update(`${generateString(6)}:maxpain`)
      .digest('hex')

    try {
      await User.update(
        {
          reset_token
        },
        {
          where: {
            id: user.id
          }
        }
      )

      const html = await getConfirmMail({
        name: user.name,
        patronymic: user.patronymic
      })
      await sendMail({
        subject: 'Восстановление пароля в lizaed_app',
        html,
        to: [user.email]
      })
    } catch (err) {
      return res.code(500).send({
        statusCode: 500,
        error: `Internal Server Error`,
        message: `Получена ошибка в процессе обновления данных`
      })
    }

    return true
  }
})
