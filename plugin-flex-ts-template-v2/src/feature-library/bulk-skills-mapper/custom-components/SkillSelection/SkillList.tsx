import { Manager } from '@twilio/flex-ui';
import { useEffect, useState, useRef, useMemo } from 'react';
import { Flex } from '@twilio-paste/core/flex';
import { Heading } from '@twilio-paste/core/heading';
import { Box } from '@twilio-paste/core/box';
import { Stack } from '@twilio-paste/core/stack';
import { Input } from '@twilio-paste/core/input';
import { Label } from '@twilio-paste/core/label';
import { SearchIcon } from "@twilio-paste/icons/esm/SearchIcon";
import { Popover, PopoverContainer, PopoverButton, usePopoverState } from '@twilio-paste/core/popover';
import { Combobox } from '@twilio-paste/core/combobox';

import { ButtonGroup } from '@twilio-paste/core/button-group';
import { Button } from '@twilio-paste/core/button';
import { CloseIcon } from "@twilio-paste/icons/esm/CloseIcon";
import { BulkSkillsTable, ChipFilter, TextFilter, ListWrapper, ListFooter } from "../BulkSkillsMapperViewStyles";





interface ComponentProps {
    onSelectionChanged?: (selectedValues: string[]) => void;
}




const SkillList = (props: ComponentProps) => {


    const [selectedSkills, setSelectedSkills] = useState<any[]>([]);

    const [allSkills, setAllSkills] = useState<any[]>([]);
    const [skillSearchText, setSkillSearchText] = useState<string>("");


    const initialize = async () => {
        const skills = Manager.getInstance().serviceConfiguration.taskrouter_skills || [];
        const sortedSkills= skills.sort((a: any, b: any) => ('' + a.name.toUpperCase()).localeCompare(b.name.toUpperCase()))
        setAllSkills(sortedSkills);
    }

    useEffect(() => {
        initialize();
    }, []);


    const row = (skill: any) => {
        try {
            return (<li key={`skill-selection-${skill.name}`} >

                <span className="title" >{skill.name} { ((skill.multivalue==true)?`( Min:${skill.minimum}, Max:${skill.maximum} )`:"")}</span>

               

                <div className="list-action-btn">
                    <Button variant="primary" size="small"
                        onClick={() => {
                            setSelectedSkills(prevSkills => [...prevSkills, skill])
                        }}
                        disabled={(selectedSkills.findIndex(x => x.name == skill.name) > -1)}>
                        Add
                    </Button>
                </div>

            </li>
            )
        } catch (e) {
            return null;
        }
    }

    const selectedRow = (skill: any) => {
        try {
            return (
                <li key={`skill-selected-${skill.name}`} >

                    <span className="title" >{skill.name} { ((skill.multivalue==true)?`( Min:${skill.minimum}, Max:${skill.maximum})`:"")}</span>

                   
                    {
                         skill.multivalue==true &&
                         <input type="number" 
                         min={skill.minimum} 
                         max={skill.maximum} 
                         value={skill?.assigned || skill.minimum}
                         onChange={(e)=>updateSkillLevel(skill.name,Number(e.target.value))}
                         />
                       
                    }

                 
                    <div className="list-action-btn">
                        <Button variant="destructive" size="small"
                            onClick={() => {
                                setSelectedSkills(prevSkills => prevSkills.filter(w => w.name != skill.name))
                            }}
                        >
                            Remove
                        </Button>
                    </div>
                    <label >

                        <a
                        ></a>

                    </label>
                </li>
            )
        } catch (e) {
            return null;
        }
    }


    const visibleAvailableSkills = useMemo(
        () => {
            return ((skillSearchText != "") ?
                allSkills?.filter((w: any) => {
                    return (w.name).toUpperCase().indexOf(skillSearchText.toUpperCase()) > -1
                })
                : allSkills)
        },
        [skillSearchText, allSkills]
    );


    const visibleSelectedSkills = useMemo(
        () => {
            return [...selectedSkills].sort((a: any, b: any) => ('' + a.name.toUpperCase()).localeCompare(b.name.toUpperCase()))
            
        },
        [selectedSkills]
    );

    const addAllSkills = () => {

        setSelectedSkills(prevSkills => [...prevSkills, ...visibleAvailableSkills].reduce((acc, current) => {
            const x = acc.find((item: any) => item.name === current.name);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []))

    }

    const updateSkillLevel = (name:string,level:number) => {

        setSelectedSkills(prevSkills => prevSkills.map(s=>((s.name===name)?{...s,assigned:level}:s)));
    }

    const clearAllSkills = () => {
        setSelectedSkills([]);
    }


    return (

        <>

            <Heading as="h3" variant="heading30"  >Skill Selection</Heading>
            <BulkSkillsTable>
                <tbody>

                    <tr>
                        <th>

                            <Heading as="h4" variant="heading40" marginBottom="space0" >Available Skills</Heading>
                        </th>
                        <th>
                            <Heading as="h4" variant="heading40" marginBottom="space0" >Selected Skills</Heading>

                        </th>
                    </tr>
                    <tr>
                        <td>

                            <div >

                                <TextFilter>
                                    <Input type="text"
                                        insertBefore={<SearchIcon decorative={false} size="sizeIcon20" title="Search" />}
                                        placeholder="Search"
                                        onChange={(e) => { setSkillSearchText(e.target.value) }}
                                        value={skillSearchText} />
                                </TextFilter>

                            </div>

                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>

                            <ListWrapper >

                                <ul>
                                    {
                                        visibleAvailableSkills.map(w => row(w))
                                    }

                                </ul>


                            </ListWrapper>
                            <ListFooter>
                                <p>Showing {visibleAvailableSkills.length} Results</p>
                                <Button variant="link" onClick={() => addAllSkills()}>( Add All )</Button>
                            </ListFooter>
                        </td>
                        <td>
                            <ListWrapper >

                                <ul>
                                    {
                                        visibleSelectedSkills?.map(w => selectedRow(w))
                                    }

                                </ul>
                            </ListWrapper>
                            <ListFooter>
                                <p>Selected {visibleSelectedSkills.length} Skills</p>
                                <Button variant="destructive_link" onClick={() => clearAllSkills()}>( Remove All )</Button>
                            </ListFooter>
                        </td>
                    </tr>
                </tbody>
            </BulkSkillsTable>











        </>

    );
};

export default SkillList;
