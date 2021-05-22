import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { JwtModuleOptions } from '@nestjs/jwt';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { HttpModuleOptions } from '@nestjs/common';
import { timeout } from 'rxjs/operators';

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

  getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('DB_HOST'),
      port: parseInt(this.getValue('DB_PORT')),
      username: this.getValue('DB_USERNAME'),
      password: this.getValue('DB_PASSWORD'),
      database: this.getValue('DB_DATABASE'),
      synchronize: this.getValue('DB_SYNCHRONIZE') == 'true',
      entities: ['**/*.entity{.ts,.js}'],
      migrations: ['src/migration/*.ts'],
      namingStrategy: new SnakeNamingStrategy(),
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
      signOptions: { expiresIn: '1h' },
    };
  }

  getHttpModuleConfig(): HttpModuleOptions {
    return {
      timeout: 5000,
      maxRedirects: 5,
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
