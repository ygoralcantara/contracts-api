import { MigrationInterface, QueryRunner } from 'typeorm';

export class createAddressTable1621596100217 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        create table if not exists address(
            id serial primary key,
            created_at timestamp default current_timestamp,
            updated_at timestamp default current_timestamp,
            deleted_at timestamp default null,
            zip_code varchar not null,
            street varchar,
            number integer,
            address_line varchar,
            district varchar,
            city varchar,
            state_code varchar,
            service_industry_id integer not null,
            constraint fk_service_industry_id foreign key (service_industry_id)
                references service_industry (id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table if exists address;`);
  }
}
