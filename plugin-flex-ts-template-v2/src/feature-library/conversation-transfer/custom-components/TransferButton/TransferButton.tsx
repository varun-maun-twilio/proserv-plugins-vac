import { useState, useEffect } from 'react';
import { IconButton, ITask, Actions, styled, templates } from '@twilio/flex-ui';

import { TransferActionPayload } from '../../types/ActionPayloads';
import { StringTemplates } from '../../flex-hooks/strings/ChatTransferStrings';

const IconContainer = styled.div`
  margin: auto;
  padding-right: 0.8em;
`;


const VacasaBtn = styled.button`
    background-color: #0078ab;
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

const TransferButton = ({ task }: TransferButtonProps) => {
  // All we are doing here is making sure we disable the transfer button after it is clicked for a cold transfer
  // There is additional complexity as we only want to disable it for the task they click transfer on
  const [disableTransferButtonForTask, setDisableTransferButtonForTask] = useState(false);
  const [taskSidsTransfered, setTaskSidsTransfered] = useState<string[]>([]);

  // if there is a transfer task event for this chat disable the transfer button while the request is made
  const handleTransferInitiated = (payload: TransferActionPayload) => {
    if (payload.task.sid === task.sid) {
      setTaskSidsTransfered((taskSidsTransfered) => [...taskSidsTransfered, task.sid]);
    }
  };

  // if there is a transfer task event for this chat re-enable the transfer button afterwards
  const handleTransferCompleted = (payload: TransferActionPayload) => {
    if (payload.task.sid === task.sid) {
      setTaskSidsTransfered((taskSidsTransfered) => taskSidsTransfered.filter((item) => item !== task.sid));
    }
  };

  // only listen for transfer task events when mounted and make sure we clean up the listener
  useEffect(() => {
    Actions.addListener('beforeChatTransferTask', handleTransferInitiated);
    Actions.addListener('afterChatTransferTask', handleTransferCompleted);
    return () => {
      Actions.removeListener('beforeChatTransferTask', handleTransferInitiated);
      Actions.removeListener('afterChatTransferTask', handleTransferCompleted);
    };
  }, []);

  // if the selected task changes or we update the list of transferred tasks check if should disable buttons
  useEffect(() => {
    setDisableTransferButtonForTask(taskSidsTransfered.includes(task.sid));
  }, [task.sid, taskSidsTransfered]);

  const onShowDirectory = () => {
    Actions.invokeAction('ShowDirectory');
  };

  return (
    <IconContainer>
     <VacasaBtn key="worker-directory-open"
        disabled={disableTransferButtonForTask}
        onClick={onShowDirectory}
       
        title={templates[StringTemplates.TransferChat]()}
      >Transfer</VacasaBtn>
    </IconContainer>
  );
};

export default TransferButton;
