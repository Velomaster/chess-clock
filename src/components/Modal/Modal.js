import React from "react";
import Modal from 'react-bootstrap/Modal';

const modal = (props) => {
    return (
        <div>
            <Modal 
                style={{border: "0"}}
                size="lg" 
                show={props.timeout} 
                centered
                onHide={()=>{props.hideGameResults()}} >
                {props.children}
            </Modal>
        </div>
    )
}

export default modal;
