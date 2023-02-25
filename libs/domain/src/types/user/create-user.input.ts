import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Данные для создания пользователя' })
export class CreateUserInput {
  @Field(() => String, { nullable: false, description: 'Никнейм пользователя' })
  /** Никнейм пользователя */
  readonly nickname: string;
  /** ID пользователей, на которых нужно подписаться */
  @Field(() => [String], {
    nullable: true,
    description: 'ID пользователей, на которых нужно подписаться',
  })
  readonly followingIds?: string[];

  /** ID сообществ, в которое вступил пользователь */
  @Field(() => [String], {
    nullable: true,
    description: 'ID сообществ, в которые хочет вступить пользователь',
  })
  readonly communityIds?: string[];
}
