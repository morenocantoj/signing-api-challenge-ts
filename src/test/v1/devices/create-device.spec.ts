import server from '../../../api/server'
import request from 'supertest'

describe('Create a device', () => {
  const DEVICES_URL = '/v1/devices'

  it('returns a 201 CREATED creating a device', async () => {
    const signatureAlgorithm = 'RSA'
    const label = 'myFirstDevice'

    const response = await request(server).post(DEVICES_URL).send({
      signature_algorithm: signatureAlgorithm,
      label,
    })

    expect(response.statusCode).toBe(201)
    expect(response.body.id).not.toBeUndefined()
    expect(response.body.signature_algorithm).toBe(signatureAlgorithm)
    expect(response.body.label).toBe(label)
    expect(response.body.signatures_performed).toBe(0)
  })

  it('returns a 400 error if signature algorithm is not valid', async () => {
    const signatureAlgorithm = 'NON-VALID-ALGORITHM'
    const label = 'myFirstDevice'

    const response = await request(server).post(DEVICES_URL).send({
      signature_algorithm: signatureAlgorithm,
      label,
    })

    expect(false)
    expect(response.statusCode).toBe(400)
  })

  it('returns a 400 error if label is not valid', async () => {
    const signatureAlgorithm = 'RSA'
    const label = 10

    const response = await request(server).post(DEVICES_URL).send({
      signature_algorithm: signatureAlgorithm,
      label,
    })

    expect(false)
    expect(response.statusCode).toBe(400)
  })
})
