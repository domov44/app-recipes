import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, fetchUserAttributes, fetchAuthSession } from 'aws-amplify/auth';
import { getUrl } from 'aws-amplify/storage';
import Loading from '@/components/Loading';
import { getProfile } from '@/graphql/queries';
import { generateClient } from 'aws-amplify/api';
const UserContext = createContext();
const client = generateClient();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [profilePictureURL, setProfilePictureURL] = useState(null);
  const [cognitoGroups, setCognitoGroups] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(null);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const session = await fetchAuthSession();
       if (session.userSub) {
        const accessToken = session.tokens.accessToken.toString();
        const currentUser = await getCurrentUser();
        const userProfile = await getUserProfile(currentUser.userId);
        const cognitoGroups = session.tokens.idToken.payload['cognito:groups'];
        setCognitoGroups(cognitoGroups && cognitoGroups.length > 0 ? cognitoGroups : null);
        setIsAdmin(cognitoGroups && cognitoGroups.includes('Admins'));
        const userAttributes = await fetchUserAttributes();
        setUser({
          ...userAttributes,
          age: userProfile.birthdate ? calculateAge(userProfile.birthdate) : 0,
          pseudo: currentUser ? currentUser.username : 'User',
          id: currentUser ? currentUser.userId : 0,
          profile: userProfile,
          accessToken,
        });
        setProfile(userProfile);
        setLoggedIn(true);
        fetchProfilePictureURL(userProfile.avatar);
        checkProfileCompletion(userProfile);
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
      const userProfile = await getUserProfile(currentUser.userId);
      const session = await fetchAuthSession();
      const accessToken = session.tokens.accessToken.toString();
      const cognitoGroups = session.tokens.idToken.payload['cognito:groups'];
      setCognitoGroups(cognitoGroups && cognitoGroups.length > 0 ? cognitoGroups : null);
      setIsAdmin(cognitoGroups && cognitoGroups.includes('Admins'));

      const userAttributes = await fetchUserAttributes();
      setUser({
        ...userAttributes,
        age: userProfile.birthdate ? calculateAge(userProfile.birthdate) : 0,
        pseudo: currentUser ? currentUser.username : 'User',
        id: currentUser ? currentUser.userId : 0,
        profile: userProfile,
        accessToken,
      });
      setProfile(userProfile);
      setLoggedIn(true);
      fetchProfilePictureURL(userProfile.avatar);
      checkProfileCompletion(userProfile);
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

  const updateUser = async (newUserData) => {
    try {
      setUser({ ...newUserData, age: calculateAge(newUserData.birthdate) });
      await refreshUser();
      console.log('User updated:', user);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
      throw error;
    }
  };

  const checkProfileCompletion = (profile) => {
    const requiredFields = ['name', 'surname'];
    const isComplete = requiredFields.every(field => profile[field] !== null && profile[field] !== '');
    setProfileCompleted(isComplete);
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
            accessLevel: 'public',
            expiresIn: 3600,
          },
        });
        setProfilePictureURL(imageObject.url);
      }
    } catch (error) {
      console.error('Error fetching profile avatar:', error);
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
      profileCompleted
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
