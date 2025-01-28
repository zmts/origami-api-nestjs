import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostsTagsRelations1738080137740 implements MigrationInterface {
  name = 'PostsTagsRelations1738080137740';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "posts_tags" (
        "post_id" integer NOT NULL,
        "tag_id" integer NOT NULL,
        CONSTRAINT "PK_ab48f2c0184cd3367465effc5d3" PRIMARY KEY ("post_id", "tag_id"))`);
    await queryRunner.query(`CREATE INDEX "IDX_a6b232c89aa1c442b7a6ef0211" ON "posts_tags" ("post_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_0a4f5ee04a91077ddb93526a60" ON "posts_tags" ("tag_id") `);

    await queryRunner.query(`
      ALTER TABLE "posts_tags"
        ADD CONSTRAINT "FK_a6b232c89aa1c442b7a6ef02110"
        FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`
      ALTER TABLE "posts_tags"
        ADD CONSTRAINT "FK_0a4f5ee04a91077ddb93526a605"
        FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts_tags" DROP CONSTRAINT "FK_0a4f5ee04a91077ddb93526a605"`);
    await queryRunner.query(`ALTER TABLE "posts_tags" DROP CONSTRAINT "FK_a6b232c89aa1c442b7a6ef02110"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_0a4f5ee04a91077ddb93526a60"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_a6b232c89aa1c442b7a6ef0211"`);
    await queryRunner.query(`DROP TABLE "posts_tags"`);
  }
}
