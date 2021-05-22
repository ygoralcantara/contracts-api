import { HttpService, Injectable } from '@nestjs/common';
import { ViacepDto } from './viacep.dto';
import { ViacepEnum } from './viacep.enum';
import { Observable } from 'rxjs';

@Injectable()
export class ViacepService {
  constructor(private httpService: HttpService) {}

  async findAddressByZipcode(zipCode: string): Promise<ViacepDto> {
    const url = `${ViacepEnum.URI}/${zipCode}/${ViacepEnum.PAYLOAD_TYPE}`;
    const response = await this.httpService.get(url).toPromise();

    return response.data;
  }
}
