import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, fetchUserAttributes, fetchAuthSession } from 'aws-amplify/auth';
import { getUrl } from 'aws-amplify/storage';
import Loading from '@/components/Loading';
import { getProfile } from '@/graphql/queries';
import { generateClient } from 'aws-amplify/api'; // Assurez-vous que cela est correctement configuré et importé.

const UserContext = createContext();
const client = generateClient();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [profilePictureURL, setProfilePictureURL] = useState(null);
  const [cognitoGroups, setCognitoGroups] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const session = await fetchAuthSession();
        if (session.userSub) {
          const currentUser = await getCurrentUser();
          console.log(currentUser);
          const userProfile = await getUserProfile(currentUser.userId);
          console.log(userProfile);
          const cognitoGroups = session.tokens.idToken.payload['cognito:groups'];
          console.log(cognitoGroups);
          setCognitoGroups(cognitoGroups && cognitoGroups.length > 0 ? cognitoGroups : null);
          setIsAdmin(cognitoGroups && cognitoGroups.includes('Admins'));

          const userAttributes = await fetchUserAttributes();
          setUser({
            ...userAttributes,
            age: userProfile.birthdate ? calculateAge(userProfile.birthdate) : 0,
            pseudo: currentUser ? currentUser.username : 'User',
            id: currentUser ? currentUser.userId : 0,
            profile: userProfile,
          });
          setProfile(userProfile);
          setLoggedIn(true);
          fetchProfilePictureURL(userAttributes.picture);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'état d\'authentification :', error);
        setLoggedIn(false);
      }
    };

    checkAuthState();
  }, []);

  const refreshUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      console.log(currentUser);
      const userProfile = await getUserProfile(currentUser.userId);
      console.log(userProfile);
      const session = await fetchAuthSession();
      const cognitoGroups = session.tokens.idToken.payload['cognito:groups'];
      console.log(cognitoGroups);
      setCognitoGroups(cognitoGroups && cognitoGroups.length > 0 ? cognitoGroups : null);
      setIsAdmin(cognitoGroups && cognitoGroups.includes('Admins'));

      const userAttributes = await fetchUserAttributes();
      setUser({
        ...userAttributes,
        age: userProfile.birthdate ? calculateAge(userProfile.birthdate) : 0,
        pseudo: currentUser ? currentUser.username : 'User',
        id: currentUser ? currentUser.userId : 0,
        profile: userProfile,
      });
      setProfile(userProfile);
      setLoggedIn(true);
      fetchProfilePictureURL(userAttributes.picture);
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'état d\'authentification :', error);
      setLoggedIn(false);
    }
  };

  const login = () => {
    refreshUser();
    setLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    setLoggedIn(false);
    setProfilePictureURL(null);
    setIsAdmin(false);
  };

  const updateUser = (newUserData) => {
    setUser({ ...newUserData, age: calculateAge(newUserData.birthdate) });
  };

  const calculateAge = (birthdate) => {
    if (!birthdate || typeof birthdate !== 'string') {
      return 0;
    }
    const parts = birthdate.split('-');
    if (parts.length !== 3) {
      return 0;
    }

    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    const birthDate = new Date(year, month, day);

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };


  const fetchProfilePictureURL = async (pictureKey) => {
    try {
      if (pictureKey) {
        const imageObject = await getUrl({
          key: pictureKey,
          options: {
            accessLevel: 'private',
            expiresIn: 3600,
          },
        });
        setProfilePictureURL(imageObject.url);
      }
    } catch (error) {
      console.error('Error fetching profile picture:', error);
    }
  };

  async function getUserProfile(id) {
    try {
      const profileTarget = await client.graphql({
        query: getProfile,
        variables: { id: id },
      });
      return profileTarget.data.getProfile;
    } catch (error) {
      console.error('Erreur lors de la récupération du profil utilisateur :', error);
    }
  }

  return (
    <UserContext.Provider value={{
      isLoggedIn,
      user,
      profile,
      profilePictureURL,
      login,
      logout,
      updateUser,
      refreshUser,
      fetchProfilePictureURL,
      cognitoGroups,
      isAdmin,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
