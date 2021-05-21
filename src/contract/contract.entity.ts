import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { ServiceIndustryEntity } from '../service-industry/service-industry.entity';

@Entity({ name: 'contracts' })
export class ContractEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  service_provider: string;

  @Column({ type: 'date', nullable: false })
  contract_start: Date;

  @Column({ type: 'date', nullable: false })
  contract_end: Date;

  @ManyToOne(
    () => ServiceIndustryEntity,
    (service_industry) => service_industry.contracts,
  )
  service_industry: ServiceIndustryEntity;
}
