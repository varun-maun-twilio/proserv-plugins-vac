import React, { useState, useMemo, useRef, useEffect } from 'react';
import {Text } from "@twilio-paste/core";
import { Combobox } from '@twilio-paste/core/combobox';

import useWorkerAPI from "../../../data-hooks/useWorkerAPI";

interface Props {
    value: any;
    setSelectedValue: (agr0: any) => void;
}

const WorkerSelector = ({ value = [], setSelectedValue }: Props) => {

    const {
        data: allWorkerObjs,
        loading
    } = useWorkerAPI({}, 100);

    const [selectedWorker, setSelectedWorker] = useState<any | null>(null);

    /*
    useEffect(() => {
        if (value != null) {
            setSelectedWorker(value);
        }
    }, [value])

    */




    return (
        <>
        {!loading && allWorkerObjs?.length>0 &&
        <Combobox items={allWorkerObjs} labelText="Select Agent"
            onSelectedItemChange={changes => {
                setSelectedWorker(changes.selectedItem);
                setSelectedValue(changes.selectedItem);

            }}
            itemToString={w => w.friendly_name}
            optionTemplate={(item) => (
                <Text as="span">
                    {item.friendly_name}
                </Text>
            )}

            selectedItem={selectedWorker}
        />
            }
        {JSON.stringify(allWorkerObjs,null,2)}
        </>
    );
};

export default WorkerSelector;