import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Dialog from '../components/ui/popup/Dialog';
import Title from '../components/ui/textual/Title';
import Text from '../components/ui/textual/Text';
import IconButton from '../components/ui/button/IconButton';
import Overlay from '../components/ui/popup/Overlay';
import { CiTrash } from "react-icons/ci";

function ConfirmDialog({
    variant,
    open,
    title,
    content,
    confirmLabel,
    onConfirm,
    onCancel,
}) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsClient(true);
        }
    }, []);

    useEffect(() => {
        if (isClient) {
            const body = document.body;
            if (open) {
                body.classList.add('no-scroll');
            } else {
                body.classList.remove('no-scroll');
            }

            return () => {
                body.classList.remove('no-scroll');
            };
        }
    }, [open, isClient]);

    if (!isClient) return null;
    
    const appContainer = document.getElementById('__next');
    if (!appContainer || !open) return null;

    return createPortal(
        <>
            <Overlay onClick={onCancel}/>
            <Dialog open={open} onCancel={onCancel} variant={variant}>
                <form className="dialog-content" onSubmit={onConfirm} method="dialog">
                    <Title level={3}>{title || "Confirmation"}</Title>
                    <Text>{content || "Voulez-vous vraiment effectuer cette action ?"}</Text>
                    <div className='button-container'>
                        <IconButton width="fit-content" variant="basique" onClick={onCancel}>Pas maintenant</IconButton>
                        <IconButton type='submit' width="fit-content" variant="danger"><CiTrash />{confirmLabel || 'Oui, je confirme'}</IconButton>
                    </div>
                </form>
            </Dialog>
        </>,
        appContainer
    );
}

export default ConfirmDialog;
