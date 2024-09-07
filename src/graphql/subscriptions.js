/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProfile = /* GraphQL */ `
  subscription OnCreateProfile(
    $filter: ModelSubscriptionProfileFilterInput
    $owner: String
  ) {
    onCreateProfile(filter: $filter, owner: $owner) {
      id
      pseudo
      name
      surname
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
export const onUpdateProfile = /* GraphQL */ `
  subscription OnUpdateProfile(
    $filter: ModelSubscriptionProfileFilterInput
    $owner: String
  ) {
    onUpdateProfile(filter: $filter, owner: $owner) {
      id
      pseudo
      name
      surname
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
export const onDeleteProfile = /* GraphQL */ `
  subscription OnDeleteProfile(
    $filter: ModelSubscriptionProfileFilterInput
    $owner: String
  ) {
    onDeleteProfile(filter: $filter, owner: $owner) {
      id
      pseudo
      name
      surname
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
export const onCreateRecipe = /* GraphQL */ `
  subscription OnCreateRecipe(
    $filter: ModelSubscriptionRecipeFilterInput
    $owner: String
  ) {
    onCreateRecipe(filter: $filter, owner: $owner) {
      id
      title
      slug
      image
      user {
        id
        pseudo
        name
        surname
        avatar
        description
        birthdate
        owner
        createdAt
        updatedAt
        __typename
      }
      steps
      description
      ingredients {
        nextToken
        __typename
      }
      category {
        id
        name
        slug
        createdAt
        updatedAt
        __typename
      }
      owner
      createdAt
      updatedAt
      profileRecipesId
      categoryRecipesId
      recipeUserId
      recipeCategoryId
      __typename
    }
  }
`;
export const onUpdateRecipe = /* GraphQL */ `
  subscription OnUpdateRecipe(
    $filter: ModelSubscriptionRecipeFilterInput
    $owner: String
  ) {
    onUpdateRecipe(filter: $filter, owner: $owner) {
      id
      title
      slug
      image
      user {
        id
        pseudo
        name
        surname
        avatar
        description
        birthdate
        owner
        createdAt
        updatedAt
        __typename
      }
      steps
      description
      ingredients {
        nextToken
        __typename
      }
      category {
        id
        name
        slug
        createdAt
        updatedAt
        __typename
      }
      owner
      createdAt
      updatedAt
      profileRecipesId
      categoryRecipesId
      recipeUserId
      recipeCategoryId
      __typename
    }
  }
`;
export const onDeleteRecipe = /* GraphQL */ `
  subscription OnDeleteRecipe(
    $filter: ModelSubscriptionRecipeFilterInput
    $owner: String
  ) {
    onDeleteRecipe(filter: $filter, owner: $owner) {
      id
      title
      slug
      image
      user {
        id
        pseudo
        name
        surname
        avatar
        description
        birthdate
        owner
        createdAt
        updatedAt
        __typename
      }
      steps
      description
      ingredients {
        nextToken
        __typename
      }
      category {
        id
        name
        slug
        createdAt
        updatedAt
        __typename
      }
      owner
      createdAt
      updatedAt
      profileRecipesId
      categoryRecipesId
      recipeUserId
      recipeCategoryId
      __typename
    }
  }
`;
export const onCreateIngredient = /* GraphQL */ `
  subscription OnCreateIngredient(
    $filter: ModelSubscriptionIngredientFilterInput
  ) {
    onCreateIngredient(filter: $filter) {
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
      ingredientTypeId
      __typename
    }
  }
`;
export const onUpdateIngredient = /* GraphQL */ `
  subscription OnUpdateIngredient(
    $filter: ModelSubscriptionIngredientFilterInput
  ) {
    onUpdateIngredient(filter: $filter) {
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
      ingredientTypeId
      __typename
    }
  }
`;
export const onDeleteIngredient = /* GraphQL */ `
  subscription OnDeleteIngredient(
    $filter: ModelSubscriptionIngredientFilterInput
  ) {
    onDeleteIngredient(filter: $filter) {
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
      ingredientTypeId
      __typename
    }
  }
`;
export const onCreateIngredientType = /* GraphQL */ `
  subscription OnCreateIngredientType(
    $filter: ModelSubscriptionIngredientTypeFilterInput
  ) {
    onCreateIngredientType(filter: $filter) {
      id
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateIngredientType = /* GraphQL */ `
  subscription OnUpdateIngredientType(
    $filter: ModelSubscriptionIngredientTypeFilterInput
  ) {
    onUpdateIngredientType(filter: $filter) {
      id
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteIngredientType = /* GraphQL */ `
  subscription OnDeleteIngredientType(
    $filter: ModelSubscriptionIngredientTypeFilterInput
  ) {
    onDeleteIngredientType(filter: $filter) {
      id
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onCreateCategory(filter: $filter) {
      id
      name
      slug
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
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onUpdateCategory(filter: $filter) {
      id
      name
      slug
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
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onDeleteCategory(filter: $filter) {
      id
      name
      slug
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
export const onCreateRecipeIngredient = /* GraphQL */ `
  subscription OnCreateRecipeIngredient(
    $filter: ModelSubscriptionRecipeIngredientFilterInput
  ) {
    onCreateRecipeIngredient(filter: $filter) {
      id
      quantity
      ingredient {
        id
        name
        typeID
        createdAt
        updatedAt
        ingredientTypeId
        __typename
      }
      createdAt
      updatedAt
      recipeIngredientsId
      recipeIngredientIngredientId
      __typename
    }
  }
`;
export const onUpdateRecipeIngredient = /* GraphQL */ `
  subscription OnUpdateRecipeIngredient(
    $filter: ModelSubscriptionRecipeIngredientFilterInput
  ) {
    onUpdateRecipeIngredient(filter: $filter) {
      id
      quantity
      ingredient {
        id
        name
        typeID
        createdAt
        updatedAt
        ingredientTypeId
        __typename
      }
      createdAt
      updatedAt
      recipeIngredientsId
      recipeIngredientIngredientId
      __typename
    }
  }
`;
export const onDeleteRecipeIngredient = /* GraphQL */ `
  subscription OnDeleteRecipeIngredient(
    $filter: ModelSubscriptionRecipeIngredientFilterInput
  ) {
    onDeleteRecipeIngredient(filter: $filter) {
      id
      quantity
      ingredient {
        id
        name
        typeID
        createdAt
        updatedAt
        ingredientTypeId
        __typename
      }
      createdAt
      updatedAt
      recipeIngredientsId
      recipeIngredientIngredientId
      __typename
    }
  }
`;
