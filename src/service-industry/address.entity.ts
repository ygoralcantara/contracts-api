import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'address' })
export class AddressEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  zipCode: string;

  @Column({ type: 'varchar', nullable: true })
  street: string;

  @Column({ type: 'integer', nullable: true })
  number: number;

  @Column({ type: 'varchar', nullable: true })
  addressLine: string;

  @Column({ type: 'varchar', nullable: true })
  district: string;

  @Column({ type: 'varchar', nullable: true })
  city: string;

  @Column({ type: 'varchar', nullable: true })
  stateCode: string;
}
