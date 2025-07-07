import { styled } from '@twilio/flex-ui';

export const Toolbar = styled('div')`
  display: flex;
  width: 100%;
`;

export const ButtonGroup = styled('div')`
  display: flex;
  flex:1;
  border-left:1px solid #ccc;
  padding:10px 20px;
`;


export const ToolbarBtn = styled('button')`
box-sizing: border-box;
width: auto;
appearance: none;
background: none rgb(255, 255, 255);
display: inline-block;
border: none;
outline: none;
transition: background-color 100ms ease-in, box-shadow 100ms ease-in, color 100ms ease-in;
font-family: inherit;
font-weight: 600;
text-decoration: none;
position: relative;
margin: 2px;
border-radius: 8px;
cursor: pointer;
color: rgb(18, 28, 45);
box-shadow: rgb(202, 205, 216) 0px 0px 0px 1px;
padding: 0.25rem 0.5rem;
font-size: 0.875rem;
line-height: 1.25rem;

&.is-active{
  background: none rgb(0, 109, 250);
  color: rgb(255, 255, 255);
}
`;

