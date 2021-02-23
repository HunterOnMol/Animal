/* eslint-disable require-atomic-updates */
const User = require('../models/User')

module.exports = async function (request, reply) {
  try {
    let verify = await request.jwtVerify()

    const isExist = await User.count({
      where: {
        id: verify.id
      }
    })

    if (isExist === 0) {
      throw new Error('User not exist')
    }

    request.user = { ...verify }

    reply.header(
      'token',
      request.headers['authorization'].replace('Bearer ', '')
    )
  } catch (err) {
    throw new Error('User not exist')
  }
}
