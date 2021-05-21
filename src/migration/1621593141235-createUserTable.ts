import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUserTable1621593141235 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        create table if not exists users(
            id serial primary key,
            created_at timestamp default current_timestamp,
            updated_at timestamp default current_timestamp,
            deleted_at timestamp default null,
            username varchar not null unique,
            email varchar not null unique,
            password varchar not null unique,
            first_name varchar,
            last_name varchar
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table if exists users;`);
  }
}
