import { styled } from '@twilio/flex-ui';
import { SearchIcon } from "@twilio-paste/icons/esm/SearchIcon";
import { useState } from 'react';
import SearchModal from './SearchModal/SearchModal';


const St = {

    CompassChatbotIconContainer: styled.a`
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
  
    const [isModalOpen,setIsModalOpen] = useState(false);

    const toggleModal = ()=>{
      setIsModalOpen((prev)=>!prev);
    }
  
    return (

      <>  
       <St.CompassChatbotIconContainer onClick={()=>toggleModal()}>
          <SearchIcon decorative={false}  title="Open side modal" />
          </St.CompassChatbotIconContainer>
       
      <SearchModal isOpen={isModalOpen} toggleModal={()=>toggleModal()} />

     
      
       </>
      
    );
  };

  export default EmailSearchToggleBtn;
