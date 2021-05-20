import * as fs from 'fs';
import { configService } from '../config/config.service';

fs.writeFileSync(
  'ormconfig.json',
  JSON.stringify(configService.getTypeOrgmConfig(), null, 2),
);
