import React, { useState } from 'react';
import { Actions, IconButton, ITask, styled, templates } from '@twilio/flex-ui';

import { ConversationsHelper } from '../../../../utils/helpers';
import { StringTemplates } from '../../flex-hooks/strings';

const IconContainer = styled.div`
  margin: auto;
  padding-right: 0.8em;
`;


const VacasaEndBtn = styled.button`
background: rgb(214, 31, 31);
    border-radius: 4px;
    border: 0;
    color: white;
    display: inline-block;
    font-size: 0.875rem;
    height: 40px;
    line-height: 24px;
    padding: 0 20px;
    position: relative;
    text-align: center;
    text-transform: none;
    transition: background-color 0.2s, box-shadow 0.2s, color 0.2s;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;

    box-shadow: 0 6px 6px -5px rgba(44, 52, 57, 0.25),
      0 6px 6px -5px rgba(0, 120, 171, 0.3);

    :hover {
      box-shadow: 0 6px 6px -5px rgba(44, 52, 57, 0.25),
        0 6px 6px -5px rgba(0, 0, 0, 0.3);
      cursor: pointer;
    }

    :disabled {
      cursor: not-allowed;
    }
`;

interface TransferButtonProps {
  task: ITask;
}

const ParkButton = (props: TransferButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const allowPark = !ConversationsHelper.allowLeave(props.task);

  const parkInteraction = async () => {
    setIsLoading(true);
    await Actions.invokeAction('ParkInteraction', { task: props.task });
    setIsLoading(false);
  };

  return (
    <IconContainer>
      <VacasaEndBtn
        key="park-interaction-button"
        disabled={isLoading || !allowPark}
        onClick={parkInteraction}
        title={
          allowPark
            ? templates[StringTemplates.ParkInteraction]()
            : templates[StringTemplates.MultipleParticipantsError]()
        }
      >End</VacasaEndBtn>
    </IconContainer>
  );
};

export default ParkButton;
