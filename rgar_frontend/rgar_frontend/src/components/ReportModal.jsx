import { Button, Modal, Input } from 'antd';
import { useState } from 'react';
import {faFlag} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const { TextArea } = Input;

export function ReportModal(props){

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  return (
    <>
        <div onClick={showModal}>
            <FontAwesomeIcon icon={faFlag}/>
            Report
        </div>
        <Modal title="Report content" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Report an issue</p>
            <TextArea placeholder="" autoSize />
        </Modal>
    
    </>
  );
};