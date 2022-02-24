import { EncryptionTransformer } from 'typeorm-encrypted';
require('dotenv/config');

export const dataEncryption = new EncryptionTransformer({
  key: process.env.DB_KEY,
  algorithm: 'aes-256-cbc',
  ivLength: 16,
  iv: process.env.DB_IV,
});
