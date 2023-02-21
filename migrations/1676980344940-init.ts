import {MigrationInterface, QueryRunner} from "typeorm";

export class init1676980344940 implements MigrationInterface {
    name = 'init1676980344940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."COMMUNITY_THEMATIC" AS ENUM('MEDICINE', 'FASHION', 'SPORT', 'TRAVEL')`);
        await queryRunner.query(`CREATE TABLE "community_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "thematic" "public"."COMMUNITY_THEMATIC", CONSTRAINT "PK_43aeaac25b2d2ccce251c9ae54b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_community_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "communityId" uuid NOT NULL, CONSTRAINT "PK_44440a5350533d59f7010ad3d2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nickname" character varying NOT NULL, "friendId" uuid, CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_community_entity" ADD CONSTRAINT "FK_08fde047b539e89202439af93f5" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_community_entity" ADD CONSTRAINT "FK_c66592b71d59b7abe8c3b99d5f0" FOREIGN KEY ("communityId") REFERENCES "community_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "FK_307becbdf2699fc796fe6d730e0" FOREIGN KEY ("friendId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "FK_307becbdf2699fc796fe6d730e0"`);
        await queryRunner.query(`ALTER TABLE "user_community_entity" DROP CONSTRAINT "FK_c66592b71d59b7abe8c3b99d5f0"`);
        await queryRunner.query(`ALTER TABLE "user_community_entity" DROP CONSTRAINT "FK_08fde047b539e89202439af93f5"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TABLE "user_community_entity"`);
        await queryRunner.query(`DROP TABLE "community_entity"`);
        await queryRunner.query(`DROP TYPE "public"."COMMUNITY_THEMATIC"`);
    }

}
