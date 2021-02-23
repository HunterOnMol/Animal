const {
  createAlert,
  deleteAlert,
  updateAlert
} = require('../api/alert/helpers')

const { createAnimal, deleteAnimal } = require('../api/animal/helpers')

let createdAnimal, createdAlert

describe('Create, update and delete alerts', () => {
  it('Should return created alert', async (done) => {
    // Mock animal
    const animalParams = {
      name: `Dogge`,
      description: `Some test description`,
      user_id: 3
    }
    createdAnimal = await createAnimal(animalParams)
    const params = {
      animal_id: createdAnimal.id,
      day_of_week: `Monday`,
      time: `16:45`,
      description: `Some test description`,
      type_id: 1
    }
    createdAlert = await createAlert(params)
    expect(createdAlert).toMatchObject(params)
    done()
  }),
    it('Should return updated alert', async (done) => {
      const values = {
        day_of_week: `Friday`,
        time: `12:15`,
        description: `Some test updated description`,
        type_id: 2
      }
      const updatedAlert = await updateAlert({ id: createdAlert.id, values })
      expect(updatedAlert).toMatchObject(values)
      done()
    }),
    it('Should return deleted alert', async (done) => {
      const deletedAlert = await deleteAlert({ id: createdAlert.id })
      expect(deletedAlert).toEqual(1)

      await deleteAnimal({ id: createdAnimal.id, user_id: 3 })

      done()
    })
})
