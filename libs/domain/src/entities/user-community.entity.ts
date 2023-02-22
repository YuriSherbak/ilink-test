import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { CommunityEntity } from './community.entity';

/** Сообщества пользователей */
@Entity('user-community')
export class UserCommunityEntity {
  // region Plain
  /** ID */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // endregion

  // region Relations
  /**
   * Пользователь
   */
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
  @Column({ type: 'uuid', nullable: false })
  userId: string;

  /**
   * Сообщество
   */
  @ManyToOne(() => CommunityEntity, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  community: CommunityEntity;

  /**
   * ID сообщества
   */
  @Column({ type: 'uuid', nullable: false })
  communityId: string;

  // endregion
}
