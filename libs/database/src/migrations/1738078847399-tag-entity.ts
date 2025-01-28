import { MigrationInterface, QueryRunner } from 'typeorm';

export class TagEntity1738078847399 implements MigrationInterface {
  name = 'TagEntity1738078847399';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "tags" (
        "id" SERIAL NOT NULL,
        "slug" character varying NOT NULL,
      CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);

    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_tags__slug" ON "tags" ("slug") `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_tags__slug"`);
    await queryRunner.query(`DROP TABLE "tags"`);
  }
}
