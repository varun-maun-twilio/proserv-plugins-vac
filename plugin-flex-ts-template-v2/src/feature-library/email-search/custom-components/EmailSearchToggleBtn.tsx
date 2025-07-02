import { styled } from '@twilio/flex-ui';
import { EmailIcon } from "@twilio-paste/icons/esm/EmailIcon";
import {
    SideModal,
    SideModalBody,
    SideModalButton,
    SideModalContainer,
    SideModalHeader,
    SideModalHeading,
  } from '@twilio-paste/core/side-modal';

import SearchPanel from "./SearchPanel/SearchPanel"

const St = {
    CompassChatbotIconContainer: styled.div`
      display: flex;
      align-items: center;
      border: 0;
      border-radius: 100px;
      background: none;
      padding: 4px 6px;
      margin-right: 6px;
  
      :hover {
        background-color: rgba(255, 255, 255, 0.2);
        cursor: pointer;
      }
    `,
  };

   const EmailSearchToggleBtn: React.FC = () => {
  

  
    return (

        <SideModalContainer >
        <SideModalButton variant="secondary_icon" size="icon_small" >
          <EmailIcon decorative={false}  title="Open side modal" />
        </SideModalButton>
        <SideModal aria-label="Basic Side Modal">
          <SideModalHeader>
            <SideModalHeading>
              Search Email
            </SideModalHeading>
          </SideModalHeader>
          <SideModalBody>
          <SearchPanel key="message-search-panel" />

           
          </SideModalBody>
        </SideModal>
      </SideModalContainer>

      
    );
  };

  export default EmailSearchToggleBtn;
  /*
<St.CompassChatbotIconContainer onClick={handleOnclick}>
        <EmailIcon decorative={false} title="Description of icon" />
      </St.CompassChatbotIconContainer>
  */