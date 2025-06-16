import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOrderItem1750026412203 implements MigrationInterface {
    name = 'UpdateOrderItem1750026412203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "price"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" ADD "price" numeric(10,2) NOT NULL`);
    }

}
