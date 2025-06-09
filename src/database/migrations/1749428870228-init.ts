import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1749428870228 implements MigrationInterface {
  name = 'Init1749428870228';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "product"`);
  }
}
