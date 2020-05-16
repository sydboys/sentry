import React from 'react';

import {explodeSlug} from 'sentry/utils';
import BaseAvatar from 'sentry/components/avatar/baseAvatar';
import SentryTypes from 'sentry/sentryTypes';
import {Team} from 'sentry/types';

type Props = {
  team: Team | null;
} & Omit<BaseAvatar['props'], 'uploadPath' | 'uploadId'>;

class TeamAvatar extends React.Component<Props> {
  static propTypes = {
    team: SentryTypes.Team,
    ...BaseAvatar.propTypes,
  };

  render() {
    const {team, ...props} = this.props;
    if (!team) {
      return null;
    }
    const slug = (team && team.slug) || '';
    const title = explodeSlug(slug);
    const tooltip = `#${title}`;

    return (
      <BaseAvatar
        {...props}
        type={(team.avatar && team.avatar.avatarType) || 'letter_avatar'}
        uploadPath="team-avatar"
        uploadId={team.avatar && team.avatar.avatarUuid}
        letterId={slug}
        tooltip={tooltip}
        title={title}
      />
    );
  }
}
export default TeamAvatar;
