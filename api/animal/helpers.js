const Animal = require('../../models/Animal')

const createAnimal = async (params) => {
  const { name, birth, description, user_id } = params
  const result = await Animal.create(
    {
      name,
      birth,
      description,
      user_id
    },
    { returning: true }
  )
  return result
}

const deleteAnimal = async (params) => {
  const { id, user_id } = params
  const result = await Animal.destroy({
    where: {
      id,
      user_id
    }
  })
  return result
}

const updateAnimal = async (params) => {
  const { id, user_id, values } = params

  let valuesToUpdate = {}
  if (values.name) valuesToUpdate.name = values.name
  if (values.birth) valuesToUpdate.birth = values.birth
  if (values.description) valuesToUpdate.description = values.description

  const result = await Animal.update(
    { ...valuesToUpdate },
    {
      where: {
        id,
        user_id
      },
      returning: true
    }
  )
  return result[1][0]
}

module.exports = {
  createAnimal,
  deleteAnimal,
  updateAnimal
}
