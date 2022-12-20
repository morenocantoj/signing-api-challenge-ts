export const config = {
  server: {
    port: process.env.PORT || 3000,
  },
  node: {
    env: process.env.NODE_ENV || 'development',
  },
  crypto: {
    salt: process.env.CRYPTO_SALT || 'fiskaly is AWESOME!',
    rsa: {
      passphrase: process.env.RSA_PASSPHRASE || 'fiskaly is AWESOME',
    },
  },
}
