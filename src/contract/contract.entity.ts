import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { ServiceIndustryEntity } from '../service-industry/service-industry.entity';

@Entity({ name: 'contracts' })
export class ContractEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  serviceProvider: string;

  @Column({ type: 'date', nullable: false })
  contractStart: Date;

  @Column({ type: 'date', nullable: false })
  contractEnd: Date;

  @ManyToOne(
    () => ServiceIndustryEntity,
    (service_industry) => service_industry.contracts,
  )
  serviceIndustry: ServiceIndustryEntity;
}
