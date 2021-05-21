import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'address' })
export class AddressEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  zip_code: string;

  @Column({ type: 'varchar', nullable: true })
  street: string;

  @Column({ type: 'integer', nullable: true })
  number: number;

  @Column({ type: 'varchar', nullable: true })
  address_line: string;

  @Column({ type: 'varchar', nullable: true })
  district: string;

  @Column({ type: 'varchar', nullable: true })
  city: string;

  @Column({ type: 'varchar', nullable: true })
  state_code: string;
}
