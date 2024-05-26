// ConfirmDialog.js
import React, { useEffect, useRef } from 'react';
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
    // Toujours créer la référence du conteneur de dialogue
    const dialogContainerRef = useRef(null);

    // Vérifier si le code s'exécute côté client
    const isClient = typeof window !== 'undefined';

    // Utiliser useEffect conditionnellement pour gérer l'ajout et la suppression du conteneur de dialogue
    useEffect(() => {
        if (isClient) {
            // Créer le conteneur de dialogue si ce n'est pas encore fait
            if (!dialogContainerRef.current) {
                dialogContainerRef.current = document.createElement('div');
            }

            const appContainer = document.getElementById('__next');
            appContainer.appendChild(dialogContainerRef.current);

            return () => {
                appContainer.removeChild(dialogContainerRef.current);
            };
        }
    }, [isClient]); // Utiliser [isClient] comme dépendance

    // Si le dialogue n'est pas ouvert ou que le conteneur n'est pas prêt, retourner null
    if (!open || !isClient || !dialogContainerRef.current) {
        return null;
    }

    // Rendu du composant avec createPortal
    return createPortal(
        <>
            <Overlay />
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
        dialogContainerRef.current
    );
}

export default ConfirmDialog;
