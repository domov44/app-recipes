// import React from 'react';
// import Button from '../components/ui/button/Button';
// import AnimationComponent from "../components/animation/Animation";
// import NotFoundAnimation from '../components/animation/storageAnimation/animation404screen.json';
// import Title from '../components/ui/textual/Title';
// import Text from '../components/ui/textual/Text';
// import Hero from '../components/box/section/Hero';
// import Stack from '../components/box/container/Stack';
// import { useUser } from '../contexts/UserContext';

// function NotFound() {
//   const { isLoggedIn } = useUser();
//   return (
//       <Hero align={"center"}>
//         <AnimationComponent animationData={NotFoundAnimation} position="relative" transform={"center"} height={"50vh"} />
//         <Stack direction={"column"} align={"center"}>
//           <Title level={1}>Page non trouvée</Title>
//           <Text>Désolé, la page que vous cherchez n'existe pas ou a été déplacée.</Text>
//           <Button
//             width="fit-content"
//             variant="primary"
//             to={isLoggedIn ? "/" : "/se-connecter"}
//           >
//             {isLoggedIn ? "Retour au dashboard" : "Retour à la page de connexion"}
//           </Button>
//         </Stack>
//       </Hero>
//   );
// }

// export default NotFound;
