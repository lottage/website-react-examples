
import type { SetStateAction } from 'react';
import { MessageUIComponentProps, MessageTeam } from 'stream-chat-react';

import './TeamMessage.css';

type TeamMessageProps = MessageUIComponentProps & {
  setPinsOpen?: React.Dispatch<SetStateAction<boolean>>;
}

export const TeamMessage = (props: TeamMessageProps) => {
  const { handleOpenThread, isMyMessage, message, setPinsOpen } = props;

  const getMessageActions = () => {
    if (isMyMessage()) {
      return ['edit', 'delete', 'pin', 'react', 'reply', 'flag'];

    }
    return ['pin', 'react', 'reply', 'flag', 'mute'];
  };

  const handleOpenThreadOverride = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (setPinsOpen) setPinsOpen(false);
    handleOpenThread(event);
  };

  return (
    <div className={message.pinned ? 'pinned-message' : 'unpinned-message'}>
      <MessageTeam {...props} {...{ getMessageActions }} message={message} handleOpenThread={handleOpenThreadOverride} />
      {/** potentially add replies component here */}
    </div>
  );
};