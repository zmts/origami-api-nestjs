import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostEntity1737037035930 implements MigrationInterface {
  name = 'PostEntity1737037035930';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "posts" (
        "id" SERIAL NOT NULL,
        "uuid" uuid NOT NULL,
        "user_id" integer NOT NULL,
        "title" character varying,
        "description" character varying,
        "content" json NOT NULL DEFAULT '{}',
        "is_private" boolean NOT NULL DEFAULT false,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);

    await queryRunner.query(`CREATE INDEX "IDX_posts__user_id" ON "posts" ("user_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_posts__uuid" ON "posts" ("uuid") `);
    await queryRunner.query(`CREATE INDEX "IDX_posts__title-description-is_private" ON "posts" ("title", "description", "is_private") `);

    await queryRunner.query(
      `ALTER TABLE "posts"
        ADD CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986"
        FOREIGN KEY ("user_id") REFERENCES "users"("id")
        ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_posts__title-description-is_private"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_posts__uuid"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_posts__user_id"`);
    await queryRunner.query(`DROP TABLE "posts"`);
  }
}
