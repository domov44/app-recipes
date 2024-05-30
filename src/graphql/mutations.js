/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      avatar
      description
      birthdate
      recipes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      avatar
      description
      birthdate
      recipes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      avatar
      description
      birthdate
      recipes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createRecipe = /* GraphQL */ `
  mutation CreateRecipe(
    $input: CreateRecipeInput!
    $condition: ModelRecipeConditionInput
  ) {
    createRecipe(input: $input, condition: $condition) {
      id
      title
      image
      userID
      steps
      ingredients {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateRecipe = /* GraphQL */ `
  mutation UpdateRecipe(
    $input: UpdateRecipeInput!
    $condition: ModelRecipeConditionInput
  ) {
    updateRecipe(input: $input, condition: $condition) {
      id
      title
      image
      userID
      steps
      ingredients {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteRecipe = /* GraphQL */ `
  mutation DeleteRecipe(
    $input: DeleteRecipeInput!
    $condition: ModelRecipeConditionInput
  ) {
    deleteRecipe(input: $input, condition: $condition) {
      id
      title
      image
      userID
      steps
      ingredients {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createIngredient = /* GraphQL */ `
  mutation CreateIngredient(
    $input: CreateIngredientInput!
    $condition: ModelIngredientConditionInput
  ) {
    createIngredient(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateIngredient = /* GraphQL */ `
  mutation UpdateIngredient(
    $input: UpdateIngredientInput!
    $condition: ModelIngredientConditionInput
  ) {
    updateIngredient(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteIngredient = /* GraphQL */ `
  mutation DeleteIngredient(
    $input: DeleteIngredientInput!
    $condition: ModelIngredientConditionInput
  ) {
    deleteIngredient(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createRecipeIngredient = /* GraphQL */ `
  mutation CreateRecipeIngredient(
    $input: CreateRecipeIngredientInput!
    $condition: ModelRecipeIngredientConditionInput
  ) {
    createRecipeIngredient(input: $input, condition: $condition) {
      id
      recipeID
      ingredientID
      quantity
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateRecipeIngredient = /* GraphQL */ `
  mutation UpdateRecipeIngredient(
    $input: UpdateRecipeIngredientInput!
    $condition: ModelRecipeIngredientConditionInput
  ) {
    updateRecipeIngredient(input: $input, condition: $condition) {
      id
      recipeID
      ingredientID
      quantity
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteRecipeIngredient = /* GraphQL */ `
  mutation DeleteRecipeIngredient(
    $input: DeleteRecipeIngredientInput!
    $condition: ModelRecipeIngredientConditionInput
  ) {
    deleteRecipeIngredient(input: $input, condition: $condition) {
      id
      recipeID
      ingredientID
      quantity
      createdAt
      updatedAt
      __typename
    }
  }
`;
