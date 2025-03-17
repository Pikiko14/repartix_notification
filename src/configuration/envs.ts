import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  APP_ENV: string;
  SMTP_HOST: string;
  SMTP_USER: string;
  SMTP_PORT: string;
  SMTP_SECURE: boolean;
  SMTP_PASSWORD: string;
  APP_URL: string;
}

const envsSchema = joi.object({
  PORT: joi.number().required(),
  APP_ENV: joi.string().required(),
  APP_URL: joi.string().required(),
  SMTP_HOST: joi.string().required(),
  SMTP_USER: joi.string().required(),
  SMTP_PORT: joi.string().required(),
  SMTP_SECURE: joi.string().required(),
  SMTP_PASSWORD: joi.string().required(),
})
.unknown(true);

const { error, value } = envsSchema.validate({ 
  ...process.env,
});


if ( error ) {
  throw new Error(`Config validation error: ${ error.message }`);
}

const envVars:EnvVars = value;


export const envs = {
  port: envVars.PORT,
  app_env: envVars.APP_ENV,
  app_url: envVars.APP_URL,
  smtp_host: envVars.SMTP_HOST,
  smtp_port: envVars.SMTP_PORT,
  smtp_user: envVars.SMTP_USER,
  smtp_secure: envVars.SMTP_SECURE,
  smtp_password: envVars.SMTP_PASSWORD,
}