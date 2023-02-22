import { UserEntity } from './user.entity';
import { CommunityEntity } from './community.entity';
import { UserCommunityEntity } from './user-community.entity';
import { FollowEntity } from './follow.entity';

export * from './user.entity';
export * from './community.entity';
export * from './user-community.entity';
export * from './follow.entity';
export const entities = [
  UserEntity,
  CommunityEntity,
  UserCommunityEntity,
  FollowEntity,
];
