import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Данные для обновления пользователя' })
export class UpdateUserInput {
  /** Никнейм пользователя */
  @Field(() => String, { nullable: true, description: 'Никнейм пользователя' })
  readonly nickname?: string;
  /** Список ID пользователей, на которых надо подписаться */
  @Field(() => [String], {
    nullable: true,
    description: 'Список ID пользователей, на которых надо подписаться',
  })
  readonly followingIds?: string;
  /** Список ID пользователей, от которых надо отписаться */
  @Field(() => [String], {
    nullable: true,
    description: 'Список ID пользователей, от которых надо отписаться',
  })
  readonly unfollowingIds?: string;
  /** Список ID сообществ, в которые должен вступить пользователь */
  @Field(() => [String], {
    nullable: true,
    description: 'Список ID сообществ, в которые должен вступить пользователь',
  })
  readonly joinCommunityIds?: string;
  /** Список ID сообществ, от которых должен отписаться пользователь */
  @Field(() => [String], {
    nullable: true,
    description:
      'Список ID сообществ, от которых должен отписаться пользователь',
  })
  readonly leaveCommunityIds?: string;
}
