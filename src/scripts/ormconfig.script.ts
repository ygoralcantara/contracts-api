import * as fs from 'fs';
import { configService } from '../config/config.service';

const { namingStrategy, ...typeOrmConfig } = configService.getTypeOrmConfig();

fs.writeFileSync('ormconfig.json', JSON.stringify(typeOrmConfig, null, 2));
