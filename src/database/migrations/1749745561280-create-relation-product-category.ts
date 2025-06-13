import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRelationProductCategory1749745561280
  implements MigrationInterface
{
  name = 'CreateRelationProductCategory1749745561280';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_b31522e7a7f93ef47f311590a79"`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_category" ("productId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_7e60cbb6e911363b5ff8ed28e85" PRIMARY KEY ("productId", "categoryId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_930110e92aed1778939fdbdb30" ON "product_category" ("productId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_559e1bc4d01ef1e56d75117ab9" ON "product_category" ("categoryId") `,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoriesId"`);
    await queryRunner.query(
      `ALTER TABLE "product_category" ADD CONSTRAINT "FK_930110e92aed1778939fdbdb302" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_category" ADD CONSTRAINT "FK_559e1bc4d01ef1e56d75117ab9c" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_category" DROP CONSTRAINT "FK_559e1bc4d01ef1e56d75117ab9c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_category" DROP CONSTRAINT "FK_930110e92aed1778939fdbdb302"`,
    );
    await queryRunner.query(`ALTER TABLE "product" ADD "categoriesId" integer`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_559e1bc4d01ef1e56d75117ab9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_930110e92aed1778939fdbdb30"`,
    );
    await queryRunner.query(`DROP TABLE "product_category"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_b31522e7a7f93ef47f311590a79" FOREIGN KEY ("categoriesId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
