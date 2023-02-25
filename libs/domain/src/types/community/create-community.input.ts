import { COMMUNITY_THEMATIC } from 'libs/domain';
import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Данные для создания сообщества' })
export class CreateCommunityInput {
  /** Название сообщества */
  @Field(() => String, { nullable: true, description: 'Название сообщества' })
  readonly name: string;
  /** Тематика сообщества */
  @Field(() => COMMUNITY_THEMATIC, {
    nullable: true,
    description: 'Тематика сообщества',
  })
  readonly thematic?: COMMUNITY_THEMATIC;
}
