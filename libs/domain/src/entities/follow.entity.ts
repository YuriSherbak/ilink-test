import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

/**
 * Отношение подписчик - пользователь, на которого подписан подписчик
 */
@ObjectType({
  description: 'Cвязь following-follower между двумя пользователя',
})
@Entity('follow')
export class FollowEntity {
  @Field(() => ID, { nullable: false, description: 'ID связи' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Пользователь-подписчик
   */
  @Field(() => UserEntity, {
    nullable: false,
    description: 'Пользователь-подписчик',
  })
  @ManyToOne(() => UserEntity, (user) => user.following, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  follower: UserEntity;

  /**
   * ID пользователя-подписичка
   */
  @Field(() => ID, {
    nullable: false,
    description: 'ID пользователя-подписчика',
  })
  @Column({ type: 'uuid', nullable: false })
  followerId: string;

  /**
   * Пользователь, на которого подписан подписчик
   */
  @Field(() => UserEntity, {
    nullable: false,
    description: 'Пользователь, на которого подписан подписчик',
  })
  @ManyToOne(() => UserEntity, (user) => user.followedBy, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  following: UserEntity;

  /**
   * ID пользователя, на которого подписан подписчик
   */
  @Field(() => ID, {
    nullable: false,
    description: 'ID пользователя, на которого подписан подписчик',
  })
  @Column({ type: 'uuid', nullable: false })
  followingId: string;
}
