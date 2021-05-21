import { MigrationInterface, QueryRunner } from 'typeorm';

export class createContractsTable1621596107278 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        create table if not exists contracts(
            id serial primary key,
            created_at timestamp default current_timestamp,
            updated_at timestamp default current_timestamp,
            deleted_at timestamp default null,
            name varchar not null,
            service_provider varchar,
            contract_start date not null,
            contract_end date not null,
            service_industry_id integer not null,
            constraint fk_service_industry_contract_id foreign key (service_industry_id)
                references service_industry (id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table if exists contracts`);
  }
}
