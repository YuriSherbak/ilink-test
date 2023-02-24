import { COMMUNITY_THEMATIC } from 'libs/domain';

export class UpdateCommunityInput {
  /** Название сообщества */
  readonly name?: string;
  /** Тематика сообщества */
  readonly thematic?: COMMUNITY_THEMATIC;
}
