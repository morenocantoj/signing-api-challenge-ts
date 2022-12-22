import server from '../../../api/server'
import request from 'supertest'

describe('Create a signature', () => {
  const DEVICES_URL = '/v1/devices'
  const SIGNING_DEVICE_URL = (deviceId: string) => `${DEVICES_URL}/${deviceId}/sign`

  it('returns a 201 CREATED creating a signature', async () => {
    const signatureAlgorithm = 'RSA'
    const label = 'myFirstDevice'
    const dataToSign = 'data-to-sign'
    const deviceCreatedResponse = await request(server)
      .post(DEVICES_URL)
      .send({
        signature_algorithm: signatureAlgorithm,
        label,
      })
      .expect(201)

    const response = await request(server)
      .post(SIGNING_DEVICE_URL(deviceCreatedResponse.body.id))
      .send({
        data: dataToSign,
      })
      .expect(201)

    expect(response.body.signature).not.toBeUndefined()
    expect(response.body.signature).not.toEqual(dataToSign)
  })
})
