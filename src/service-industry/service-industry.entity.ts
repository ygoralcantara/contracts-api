import { Column, Entity, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { AddressEntity } from './address.entity';
import { ContractEntity } from '../contract/contract.entity';

@Entity({ name: 'service_industry' })
export class ServiceIndustryEntity extends BaseEntity {
  @Column({ type: 'varchar', unique: true, nullable: false })
  cpfCnpj: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  type: string;

  @OneToOne(() => AddressEntity, { cascade: ['remove', 'soft-remove'] })
  @JoinColumn()
  address: AddressEntity;

  @OneToMany(() => ContractEntity, (contracts) => contracts.serviceIndustry)
  contracts: ContractEntity[];
}
