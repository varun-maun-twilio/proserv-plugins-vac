import { useEffect, useState, useRef } from 'react';
import { Template } from '@twilio/flex-ui';
import { Flex } from '@twilio-paste/core/flex';
import { Heading } from '@twilio-paste/core/heading';
import { Box } from '@twilio-paste/core/box';
import { Stack } from '@twilio-paste/core/stack';
import { Combobox } from '@twilio-paste/core/combobox';
import { Button } from '@twilio-paste/core/button';
import { Modal, ModalBody, ModalFooter, ModalFooterActions, ModalHeader, ModalHeading } from '@twilio-paste/core/modal';
import { AlertDialog } from '@twilio-paste/core/alert-dialog';
import { Spinner } from "@twilio-paste/core";
import {Label} from '@twilio-paste/core/label';
import { LoadingIcon } from "@twilio-paste/icons/esm/LoadingIcon";


import { signatureUtils } from '../utils/SignatureUtils';
import TaskRouterService, { Queue } from '../../../utils/serverless/TaskRouter/TaskRouterService';

import { StringTemplates } from '../flex-hooks/strings';

import { SignatureManagementViewWrapper, SignatureTable, SignatureTableHeaderCell, SignatureTableBodyCell, SignatureAddBar, HTMLEditorWrapper } from './SignatureManagementViewStyles';
import HTMLEditor from './HTMLEditor';


const delay = (millisec: number) => {
  new Promise(resolve => {
    setTimeout(() => { resolve('') }, millisec);
  })
}

const SignatureManagementView = () => {

  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [signatureMap, setSignatureMap] = useState<any[]>([]);
  const [queues, setQueues] = useState<Queue[]>([]);
  const [queueSelectOptions, setQueueSelectOptions] = useState<string[]>([]);


  const htmlEditorRef = useRef<any>();
  const [isEditSignatureModalOpen, setEditSignatureModalOpen] = useState<boolean>(false);
  const [editSignatureModeCreate, setEditSignatureModeCreate] = useState<boolean>(false);
  const [editSignatureQueue, setEditSignatureQueue] = useState<string|null>(null);
  const [editSignatureInitialValue, setEditSignatureInitialValue] = useState<string>("");


  const loadAllSignatures = async () => {
    setShowLoading(true);
    const signatures = await signatureUtils.getSyncMap("emailSignatures");
    console.error(signatures);
    setSignatureMap(signatures);
    setShowLoading(false);
  }
  const loadQueues = async () => {
    const qList = await TaskRouterService.getQueues();
    setQueues(qList || []);
    setQueueSelectOptions((qList || []).map(a => a.friendlyName));
  }


  const initialize = async () => {
    loadQueues();
    loadAllSignatures();
  }

  useEffect(() => {


    initialize();

  }, []);

  useEffect(() => {

  }, []);




  const loadSearchQueueSelectOptions = (inputValue: string | undefined) => {

    if (inputValue != undefined) {
      setQueueSelectOptions(queues.map(q => q.friendlyName).filter(item => item.toLowerCase().startsWith(inputValue.toLowerCase())));
    }


  }

  const openSignatureEditModal = (queue: string|null) => {
    if(queue!=null){
      setEditSignatureQueue(queue);
      let initialValue = signatureMap.filter(item => item.key == queue)?.at(0)?.data?.html || "<span>Edit This</span>"
      setEditSignatureInitialValue(initialValue)
      setEditSignatureModeCreate(false);
    }
    else{
      setEditSignatureModeCreate(true);
    }
    setEditSignatureModalOpen(true);

  }

  const saveSignature = async () => {

    const htmlContent = htmlEditorRef?.current?.getHtmlContent();
    console.error({ htmlContent });

    if(editSignatureQueue!=null){

    await signatureUtils.saveSyncMapItem("emailSignatures", editSignatureQueue, { "html": htmlContent });
    }

    setEditSignatureQueue(null);
    setEditSignatureModalOpen(false);

    await delay(4000);

    loadAllSignatures();

  }

  const dismissSignatureEditModal = () => {
    setEditSignatureModalOpen(false);
  }


  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [queueForDelete, setQueueForDelete] = useState<string>("");

  const handleDeleteSignatureDeleteBtnClick = (queueName: string) => {
    setIsDeleteConfirmationOpen(true);
    setQueueForDelete(queueName);
  }

  const deleteSignature = async () => {


    await signatureUtils.deleteSyncMapItem("emailSignatures", queueForDelete);

    setIsDeleteConfirmationOpen(false);
    loadAllSignatures();

  }


  return (

    <SignatureManagementViewWrapper>

      <Flex margin="space50" marginBottom="space0" element="SIGNATURE_MANAGEMENT_VIEW_WRAPPER" vertical grow shrink>
        <Flex width="100%">
          <Flex>
            <Heading as="h2" variant="heading20" >
              <Template code={StringTemplates.SignatureManagement} />
            </Heading>
          </Flex>
          <Flex>
          <Button variant="secondary_icon" size="reset" onClick={()=>loadAllSignatures()}>
              <LoadingIcon decorative={false} size="sizeIcon40" title="Refresh" />
            </Button>
            </Flex>
          <Flex grow hAlignContent="right">
          <Button variant="primary" onClick={()=>{
             openSignatureEditModal(null);
          }}>Create New Signature</Button>
          </Flex>
        </Flex>
       

        {
          showLoading && (
            <Flex hAlignContent="center" vertical padding="space60" width="100%">
              <Spinner size="sizeIcon110" decorative={false} title="Loading" />
            </Flex>)
        }
        {!showLoading && (signatureMap == null || signatureMap.length == 0) && <p>No Signatures Configured</p>}
        {!showLoading && signatureMap != null && signatureMap.length > 0 &&
          <SignatureTable>
            <thead>
              <tr>
                <SignatureTableHeaderCell>Queue</SignatureTableHeaderCell>
                <SignatureTableHeaderCell>Signature</SignatureTableHeaderCell>
                <SignatureTableHeaderCell>Edit</SignatureTableHeaderCell>
                <SignatureTableHeaderCell>Delete</SignatureTableHeaderCell>
              </tr>
            </thead>
            <tbody>
             
              {signatureMap.map((item, iter) => (
                <tr key={`table-row-${iter}`} >
                  <SignatureTableBodyCell>{item.key}</SignatureTableBodyCell>
                  <SignatureTableBodyCell><HTMLEditorWrapper dangerouslySetInnerHTML={{ __html: item?.data?.html || "<span>n/a</span>" }} /></SignatureTableBodyCell>
                  <SignatureTableBodyCell>
                    <Button variant="link" onClick={() => { openSignatureEditModal(item.key) }}>
                      Edit
                    </Button>
                  </SignatureTableBodyCell>
                  <SignatureTableBodyCell>
                    <Button variant="destructive_link" onClick={() => { handleDeleteSignatureDeleteBtnClick(item.key) }}>
                      Delete
                    </Button>
                  </SignatureTableBodyCell>

                </tr>
              ))}

            </tbody>

          </SignatureTable>
        }



        <Modal ariaLabelledby={"signatureEditModal"} isOpen={isEditSignatureModalOpen} onDismiss={dismissSignatureEditModal} size="default">
          <ModalHeader>
            <ModalHeading as="h3" >
              Configure Signature 
            </ModalHeading>
          </ModalHeader>
          <ModalBody>

          <Combobox
              autocomplete
              selectedItem={editSignatureQueue}
              items={queueSelectOptions}
              labelText="Select Queue"
              onInputValueChange={({ inputValue }) => {
                loadSearchQueueSelectOptions(inputValue);
              }}
              onSelectedItemChange={changes => {
                setEditSignatureQueue(changes.selectedItem);
              }}
              disabledItems={signatureMap.map(item => item.key)}
              disabled={editSignatureModeCreate==false && editSignatureQueue!=null}
            />

            
          <br />

          <Label htmlFor="">Signature</Label>

            <HTMLEditorWrapper>
              <HTMLEditor ref={htmlEditorRef} initialValue={editSignatureInitialValue} />
            </HTMLEditorWrapper>
          </ModalBody>
          <ModalFooter>
            <ModalFooterActions>
              <Button variant="secondary" onClick={dismissSignatureEditModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => saveSignature()}>Save</Button>
            </ModalFooterActions>
          </ModalFooter>
        </Modal>

        <AlertDialog
          heading="Delete Signature?"
          isOpen={isDeleteConfirmationOpen}
          onConfirm={() => { deleteSignature() }}
          onConfirmLabel="Delete"
          onDismiss={() => { setIsDeleteConfirmationOpen(false) }}
          onDismissLabel="Cancel"
          destructive
        >
          Are you sure you want to delete the signature for the queue {queueForDelete}
        </AlertDialog>

      </Flex>
    </SignatureManagementViewWrapper>
  );
};

export default SignatureManagementView;
