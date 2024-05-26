import React, {createContext, useContext, useState, useEffect} from 'react';
import {getCurrentUser, fetchUserAttributes, fetchAuthSession} from 'aws-amplify/auth';
import {getUrl} from "aws-amplify/storage";
import Loading from '@/components/Loading';

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [isLoggedIn, setLoggedIn] = useState(null);
  const [user, setUser] = useState(null);
  const [profilePictureURL, setProfilePictureURL] = useState(null);
  const [cognitoGroups, setCognitoGroups] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        await getCurrentUser();
        const session = await fetchAuthSession();
        const cognitoGroups = session.tokens.idToken.payload["cognito:groups"];
        setCognitoGroups(cognitoGroups && cognitoGroups.length > 0 ? cognitoGroups : null);
        setIsAdmin(cognitoGroups && cognitoGroups.includes('Admin'));
        const currentUser = await fetchUserAttributes();
        setUser({...currentUser, age: (currentUser.birthdate ? calculateAge(currentUser.birthdate) : 0)});
        setLoggedIn(true);
        fetchProfilePictureURL(currentUser.picture);
      } catch (error) {
        setLoggedIn(false);
      }
    };
    checkAuthState();
  }, []);

  const refreshUser = async () => {
    try {
      const session = await fetchAuthSession();
      const cognitoGroups = session.tokens.idToken.payload["cognito:groups"];
      setCognitoGroups(cognitoGroups && cognitoGroups.length > 0 ? cognitoGroups : null);
      setIsAdmin(cognitoGroups && cognitoGroups.includes('Admin'));
      const currentUser = await fetchUserAttributes();
      setUser({...currentUser, age: calculateAge(currentUser.birthdate)});
      setLoggedIn(true);
      fetchProfilePictureURL(currentUser.picture);
    } catch (error) {
      console.log('Erreur lors de la mise à jour des informations utilisateur :', error);
    }
  };

  const login = () => {
    refreshUser();
    setLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setLoggedIn(false);
    setProfilePictureURL(null);
    setIsAdmin(false);
  };

  const updateUser = (newUserData) => {
    setUser({...newUserData, age: calculateAge(newUserData.birthdate)});
  };

  const calculateAge = (birthdate) => {
    const parts = (birthdate || '').split('/');
    const birthDate = new Date(parts[2], parts[1] - 1, parts[0]);

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
            expiresIn: 3600
          }
        });
        setProfilePictureURL(imageObject.url);
      }
    } catch (error) {
      console.error('Error fetching profile picture:', error);
    }
  };

  if (isLoggedIn === null) {

    return <Loading/>;
  }

  return (
      <UserContext.Provider value={{
        isLoggedIn,
        user,
        profilePictureURL,
        login,
        logout,
        updateUser,
        refreshUser,
        fetchProfilePictureURL,
        cognitoGroups,
        isAdmin
      }}>
        {children}
      </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
