import { Column, Entity, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { AddressEntity } from './address.entity';
import { ContractEntity } from '../contract/contract.entity';

@Entity({ name: 'service_industy' })
export class ServiceIndustryEntity extends BaseEntity {
  @Column({ type: 'varchar', unique: true, nullable: false })
  cpf_cnpj: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  type: string;

  @OneToOne(() => AddressEntity)
  @JoinColumn()
  address: AddressEntity;

  @OneToMany(() => ContractEntity, (contracts) => contracts.service_industry)
  contracts: ContractEntity[];
}
