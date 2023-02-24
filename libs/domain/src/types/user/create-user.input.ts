export class CreateUserInput {
  readonly nickname: string;
  /** ID пользователей, на которых нужно подписаться */
  readonly followingIds?: string[];

  /** ID сообществ, в которое вступил пользователь */
  readonly communityIds?: string[];
}
