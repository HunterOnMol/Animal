const Alert = require('../../models/Alert')

const createAlert = async (params) => {
  const { animal_id, day_of_week, time, description, type_id } = params
  const result = await Alert.create(
    {
      animal_id,
      day_of_week,
      time,
      description,
      type_id
    },
    { returning: true }
  )
  return result
}

const deleteAlert = async (params) => {
  const { id } = params
  const result = await Alert.destroy({
    where: {
      id
    }
  })
  return result
}

const updateAlert = async (params) => {
  const { id, values } = params

  let valuesToUpdate = {}
  if (values.day_of_week) valuesToUpdate.day_of_week = values.day_of_week
  if (values.time) valuesToUpdate.time = values.time
  if (values.description) valuesToUpdate.description = values.description
  if (values.type_id) valuesToUpdate.type_id = values.type_id

  const result = await Alert.update(
    { ...valuesToUpdate },
    {
      where: {
        id
      },
      returning: true
    }
  )
  return result[1][0]
}

module.exports = {
  createAlert,
  deleteAlert,
  updateAlert
}
