import React, { useState } from 'react';
import { uploadData } from 'aws-amplify/storage';
import { useUser } from "@/utils/UserContext";
import Button from "./button/Button";
import Upload from "../ui/form/Upload";
import Stack from './wrapper/Stack';
import { CiImageOn } from 'react-icons/ci';
import { updateProfile } from '@/graphql/customMutations';
import { generateClient } from 'aws-amplify/api';
import {
    notifySuccess,
    notifyError,
} from './Toastify';

const client = generateClient();

export default function UploadFile({ onProgressChange, onUploadStart, onUploadEnd, maxSize, acceptedTypes, closePopup }) {
    const { user, fetchProfilePictureURL } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const [file, setFile] = useState(null);

    const handleImageDelete = () => {
        setFile(null);
    };

    const handleClick = async () => {
        setIsLoading(true);
        setIsDisable(true);
        try {
            await uploadFile();
        } catch (error) {
            console.error('An error occurred while uploading the file:', error);
            setIsLoading(false);
            notifyError("Erreur lors de l'upload du fichier");
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const uploadFile = async () => {
        if (!file) {
            notifyError('Sélectionnez un fichier avant de valider');
            return;
        }
        if (maxSize && file.size > maxSize) {
            notifyError('La taille du fichier dépasse la limite autorisée');
            return;
        }
        if (acceptedTypes) {
            const acceptedTypesArray = acceptedTypes.split(',').map(type => type.trim());
            const fileType = file.type;
            const isValidFileType = acceptedTypesArray.some(acceptedType => fileType.includes(acceptedType));
            if (!isValidFileType) {
                notifyError(`Le type de fichier ${fileType} n'est pas accepté`);
                return;
            }
        }
        try {
            if (onUploadStart) onUploadStart();
            const key = "images/" + user.profile.id;
            const result = await uploadData({
                key,
                data: file,
                options: {
                    accessLevel: 'public',
                    onProgress: async ({ transferredBytes, totalBytes }) => {
                        if (totalBytes) {
                            const progress = Math.round((transferredBytes / totalBytes) * 100);
                            if (onProgressChange) onProgressChange(progress);
                        }
                    }
                }
            });
            console.log('File uploaded successfully:', result);
            await waitForUploadCompletion(result);
            await handleUploadCompletion(key);
        } catch (error) {
            console.error('Error uploading file:', error);
            notifyError("Erreur lors de l'upload du fichier");
        } finally {
            if (onUploadEnd) onUploadEnd();
        }
    };

    const waitForUploadCompletion = async (uploadResult) => {
        while (uploadResult.state === 'IN_PROGRESS') {
            await new Promise(resolve => setTimeout(resolve, 500));
            uploadResult = await uploadResult.result;
        }
    };

    const handleUploadCompletion = async (key) => {
        try {
            await client.graphql({
                query: updateProfile,
                variables: {
                    input: {
                        id: user.profile.id,
                        owner: user.profile.id,
                        avatar: key
                    }
                }
            });
            console.log(key);
            await fetchProfilePictureURL(key);
            notifySuccess("Photo mise à jour");
            if (closePopup) closePopup();
        } catch (error) {
            console.error('Error handling upload completion:', error);
            setIsLoading(false);
            notifyError("Erreur lors de la mise à jour de la photo de profil");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Stack direction="column">
            <Upload
                icon={CiImageOn}
                variant="action"
                onFileDelete={handleImageDelete}
                name="image"
                accept={acceptedTypes}
                onChange={handleFileChange}
                text="Importer une photo"
            />
            {file && (<Button width="full-width" variant="primary" disable={isDisable} loading={isLoading} onClick={handleClick}>Valider</Button>)}
        </Stack>
    );
}