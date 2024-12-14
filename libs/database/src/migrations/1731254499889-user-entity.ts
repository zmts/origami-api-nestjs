import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserEntity1731254499889 implements MigrationInterface {
  name = 'UserEntity1731254499889';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" SERIAL NOT NULL,
        "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "email" character varying,
        "username" character varying,
        "firstname" character varying,
        "lastname" character varying,
        "password" character varying,
        "social_provider" character varying,
        "social_id" character varying,
        "banned_at" TIMESTAMP WITH TIME ZONE DEFAULT null,
        "last_login_at" TIMESTAMP WITH TIME ZONE DEFAULT null,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_951b8f1dfc94ac1d0301a14b7e1" UNIQUE ("uuid"),
        CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
        CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"),
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
