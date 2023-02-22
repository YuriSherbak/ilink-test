export class CreateUserInput {
  readonly nickname: string;
  /**
   * Пользователи, на которых нужно подписаться
   */
  readonly followingIds?: string[];
  /**
   * Пользователи, которые подписались
   */
  readonly followerIds?: string[];
  /**
   * Сообщества, в которое вступил пользователь
   */
  readonly communityIds?: string[];
}