import { forwardRef, useRef, useImperativeHandle } from "react";
import { EditorProvider, FloatingMenu, BubbleMenu } from '@tiptap/react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import ResizableImageExtension from './ImageResizeExtension';
import * as HTMLTemplates from "./HTMLEditorTemplates";
import {Toolbar,ButtonGroup,ToolbarBtn} from "./HTMLEditorStyles";


import { FormatAlignLeft, FormatAlignCenter, FormatAlignRight , FormatAlignJustify , FormatBold, FormatItalic, FormatUnderlined, Link as LinkIcon, AddPhotoAlternate, AddAPhoto ,Group, LocalPhone, Undo, Redo ,LocalParking} from  '@material-ui/icons';



export const ExtendedImage = Image.extend({
  addAttributes() {
    return {
      src: {
        default: '',
      },
      alt: {
        default: undefined,
      },
      title: {
        default: undefined,
      },
      width: {
        default: undefined,
      },
      height: {
        default: undefined,
      },
      style: {
        default: undefined,
      },
    }
  }
})


interface Props {
  initialValue: string;
}





const HTMLEditor = forwardRef((props:Props, ref) => {

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Image,
      ExtendedImage,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https']
      }),
      ResizableImageExtension
    ],
    content: props.initialValue,
  })


  

  if(editor==null){
    return null
  }


  useImperativeHandle(ref, () => ({

    getHtmlContent() {
      return editor.getHTML();
    }

  }));




  const addImage = () => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const addVacasaLogo = ()=>{
    const imageAttributes = {
      src: HTMLTemplates.imageLink,
      alt: '', 
      title: '', 
      width: 185, 
      height: 55,
      style:"margin:0px;"
    }
    editor.chain().focus().setImage(imageAttributes).run();
  }

  const addVacasaTeamName = ()=>{
    const teamName = window.prompt('Team Name');
    let isBold = false;
    if (confirm("Make text bold ?\nEither OK or Cancel.") == true) {
      isBold = true;
    } 

    const fontWeightStyle = isBold ? 'font-weight:700;' : 'font-weight:400;';

    const markup =  `<p dir="ltr" style=${HTMLTemplates.textParagraphStyle + fontWeightStyle}<span style=${HTMLTemplates.textSpanStyle + fontWeightStyle}>${teamName}</span></p>`;
    editor.chain().focus().insertContent(markup).run();
  }

  const addVacasaLink = ()=>{
    //const url = window.prompt('URL');
    //const displayText = window.prompt('Display Text');
    const url = "https://vacasa.com/";
    const displayText="vacasa.com";
    const markup = `<p dir="ltr" style=${HTMLTemplates.textParagraphStyle}><a href=${url} target="_blank"><span style=${HTMLTemplates.textSpanStyle}>${displayText}</span></a></p>`;
    editor.chain().focus().insertContent(markup).run();
  }

  const addVacasaPhoneNumber = ()=>{
    const phoneNumber = window.prompt('Phone Number');
    const additionalText = window.prompt('Additional Text',"Call");

    let markup;
    if(additionalText?.length==0){
      markup =  `<p dir="ltr" style=${HTMLTemplates.textParagraphStyle}><span style=${HTMLTemplates.textSpanStyle}>${phoneNumber}</span></p>`
    }
    else{
      markup = `<p dir="ltr" style=${HTMLTemplates.textParagraphStyle}><span style=${
        HTMLTemplates.textSpanStyle + 'font-weight:700;'
      }>${
        additionalText + ' '
      }</span><span style=${HTMLTemplates.textSpanStyle}>${phoneNumber}</span></p>`
    }
  editor.chain().focus().insertContent(markup).run();
  }



  const saveHtml = ()=> {

   
 
  }

  return (
   <div style={{height:"300px",width:"100%",overflow:"auto"}}>
     
      <Toolbar>
      <ButtonGroup>
        <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} >
          <Undo />
        </ToolbarBtn >
        <ToolbarBtn  onClick={() => editor.chain().focus().redo().run()} >
            <Redo />
        </ToolbarBtn >
       
        </ButtonGroup>
        <ButtonGroup>
        <ToolbarBtn  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}>
          H1
        </ToolbarBtn >
        <ToolbarBtn  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}>
          H2
        </ToolbarBtn >
        <ToolbarBtn  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}>
          H3
        </ToolbarBtn >
        <ToolbarBtn  onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? 'is-active' : ''}>
          P
        </ToolbarBtn >
        </ButtonGroup>
        <ButtonGroup>
        <ToolbarBtn  onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}>
          <FormatBold />
        </ToolbarBtn >
        <ToolbarBtn  onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}>
          <FormatItalic />
        </ToolbarBtn >
        <ToolbarBtn  onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'is-active' : ''}>
          <FormatUnderlined />
        </ToolbarBtn >
        </ButtonGroup>
        <ButtonGroup>
        <ToolbarBtn  onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}>
        <FormatAlignLeft  />
        </ToolbarBtn >
        <ToolbarBtn  onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}>
        <FormatAlignCenter  />
        </ToolbarBtn >
        <ToolbarBtn  onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}>
          <FormatAlignRight />
        </ToolbarBtn >
        <ToolbarBtn  onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}>
          <FormatAlignJustify />
        </ToolbarBtn >
        </ButtonGroup>

        <ButtonGroup>
        
        <ToolbarBtn  onClick={addImage} >
          <AddPhotoAlternate />
        </ToolbarBtn >
        </ButtonGroup>
        <ButtonGroup>
        <ToolbarBtn  onClick={addVacasaLink}>
          <LinkIcon />
        </ToolbarBtn >
        <ToolbarBtn  onClick={addVacasaLogo}>
            <AddAPhoto />
        </ToolbarBtn >
        <ToolbarBtn  onClick={addVacasaTeamName}>
            <Group />
        </ToolbarBtn >
        <ToolbarBtn  onClick={addVacasaPhoneNumber}>
            <LocalPhone />
        </ToolbarBtn >
        </ButtonGroup>
        <ButtonGroup>

        </ButtonGroup>

      </Toolbar>  
     
   
      <EditorContent editor={editor} />
   </div>
  )
})

export default HTMLEditor