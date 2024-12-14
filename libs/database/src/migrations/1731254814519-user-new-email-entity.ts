import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserNewEmailEntity1731254814519 implements MigrationInterface {
  name = 'UserNewEmailEntity1731254814519';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "user_new_emails" (
        "id" SERIAL NOT NULL,
        "user_id" integer NOT NULL,
        "email" character varying,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_df16638e59b0056f7171a5a3510" UNIQUE ("email"),
        CONSTRAINT "REL_89cf31b3dd137c3a768ac1bf8d" UNIQUE ("user_id"),
        CONSTRAINT "PK_27847be91bf756c1ddde5d7206f" PRIMARY KEY ("id"))`);

    await queryRunner.query(`
      ALTER TABLE "user_new_emails"
        ADD CONSTRAINT "FK_89cf31b3dd137c3a768ac1bf8d4"
        FOREIGN KEY ("user_id") REFERENCES "users"("id")
        ON DELETE CASCADE ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_new_emails" DROP CONSTRAINT "FK_89cf31b3dd137c3a768ac1bf8d4"`);
    await queryRunner.query(`DROP TABLE "user_new_emails"`);
  }
}
