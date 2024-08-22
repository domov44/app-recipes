import { useState, useEffect } from 'react';
import { useUser } from '@/utils//UserContext.js';
import TextInput from '@/components/ui/form/TextInput.js';
import Hero from '@/components/ui/wrapper/Hero.js';
import Bento from '@/components/ui/wrapper/Bento.js';
import Title from '@/components/ui/textual/Title.js';
import Button from '@/components/ui/button/Button.js';
import { notifySuccess, notifyError } from '@/components/ui/Toastify';
import { CiCamera } from "react-icons/ci";
import TextHover from '@/components/ui/hover/TextHover.js';
import { updateProfile } from '@/graphql/customMutations';
import { generateClient } from 'aws-amplify/api';
import Form from '@/components/ui/form/Form.js';
import IconButton from '@/components/ui/button/IconButton.js';
import Stack from '@/components/ui/wrapper/Stack.js';
import FormContainer from '@/components/ui/wrapper/FormContainer.js';
import FormError from '@/components/ui/form/formError.js';
import { usePopup } from '@/utils/PopupContext';
import ProfilePicturePopup from '@/components/ui/popup/allPopups/ProfilePicturePopup.js';
import CompleteProfileRoutes from '@/hooks/login-gestion/CompleteProfileRoutes';
const client = generateClient();

const CompleteProfile = ({ onProgressChange, onUploadStart, onUploadEnd }) => {
  const { popups, openPopup, closePopup } = usePopup();
  const { user, isLoggedIn, updateUser, profilePictureURL } = useUser();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.profile.name);
      setSurname(user.profile.surname);
    }
  }, [user]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };


  const handleUpdateAttributes = async (event) => {
    event.preventDefault();

    if (!name || !surname) {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    try {
      const updatedProfile = await client.graphql({
        query: updateProfile,
        variables: {
          input: {
            id: user.profile.id,
            owner: user.profile.owner,
            name: name,
            surname: surname,
          }
        }
      });

      console.log('User attributes updated:', updatedProfile);

      const updatedProfileData = updatedProfile.data.updateProfile;

      await updateUser({
        ...user,
        profile: {
          ...user.profile,
          name: updatedProfileData.name,
          surname: updatedProfileData.surname,
        }
      });

      console.log('User updated:', user);
      notifySuccess("Profil validé");
    } catch (error) {
      console.log(error);
      notifyError("La modification a échouée");
    }
  };


  if (!isLoggedIn || !user) {
    return <div>Chargement...</div>;
  }

  return (
    <CompleteProfileRoutes>
      <Hero>
        <FormContainer direction="row" align="start" width="100%">
          <Bento width="450px" highlight="highlight" padding="40px"
            responsive={{
              mobilePadding: "20px"
            }}>
            <Form onSubmit={handleUpdateAttributes}>
              <Title level={3}>
                Nous avons besoin de quelques informations
              </Title>
              <Stack align="center" justify={"center"}>
                {profilePictureURL ? (
                  <TextHover
                    text="Changer de Photo de profil"
                    onClick={() =>
                      openPopup('popupProfilePicture')
                    }
                  >
                    <img src={profilePictureURL} className="user-picture" alt="Profile" />
                  </TextHover>
                ) : (
                  <IconButton
                    variant="action"
                    wtext="no"
                    onClick={() =>
                      openPopup('popupProfilePicture')
                    }
                  >
                    <CiCamera />
                  </IconButton>
                )}
              </Stack>
              <TextInput
                type="text"
                variant="blue"
                label="Prénom"
                value={name}
                onChange={handleNameChange}
              />
              <TextInput
                type="text"
                variant="blue"
                label="Nom"
                value={surname}
                onChange={handleSurnameChange}
              />
              <Button type='submit' width="full-width" variant="primary">Valider</Button>
              {error && <FormError variant="error">{error}</FormError>}
            </Form>
          </Bento>
        </FormContainer>
        <ProfilePicturePopup
          open={popups['popupProfilePicture']}
          onClose={() => closePopup('popupProfilePicture')}
          onProgressChange={onProgressChange}
          onUploadStart={onUploadStart}
          onUploadEnd={onUploadEnd}
        />
      </Hero>
    </CompleteProfileRoutes>
  );
}

export default CompleteProfile;