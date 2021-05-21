import { MigrationInterface, QueryRunner } from 'typeorm';

export class createServiceIndustryTable1621596093230
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        create table if not exists service_industry(
            id serial primary key,
            created_at timestamp default current_timestamp,
            updated_at timestamp default current_timestamp,
            deleted_at timestamp default null,
            cpf_cnpj varchar not null unique,
            name varchar,
            email varchar not null,
            type varchar not null
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table if exists service_industy`);
  }
}
