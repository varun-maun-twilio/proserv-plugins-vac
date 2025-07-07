import { styled } from '@twilio/flex-ui';

export const SignatureManagementViewWrapper = styled('div')`
  display: flex;
  height: 100%;
  overflow-y: scroll;
  flex-flow: column;
  flex-grow: 1;
  flex-shrink: 1;
`;

export const SignatureAddBar = styled('div')`
 width:100%;
 background:#f5f5f5;
 margin-bottom:2rem;
 padding:20px;
`;

export const SignatureTable = styled('table')`
box-sizing: border-box;
border-collapse: separate;
border-color: rgb(225, 227, 234);
border-spacing: 0px;
border-style: solid;
border-width: 1px;
table-layout: auto;
width: 100%;

 thead{
  background-color: rgb(249, 249, 250);
  color: rgb(96, 107, 133);
  box-sizing: border-box;
 }

 tbody{
  background-color: rgb(255, 255, 255);
  box-sizing: border-box;
  color: rgb(18, 28, 45);
 }
`;

export const SignatureTableHeaderCell = styled('th')`
box-sizing: border-box;
border-bottom: 1px solid rgb(225, 227, 234);
font-size: 0.875rem;
line-height: 1.25rem;
font-weight: 600;
padding: 0.75rem 1rem;
position: relative;
text-align: left;
vertical-align: inherit;
color: inherit;
`;
export const SignatureTableBodyCell = styled('td')`
box-sizing: border-box;
    border-style: solid;
    border-color: rgb(225, 227, 234);
    border-width: 0px 0px 1px;
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding: 1rem;
    position: relative;
    text-align: left;
    vertical-align: inherit;
    overflow-wrap: break-word;
    color: inherit;
`;

export const HTMLEditorWrapper = styled('div')`

border:1px solid #ccc;
padding:5px;
border-radius:5px;

h1 {
  display: block;
  font-size: 2em;
  margin-top: 0.67em;
  margin-bottom: 0.67em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}

h2 {
  display: block;
  font-size: 1.5em;
  margin-top: 0.83em;
  margin-bottom: 0.83em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}

h3 {
  display: block;
  font-size: 1.17em;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}

h4 {
  display: block;
  font-size: 1em;
  margin-top: 1.33em;
  margin-bottom: 1.33em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}

h5 {
  display: block;
  font-size: .83em;
  margin-top: 1.67em;
  margin-bottom: 1.67em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}

h6 {
  display: block;
  font-size: .67em;
  margin-top: 2.33em;
  margin-bottom: 2.33em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}

strong {
  font-weight: bold;
}

em {
  font-style: italic;
}





`;