export class UpdateUserInput {
  /** Никнейм пользователя */
  readonly nickname?: string;
  /** Список ID пользователей, на которых надо подписаться */
  readonly followingIds?: string;
  /** Список ID пользователей, от которых надо отписаться */
  readonly unfollowingIds?: string;
  /** Список ID сообществ, в которые должен вступить пользователь */
  readonly joinCommunityIds?: string;
  /** Список ID сообществ, от которых должен отписаться пользователь */
  readonly leaveCommunityIds?: string;
}
