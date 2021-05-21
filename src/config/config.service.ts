import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { JwtModuleOptions } from '@nestjs/jwt';

dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`[ERROR] Missing enviroment env.${key}`);
    }

    return value;
  }

  ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  getExternalPort(): string {
    return this.getValue('EXTERNAL_PORT', false);
  }

  isProduction(): boolean {
    const mode = this.getValue('NODE_ENV', false);
    return mode == 'prod' || mode == 'production';
  }

  getTypeOrgmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('DB_HOST'),
      port: parseInt(this.getValue('DB_PORT')),
      username: this.getValue('DB_USERNAME'),
      password: this.getValue('DB_PASSWORD'),
      database: this.getValue('DB_DATABASE'),
      synchronize: Boolean(this.getValue('DB_SYNCHRONIZE')),
      entities: ['**/*.entity{.ts,.js}'],
      migrations: ['src/migration/*.ts'],
      cli: {
        migrationsDir: 'src/migration',
      },
    };
  }

  getSecretkey(): string {
    return this.getValue('SECRET_KEY');
  }

  getJwtConfig(): JwtModuleOptions {
    return {
      secret: this.getSecretkey(),
      signOptions: { expiresIn: '60s' },
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'DB_HOST',
  'DB_USERNAME',
  'DB_PASSWORD',
  'DB_DATABASE',
  'DB_PORT',
  'DB_SYNCHRONIZE',
  'SECRET_KEY',
]);

export { configService };
