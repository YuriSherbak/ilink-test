import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1677091341023 implements MigrationInterface {
  name = 'init1677091341023';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "follow" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "followerId" uuid NOT NULL, "followingId" uuid NOT NULL, CONSTRAINT "PK_fda88bc28a84d2d6d06e19df6e5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nickname" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user-community" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "communityId" uuid NOT NULL, CONSTRAINT "PK_4e14e4a9e3b8c49ed15f983dac7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."COMMUNITY_THEMATIC" AS ENUM('MEDICINE', 'FASHION', 'SPORT', 'TRAVEL')`,
    );
    await queryRunner.query(
      `CREATE TABLE "community" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "thematic" "public"."COMMUNITY_THEMATIC", CONSTRAINT "PK_cae794115a383328e8923de4193" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "follow" ADD CONSTRAINT "FK_550dce89df9570f251b6af2665a" FOREIGN KEY ("followerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "follow" ADD CONSTRAINT "FK_e9f68503556c5d72a161ce38513" FOREIGN KEY ("followingId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-community" ADD CONSTRAINT "FK_d5967d6aeee76b766687903c119" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-community" ADD CONSTRAINT "FK_676281ed11e6e9b2d7d58d8a6f6" FOREIGN KEY ("communityId") REFERENCES "community"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user-community" DROP CONSTRAINT "FK_676281ed11e6e9b2d7d58d8a6f6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-community" DROP CONSTRAINT "FK_d5967d6aeee76b766687903c119"`,
    );
    await queryRunner.query(
      `ALTER TABLE "follow" DROP CONSTRAINT "FK_e9f68503556c5d72a161ce38513"`,
    );
    await queryRunner.query(
      `ALTER TABLE "follow" DROP CONSTRAINT "FK_550dce89df9570f251b6af2665a"`,
    );
    await queryRunner.query(`DROP TABLE "community"`);
    await queryRunner.query(`DROP TYPE "public"."COMMUNITY_THEMATIC"`);
    await queryRunner.query(`DROP TABLE "user-community"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "follow"`);
  }
}
