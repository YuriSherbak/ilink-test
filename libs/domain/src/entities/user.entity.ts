import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserCommunityEntity } from './user-community.entity';

@Entity()
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
  @OneToMany(() => UserEntity, (user) => user.friend, { nullable: true })
  friends: UserEntity[];

  @ManyToOne(() => UserEntity, (user) => user.friends, { nullable: true })
  friend: UserEntity;

  /**
   * Связь между сообществами и пользователем, который в них состоит
   */
  @OneToMany(
    () => UserCommunityEntity,
    (userCommunities) => userCommunities.user,
    { nullable: true },
  )
  userCommunities?: UserCommunityEntity[];
  // endregion
}
