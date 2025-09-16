import { useEffect, useState, useRef, useMemo } from 'react';
import { Heading } from '@twilio-paste/core/heading';
import * as St from "./ProgressTrackerStyles";


type AsyncFunction = () => Promise<any>;
type AsyncOperation = {
    title: string;
    asyncFunction: AsyncFunction;
}

type Status = 'pending' | 'executing' | 'success' | 'failure';

interface ComponentProps {
    asyncOperations: AsyncOperation[];
    concurrency?: number;
    clearOperations: () => void;
}

const ProgressTracker = ({ asyncOperations, concurrency = 3,clearOperations }: ComponentProps) => {

    const [statuses, setStatuses] = useState<Status[]>(
        asyncOperations.map(() => 'pending')
    );

    useEffect(() => {
        let activeWorkers = 0;
        let index = 0;
        let isMounted = true;

        const executeNext = () => {
            if (!isMounted || index >= asyncOperations.length) {
                return;
            }

            if (activeWorkers < concurrency) {
                const currentIndex = index;
                const currentFunc = asyncOperations[currentIndex].asyncFunction;

                setStatuses(prevStatuses => {
                    const newStatuses = [...prevStatuses];
                    newStatuses[currentIndex] = 'executing';
                    return newStatuses;
                });

                activeWorkers++;
                index++;

                currentFunc()
                    .then(() => {
                        if (isMounted) {
                            setStatuses(prevStatuses => {
                                const newStatuses = [...prevStatuses];
                                newStatuses[currentIndex] = 'success';
                                return newStatuses;
                            });
                        }
                    })
                    .catch(() => {
                        if (isMounted) {
                            setStatuses(prevStatuses => {
                                const newStatuses = [...prevStatuses];
                                newStatuses[currentIndex] = 'failure';
                                return newStatuses;
                            });
                        }
                    })
                    .finally(() => {
                        activeWorkers--;
                        executeNext();
                    });

                executeNext();
            }
        };

        executeNext();

        return () => {
            isMounted = false; // Cleanup function to set the flag on unmount
        };
    }, [asyncOperations, concurrency]);

    const getStatusColor = (status: Status): string => {
        switch (status) {
            case 'success':
                return 'green';
            case 'failure':
                return 'red';
            case 'pending':
                return 'gray';
            case 'executing':
                return 'blue';
            default:
                return 'black';
        }
    };

    return (
        <St.ModalOverlay className="modal-overlay" onClick={()=>clearOperations()}>
            <St.ModalContainer onClick={(e) => e.stopPropagation()}>
                <St.ModalCloseBtn className="modal-close-button" onClick={()=>clearOperations()}>
                    &times;
                </St.ModalCloseBtn>
                <Heading as="h3" variant="heading30">
                        Bulk Operation Updates
                </Heading>
                <St.ProgressTrackerTable>
                    <thead>
                        <tr>
                            <th>Operation</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {statuses.map((status, i) => (
                            <tr key={i}>
                                <td >{asyncOperations[i].title}</td>
                                <td >
                                    <span style={{ color: getStatusColor(status), fontWeight: 'bold' }}>
                                        {status.toUpperCase()}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </St.ProgressTrackerTable>
            </St.ModalContainer>
        </St.ModalOverlay>
    )

};

export default ProgressTracker;