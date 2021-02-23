const Database = require('../../database/database')
const User = require('../../models/User')
const { hashPassword } = require('../../helpers/hashPassword')
const { getConfirmMail } = require('../../helpers/generateConfirmMail')
const sendMail = require('../../helpers/mailer')

fastify.route({
  method: 'POST',
  url: __filename.replace(__entry, '').replace(/\\/g, '/').replace('.js', ''),
  preValidation: [fastify.authenticate],
  handler: async (req, res) => {
    const {
      email = null,
      password = null,
      telegram_id = null,
      name = null,
      patronymic = null
    } = req.body

    if (!email || !password || !telegram_id) {
      return res.code(401).send({
        statusCode: 401,
        error: `Unauthorized`,
        message: `Заполните все поля`
      })
    }

    const [[{ countUsers }]] = await Database.query(
      `
      SELECT COUNT(*)::integer as "countUsers"
      FROM "user" 
      WHERE email ILIKE :email`,
      {
        replacements: {
          email
        }
      }
    )

    if (countUsers) {
      return res.code(401).send({
        statusCode: 401,
        error: `Unauthorized`,
        message: `Пользователь с этой почтой уже существует`
      })
    }

    const hash = await hashPassword(password)

    try {
      await User.create({
        email,
        hash,
        telegram_id
      })

      const html = getConfirmMail({ name, patronymic })

      await sendMail({
        subject: 'Test lizard mail',
        html,
        to: [email]
      })

      return true
    } catch (err) {
      return res.code(401).send({
        statusCode: 401,
        error: err,
        message: `Ошибка регистрации нового пользователя`
      })
    }
  }
})
