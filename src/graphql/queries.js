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
      tags {
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
    $id: ID
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listProfiles(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
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
export const profileByPseudo = /* GraphQL */ `
  query ProfileByPseudo(
    $pseudo: String!
    $sortDirection: ModelSortDirection
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    profileByPseudo(
      pseudo: $pseudo
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      slug
      image
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
      profileID
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
      tags {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      profileRecipesId
      categoryRecipesId
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
        slug
        image
        steps
        description
        owner
        profileID
        createdAt
        updatedAt
        profileRecipesId
        categoryRecipesId
        recipeCategoryId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const RecipeByTitle = /* GraphQL */ `
  query RecipeByTitle(
    $title: String!
    $sortDirection: ModelSortDirection
    $filter: ModelRecipeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    RecipeByTitle(
      title: $title
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        slug
        image
        steps
        description
        owner
        profileID
        createdAt
        updatedAt
        profileRecipesId
        categoryRecipesId
        recipeCategoryId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const RecipeBySlug = /* GraphQL */ `
  query RecipeBySlug(
    $slug: String!
    $owner: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRecipeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    RecipeBySlug(
      slug: $slug
      owner: $owner
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        slug
        image
        steps
        description
        owner
        profileID
        createdAt
        updatedAt
        profileRecipesId
        categoryRecipesId
        recipeCategoryId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const RecipeByOwner = /* GraphQL */ `
  query RecipeByOwner(
    $owner: String!
    $sortDirection: ModelSortDirection
    $filter: ModelRecipeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    RecipeByOwner(
      owner: $owner
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        slug
        image
        steps
        description
        owner
        profileID
        createdAt
        updatedAt
        profileRecipesId
        categoryRecipesId
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
        typeID
        createdAt
        updatedAt
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
        slug
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const CategoryByname = /* GraphQL */ `
  query CategoryByname(
    $name: String!
    $sortDirection: ModelSortDirection
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    CategoryByname(
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        slug
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const CategoryBySlug = /* GraphQL */ `
  query CategoryBySlug(
    $slug: String!
    $sortDirection: ModelSortDirection
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    CategoryBySlug(
      slug: $slug
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        slug
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
        recipeIngredientIngredientId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getTag = /* GraphQL */ `
  query GetTag($id: ID!) {
    getTag(id: $id) {
      id
      label
      profiles {
        nextToken
        __typename
      }
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
export const listTags = /* GraphQL */ `
  query ListTags(
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        label
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const TagByLabel = /* GraphQL */ `
  query TagByLabel(
    $label: String!
    $sortDirection: ModelSortDirection
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    TagByLabel(
      label: $label
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        label
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getTagProfiles = /* GraphQL */ `
  query GetTagProfiles($id: ID!) {
    getTagProfiles(id: $id) {
      id
      profileId
      tagId
      profile {
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
      tag {
        id
        label
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listTagProfiles = /* GraphQL */ `
  query ListTagProfiles(
    $filter: ModelTagProfilesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTagProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        profileId
        tagId
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const tagProfilesByProfileId = /* GraphQL */ `
  query TagProfilesByProfileId(
    $profileId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTagProfilesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tagProfilesByProfileId(
      profileId: $profileId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        profileId
        tagId
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const tagProfilesByTagId = /* GraphQL */ `
  query TagProfilesByTagId(
    $tagId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTagProfilesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tagProfilesByTagId(
      tagId: $tagId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        profileId
        tagId
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getTagRecipes = /* GraphQL */ `
  query GetTagRecipes($id: ID!) {
    getTagRecipes(id: $id) {
      id
      recipeId
      tagId
      recipe {
        id
        title
        slug
        image
        steps
        description
        owner
        profileID
        createdAt
        updatedAt
        profileRecipesId
        categoryRecipesId
        recipeCategoryId
        __typename
      }
      tag {
        id
        label
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listTagRecipes = /* GraphQL */ `
  query ListTagRecipes(
    $filter: ModelTagRecipesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTagRecipes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        recipeId
        tagId
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const tagRecipesByRecipeId = /* GraphQL */ `
  query TagRecipesByRecipeId(
    $recipeId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTagRecipesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tagRecipesByRecipeId(
      recipeId: $recipeId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        recipeId
        tagId
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const tagRecipesByTagId = /* GraphQL */ `
  query TagRecipesByTagId(
    $tagId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTagRecipesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tagRecipesByTagId(
      tagId: $tagId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        recipeId
        tagId
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
