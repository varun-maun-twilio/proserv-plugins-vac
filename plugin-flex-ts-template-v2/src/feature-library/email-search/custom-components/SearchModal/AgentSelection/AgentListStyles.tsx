import { styled } from '@twilio/flex-ui';


export const TextFilter = styled('div')`
display:inline-flex;
float: left;
margin-right:1rem;
`;


export const ListWrapper = styled('div')`
width: 100%;
height:calc(90vh - 370px);
overflow: auto;
border: 1px solid #f5f5f5;

li{
  padding: 10px;
  display: flex;
  border-bottom: 1px solid #f5f5f5;
  position:relative;
  padding-bottom:25px;
}

span{
display:block;
flex:1;
}

span.title{
  line-height:1.6rem;
}

span.subtitle{
  position: absolute;
  bottom: 2px;
  font-size: 10px;
  left: 10px;
  display: block;
  padding: 2px 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
}


div.list-action-btn{

}

input{
  margin-right:20px;
}
`;