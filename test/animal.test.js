const {
  createAnimal,
  deleteAnimal,
  updateAnimal
} = require('../api/animal/helpers')
let createdAnimal

describe('Create, update and delete animal', () => {
  it('Should return created animal', async (done) => {
    const params = {
      name: `Dogge`,
      description: `Some test description`,
      user_id: 3
    }

    createdAnimal = await createAnimal(params)
    expect(createdAnimal).toMatchObject(params)

    done()
  }),
    it('Should return updated animal', async (done) => {
      const params = {
        id: createdAnimal.id,
        user_id: 3,
        values: {
          name: `Updated Dogge`,
          description: `Some updated test description`
        }
      }

      const compareAnimal = {
        name: `Updated Dogge`,
        description: `Some updated test description`,
        user_id: 3
      }

      const updatedAnimal = await updateAnimal(params)
      expect(updatedAnimal).toMatchObject(compareAnimal)

      done()
    }),
    it('Should return updated animal', async (done) => {
      const params = {
        id: createdAnimal.id,
        user_id: 3
      }

      const deletedAnimal = await deleteAnimal(params)
      expect(deletedAnimal).toEqual(1)

      done()
    })
})
