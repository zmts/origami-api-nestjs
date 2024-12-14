import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserResetCodeEntity1731255376423 implements MigrationInterface {
  name = 'UserResetCodeEntity1731255376423';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "user_reset_codes" (
        "id" SERIAL NOT NULL,
        "user_id" integer NOT NULL,
        "code" character varying,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_11914fdb9c08642963404f5bc9f" UNIQUE ("code"),
        CONSTRAINT "REL_039e7bce8f380db9a2ba9de9cb" UNIQUE ("user_id"),
        CONSTRAINT "PK_cefd1e614362d8b07437fc9608e" PRIMARY KEY ("id"))`);

    await queryRunner.query(`
      ALTER TABLE "user_reset_codes"
        ADD CONSTRAINT "FK_039e7bce8f380db9a2ba9de9cb7"
        FOREIGN KEY ("user_id") REFERENCES "users"("id")
        ON DELETE CASCADE ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_reset_codes" DROP CONSTRAINT "FK_039e7bce8f380db9a2ba9de9cb7"`);
    await queryRunner.query(`DROP TABLE "user_reset_codes"`);
  }
}
