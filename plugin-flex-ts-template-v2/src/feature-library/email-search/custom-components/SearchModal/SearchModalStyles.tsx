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
z-index: 1000;
`;

export const ModalContainer = styled.div`
background: white;
color:#000;
padding: 20px;
border-radius: 8px;
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
position: relative;
max-width: 90%;
width: 90%;
height:90%;

div[data-paste-element="RADIO_GROUP_FIELD"]{
    margin-top:0px !important;
}
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

export const SearchConversationTable = styled.table`
width:100%;
zoom: 1;
td{
    padding:10px;
    vertical-align: bottom;
}

td.btn{
    text-align:center;
}
`;

export const SearchResultsTableWrapper = styled.div`
    align-self: flex-start;
    height: calc(90vh - 230px);
    width: 100%;
    overflow-y: auto;
    box-shadow: 0px 0px 1px 1px #ccc;
`;

export const SearchResultsTable = styled('table')`
width: 100%;
border-collapse: collapse;


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

td:first-child,th:first-child,td:last-child,th:last-child{
  text-align:center;
}

tr.even-row {
    background:#fcfcfc;
}

tr.selected{
    background:#c9e0ff;
}


`;

export const SearchResultsContainer = styled('div')`
    margin-top:10px;
    padding-top:15px;
    border-top:1px solid #ccc;

    & > button{
        margin-right:20px;
    }
`;

export const SearchResultsWrap = styled('div')`
margin-top:10px;
    display: flex;
`;




export const MessagingPreviewContainer = styled('div')`
height:calc(90vh - 230px);
width:500px;
padding:10px;
position:relative;
box-shadow: 0px 0px 1px 1px #ccc;
margin-left: 10px;
`;

export const  MessagingPreviewCloseBtnWrap = styled('div')`
position:absolute;
top:10px;
right:10px;
`;

export const MessagingCanvasWrapper = styled('div')`
height:calc(90vh - 300px);
width:480px;
overflow:auto;

& > div{
    min-height: 100%;
}

button#email-reply-button{
    display: none;
}

`;


export const TaskAssignmentContainer = styled('div')`
height:calc(90vh - 230px);
width:500px;
padding:10px;
position:relative;
box-shadow: 0px 0px 1px 1px #ccc;
margin-left: 10px;
`;

export const TaskAssignmentCloseBtnWrap = styled('div')`
position:absolute;
top:10px;
right:10px;
`;

export const TaskAssignmentWrapper = styled('div')`
height:calc(90vh - 300px);
width:480px;
overflow:auto;
padding:5px;

`;

