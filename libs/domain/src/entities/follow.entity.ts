import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

/**
 * Отношение подписчик - пользователь, на которого подписан подписчик
 */
@Entity('follow')
export class FollowEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Пользователь-подписчик
   */
  @ManyToOne(() => UserEntity, (user) => user.following, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  follower: UserEntity;

  /**
   * ID пользователя-подписичка
   */
  @Column({ type: 'uuid', nullable: false })
  followerId: string;

  /**
   * Пользователь, на которого подписан подписчик
   */
  @ManyToOne(() => UserEntity, (user) => user.followedBy, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  following: UserEntity;

  /**
   * ID пользователя, на которого подписан подписчик
   */
  @Column({ type: 'uuid', nullable: false })
  followingId: string;
}
