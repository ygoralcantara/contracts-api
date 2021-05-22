import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', unique: true, nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  firstName: string;

  @Column({ type: 'varchar', nullable: true })
  lastName: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hashSync(
      this.password,
      bcrypt.genSaltSync(10),
    );
  }
}
