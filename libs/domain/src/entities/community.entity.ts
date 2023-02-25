import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserCommunityEntity } from './user-community.entity';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

/**
 * Тематики сообществ
 * <ul> Значения:
 * <li> MEDICINE - медицина
 * <li> FASHION - мода
 * <li> SPORT - спорт
 * <lI> TRAVEL - путеществия
 */
export enum COMMUNITY_THEMATIC {
  MEDICINE = 'MEDICINE',
  FASHION = 'FASHION',
  SPORT = 'SPORT',
  TRAVEL = 'TRAVEL',
}

registerEnumType(COMMUNITY_THEMATIC, {
  name: 'CommunityThematic',
});

@ObjectType({ description: 'Сообщество' })
@Entity('community')
export class CommunityEntity {
  // region Plain
  /**
   * ID сообщества
   */
  @Field(() => ID, { nullable: false, description: 'ID сообщества' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Название сообщества
   */
  @Field(() => String, { nullable: false, description: 'Название сообщества' })
  @Column({ type: 'varchar', nullable: false })
  name: string;

  // endregion

  // region Enums
  /**
   * Тематика сообщества
   */
  @Field(() => COMMUNITY_THEMATIC, {
    nullable: true,
    description: 'Тематика сообщества',
  })
  @Column({
    type: 'enum',
    enum: COMMUNITY_THEMATIC,
    enumName: 'COMMUNITY_THEMATIC',
    nullable: true,
  })
  thematic?: COMMUNITY_THEMATIC;

  // endregion

  // region Relations
  @Field(() => [UserCommunityEntity], {
    nullable: true,
    description:
      'Связи между сообществом и пользователями, которые в нем состоят',
  })
  /**
   * Связи между сообществом и пользователями, которые в нем состоят
   */
  @OneToMany(
    () => UserCommunityEntity,
    (userCommunities) => userCommunities.community,
    { nullable: true },
  )
  userCommunities?: UserCommunityEntity[];
  // endregion
}
