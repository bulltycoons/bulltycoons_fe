import React from 'react';
import { Modal } from 'semantic-ui-react';

const BullModal = ({ isOpen=false, setOpen=() => {}, title, children, trigger, closeBtn, ...props }) => {

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={isOpen}
            trigger={trigger}
            {...props}
        >
            {title && (
                <Modal.Header>
                    <div style={{flexDirection:'row'}}>
                        {title} 
                    </div>
                </Modal.Header>
            )}
            <Modal.Content>
                {children}
            </Modal.Content>
            {/* <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                Nope
                </Button>
                <Button
                content="Yep, that's me"
                labelPosition='right'
                icon='checkmark'
                onClick={() => setOpen(false)}
                positive
                />
            </Modal.Actions> */}
        </Modal>
    )

}

export default BullModal;