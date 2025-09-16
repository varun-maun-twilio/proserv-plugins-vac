import { styled } from '@twilio/flex-ui';



export const SearchResultsTable = styled('table')`
width: 100%;
border-collapse: collapse;

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  font-size:12px;
}
th {
  background-color: #f2f2f2;
  font-size:12px;
}

td:first-child,th:first-child{
  text-align:center;
}


`;


export const EmailPreviewCard = styled('a')`
position:relative;
display:block;
cursor:pointer;
padding:5px;

p.customerContact{
font-size:14px;
font-weight:500;
}

span.taskQueue, span.externalContact{
  font-size:12px;
  font-weight:300;
  }

p.emailSubject{
  font-size:13px;
  font-weight: bold;
  color: #0363e0;
}
p.emailDate{
  position:absolute;
  right:10px;
  top:5px;
  width:50px;
  word-wrap:break-word;
}

`