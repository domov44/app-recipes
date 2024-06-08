/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
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
export const listProfiles = /* GraphQL */ `
  query ListProfiles(
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getRecipe = /* GraphQL */ `
  query GetRecipe($id: ID!) {
    getRecipe(id: $id) {
      id
      title
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
      ingredients {
        nextToken
        __typename
      }
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
      profileRecipesId
      categoryRecipesId
      recipeUserId
      recipeCategoryId
      __typename
    }
  }
`;
export const listRecipes = /* GraphQL */ `
  query ListRecipes(
    $filter: ModelRecipeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecipes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        image
        steps
        owner
        createdAt
        updatedAt
        profileRecipesId
        categoryRecipesId
        recipeUserId
        recipeCategoryId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getIngredient = /* GraphQL */ `
  query GetIngredient($id: ID!) {
    getIngredient(id: $id) {
      id
      name
      type {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      recipes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      ingredientTypeIngredientsId
      ingredientTypeId
      __typename
    }
  }
`;
export const listIngredients = /* GraphQL */ `
  query ListIngredients(
    $filter: ModelIngredientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listIngredients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        ingredientTypeIngredientsId
        ingredientTypeId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getIngredientType = /* GraphQL */ `
  query GetIngredientType($id: ID!) {
    getIngredientType(id: $id) {
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
export const listIngredientTypes = /* GraphQL */ `
  query ListIngredientTypes(
    $filter: ModelIngredientTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listIngredientTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
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
export const listCategories = /* GraphQL */ `
  query ListCategories(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getRecipeIngredient = /* GraphQL */ `
  query GetRecipeIngredient($id: ID!) {
    getRecipeIngredient(id: $id) {
      id
      recipe {
        id
        title
        image
        steps
        owner
        createdAt
        updatedAt
        profileRecipesId
        categoryRecipesId
        recipeUserId
        recipeCategoryId
        __typename
      }
      ingredient {
        id
        name
        createdAt
        updatedAt
        ingredientTypeIngredientsId
        ingredientTypeId
        __typename
      }
      quantity
      createdAt
      updatedAt
      recipeIngredientsId
      ingredientRecipesId
      recipeIngredientRecipeId
      recipeIngredientIngredientId
      __typename
    }
  }
`;
export const listRecipeIngredients = /* GraphQL */ `
  query ListRecipeIngredients(
    $filter: ModelRecipeIngredientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecipeIngredients(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        quantity
        createdAt
        updatedAt
        recipeIngredientsId
        ingredientRecipesId
        recipeIngredientRecipeId
        recipeIngredientIngredientId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
