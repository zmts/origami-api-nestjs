import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefreshTokenEntity1736697721643 implements MigrationInterface {
  name = 'RefreshTokenEntity1736697721643';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "refresh_tokens" (
        "id" SERIAL NOT NULL, "user_id" integer NOT NULL,
        "uuid" character varying NOT NULL,
        "ua" character varying,
        "ip" character varying,
        "fingerprint" character varying,
        "expires_in" TIMESTAMP WITH TIME ZONE NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);

    await queryRunner.query(`CREATE INDEX "IDX_refresh_tokens__user_id" ON "refresh_tokens" ("user_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_refresh_tokens__uuid" ON "refresh_tokens" ("uuid") `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_refresh_tokens__uuid"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_refresh_tokens__user_id"`);
    await queryRunner.query(`DROP TABLE "refresh_tokens"`);
  }
}
