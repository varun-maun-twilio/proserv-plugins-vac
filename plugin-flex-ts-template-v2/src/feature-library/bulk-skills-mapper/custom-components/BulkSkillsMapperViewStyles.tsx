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
border:solid #ccc 1px;
margin-bottom:10rem;


td{
  vertical-align:top;
  padding:5px 10px;
  border-left:solid #ccc  1px;
  border-top:solid #ccc  1px;
}

td:first-child {
  border-left: none;
}

th {
  vertical-align:top;
  padding:5px 10px;
  border-left:solid #ccc  1px;
  border-top:none;
  text-align:left;
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
width: 500px;
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
width: 500px;
display: flex;
padding: 10px 0px;

p{
  flex:1;
}
`

