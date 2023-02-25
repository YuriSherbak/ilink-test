import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { CommunityEntity } from './community.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

/** Сообщества пользователей */
@ObjectType({ description: 'Связь между пользователем и сообществом' })
@Entity('user-community')
export class UserCommunityEntity {
  // region Plain
  /** ID */
  @Field(() => ID, { nullable: false, description: '' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // endregion

  // region Relations
  /**
   * Пользователь
   */
  @Field(() => UserEntity, { nullable: false, description: 'Пользователь' })
  @ManyToOne(() => UserEntity, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;

  /**
   * ID пользователя
   */
  @Field(() => ID, { nullable: false, description: 'ID пользователя' })
  @Column({ type: 'uuid', nullable: false })
  userId: string;

  /**
   * Сообщество
   */
  @Field(() => CommunityEntity, { nullable: false, description: 'Сообщество' })
  @ManyToOne(() => CommunityEntity, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  community: CommunityEntity;

  /**
   * ID сообщества
   */
  @Field(() => ID, { nullable: false, description: 'ID сообщества' })
  @Column({ type: 'uuid', nullable: false })
  communityId: string;

  // endregion
}
