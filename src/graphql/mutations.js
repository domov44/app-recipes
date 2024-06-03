/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProfile = /* GraphQL */ `
  mutation CreateProfile(
    $input: CreateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    createProfile(input: $input, condition: $condition) {
      id
      name
      avatar
      description
      birthdate
      recipes {
        nextToken
        __typename
      }
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateProfile = /* GraphQL */ `
  mutation UpdateProfile(
    $input: UpdateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    updateProfile(input: $input, condition: $condition) {
      id
      name
      avatar
      description
      birthdate
      recipes {
        nextToken
        __typename
      }
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteProfile = /* GraphQL */ `
  mutation DeleteProfile(
    $input: DeleteProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    deleteProfile(input: $input, condition: $condition) {
      id
      name
      avatar
      description
      birthdate
      recipes {
        nextToken
        __typename
      }
      owner
      createdAt
      updatedAt
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
      categoryID
      category {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      owner
      createdAt
      updatedAt
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
      categoryID
      category {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      owner
      createdAt
      updatedAt
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
      categoryID
      category {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      owner
      createdAt
      updatedAt
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
      typeID
      type {
        id
        name
        createdAt
        updatedAt
        __typename
      }
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
      typeID
      type {
        id
        name
        createdAt
        updatedAt
        __typename
      }
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
      typeID
      type {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createIngredientType = /* GraphQL */ `
  mutation CreateIngredientType(
    $input: CreateIngredientTypeInput!
    $condition: ModelIngredientTypeConditionInput
  ) {
    createIngredientType(input: $input, condition: $condition) {
      id
      name
      ingredients {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateIngredientType = /* GraphQL */ `
  mutation UpdateIngredientType(
    $input: UpdateIngredientTypeInput!
    $condition: ModelIngredientTypeConditionInput
  ) {
    updateIngredientType(input: $input, condition: $condition) {
      id
      name
      ingredients {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteIngredientType = /* GraphQL */ `
  mutation DeleteIngredientType(
    $input: DeleteIngredientTypeInput!
    $condition: ModelIngredientTypeConditionInput
  ) {
    deleteIngredientType(input: $input, condition: $condition) {
      id
      name
      ingredients {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
      id
      name
      recipes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
      id
      name
      recipes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
      id
      name
      recipes {
        nextToken
        __typename
      }
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
