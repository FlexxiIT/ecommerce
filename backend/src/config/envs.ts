import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  PORT: get('PORT').required().asPortNumber(),
  JWT_SEED: get('JWT_SEED').required().asString(),
  
  WEB_URL: get('WEB_URL').required().asUrlString(),

  BACK_URL: get('BACK_URL').required().asUrlString(),

  SEND_EMAIL: get('SEND_EMAIL').default('false').asBool(),
  MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
  MAILER_EMAIL: get('MAILER_EMAIL').required().asString(),
  MAILER_SERCRET_KEY: get('MAILER_SERCRET_KEY').required().asString(),

  MERCADOPAGO_API_KEY: get('MERCADOPAGO_API_KEY').required().asString(),

}



