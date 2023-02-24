import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserCommunityEntity } from './user-community.entity';
import { FollowEntity } from './follow.entity';

@Entity('user')
export class UserEntity {
  // region Plain
  /**
   * ID пользователя
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Никнейм пользователя
   */
  @Column({ type: 'varchar', nullable: false })
  nickname: string;

  // endregion

  // regionRelations

  /**
   * Связь между сообществами и пользователем, который в них состоит
   */
  @OneToMany(
    () => UserCommunityEntity,
    (userCommunities) => userCommunities.user,
    { nullable: true },
  )
  userCommunities?: UserCommunityEntity[];

  /**
   * Связь между пользователем и другими пользователями, на которых он подписан
   */
  @OneToMany(() => FollowEntity, (following) => following.follower, {
    nullable: true,
  })
  following?: FollowEntity[];

  /**
   * Связь между пользователем и другими пользователями, которые на него подписаны
   */
  @OneToMany(() => FollowEntity, (followedBy) => followedBy.following, {
    nullable: true,
  })
  followedBy?: FollowEntity[];
  // endregion
}
