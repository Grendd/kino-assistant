import React, { useEffect, useRef } from 'react';
import './styles.scss';

interface ModalProps {
    show: boolean
    setShow: (e: any) => void
    children?: any
}

const Modal = ({show, setShow, children}: ModalProps) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const clickOutsideContent = (e: MouseEvent) => {
            if (e.target === modalRef.current) {
                setShow(e);
            }
        };
        window.addEventListener('click', clickOutsideContent);
        return () => {
            window.removeEventListener('click', clickOutsideContent);
        };
    }, [show, setShow, children]);

    return <div ref={modalRef} className={`modal ${show ? 'active' : ''}`}>
        <div className="modal__content">
            {<span onClick={(e) => setShow(e)} className="modal__close">&times;</span>}
            {children}
        </div>
    </div>;
};

export const ModalHeader = ({children}: {children: any}) => {
    return <div className="modal__header">
        {children}
    </div>
}

export const ModalBody = ({children}: {children: any}) => {
    return <div className="modal__body">
        {children}
    </div>
}

export const ModalFooter = ({children}: {children: any}) => {
    return <div className="modal__footer">
        {children}
    </div>
}

export default Modal;
