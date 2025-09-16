import { styled } from '@twilio/flex-ui';

export const ModalOverlay = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0, 0, 0, 0.5);
display: flex;
justify-content: center;
align-items: center;
z-index: 1001;
`;

export const ModalContainer = styled.div`
background: white;
color:#000;
padding: 20px;
border-radius: 8px;
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
position: relative;
max-width: 90%;
width: 500px;
height:80%;


`;

export const ModalCloseBtn = styled.a`
position: absolute;
top: 10px;
right: 10px;
background: none;
border: none;
font-size: 1.5rem;
cursor: pointer;
`;

export const ProgressTrackerTable = styled('table')`
width:100%;
border-collapse: collapse;
margin-top:40px;

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  font-size:12px;
}

thead{
    position: sticky;
      top: 0;
      z-index: 10;
}

th {
  background-color: #f2f2f2;
  font-size:12px;
  font-weight:bold;
}
`;

