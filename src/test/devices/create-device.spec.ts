import server from '../../api/server'
import request from 'supertest'
import { SignatureAlgorithm } from '../../devices/domain/SignatureAlgorithm'

describe('Create a device', () => {
  it('returns a 201 CREATED creating a device', async () => {
    const signatureAlgorithm = 'RSA'
    const label = 'myFirstDevice'

    const response = await request(server).post('/devices').send({
      signature_algorithm: signatureAlgorithm,
      label,
    })

    expect(response.statusCode).toBe(201)
    expect(response.body.id).not.toBeUndefined()
    expect(response.body.signatureAlgorithm).toBe(signatureAlgorithm)
    expect(response.body.label).toBe(label)
    expect(response.body.signaturesPerformed).toBe(0)
  })
})
