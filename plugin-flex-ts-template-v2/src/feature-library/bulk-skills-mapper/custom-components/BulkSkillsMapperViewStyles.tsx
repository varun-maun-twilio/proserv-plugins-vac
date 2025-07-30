import { styled } from '@twilio/flex-ui';

export const BulkSkillsMapperViewWrapper = styled('div')`
  display: flex;
  height: 100%;
  overflow-y: scroll;
  flex-flow: column;
  flex-grow: 1;
  flex-shrink: 1;
`;

export const BulkSkillsTable = styled('table')`
width:100%;
border-collapse:separate;
border:solid #e1e3ea 1px;
margin-bottom:1rem;


td{
  vertical-align:top;
  padding:5px 10px;
  border-left:solid #e1e3ea  1px;
  border-top:solid #e1e3ea  1px;
  max-width:45%;
  width:45%;
  padding: 1rem;
}

td:first-child {
  border-left: none;
}

th {
  vertical-align: top;
  padding: 5px 10px;
  border-left: 1px solid #e1e3ea;
  border-top: none;
  text-align: center;
  padding: 1rem 0px;
  background: #f5f5f5;
  max-width:45%;
  width:45%;
}

th:first-child {
  border-left: none;
}

`

interface ChipProps{
  isSelected?:boolean;
}

export const ChipFilter = styled('div')<ChipProps>`
background: ${props => (props.isSelected ?   `#06033B`: `#fff`)};
color:  ${props => (props.isSelected ? `#fff`:  `#06033B`)};
display: inline-flex;
border: 1px solid ${props => (props.isSelected ?  `#cce4ff`: `#06033B` )};
padding: 10px 20px;
border-radius: 2rem;
float:left;
margin-right:1rem;

& button:nth-child(2){
  border-radius:50%;
  background:#fff;
  margin-left:1rem;
}

`;

export const TextFilter = styled('div')`
display:inline-flex;
float: left;
margin-right:1rem;
`;


export const ListWrapper = styled('div')`
width: 100%;
height: 300px;
overflow: auto;
border: 1px solid #f5f5f5;

li{
  padding: 10px;
  display: flex;
  border-bottom: 1px solid #f5f5f5;
}

span{
display:block;
flex:1;
}

span.title{
  line-height:1.6rem;
}


div.list-action-btn{

}

input{
  margin-right:20px;
}
`;



export const ListFooter = styled('div')`
width: 100%;
display: flex;
padding: 2rem 0rem;
font-size: 1rem;

p{
  flex:1;
}
`

export const WidgetCard = styled('div')`
padding: 20px;
border: 1px solid #e1e3ea;
border-radius:1rem;
margin: 0px auto;
margin-bottom:5rem;
width:90%
`

