/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProfile = /* GraphQL */ `
  mutation CreateProfile(
    $input: CreateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    createProfile(input: $input, condition: $condition) {
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
export const updateProfile = /* GraphQL */ `
  mutation UpdateProfile(
    $input: UpdateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    updateProfile(input: $input, condition: $condition) {
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
export const deleteProfile = /* GraphQL */ `
  mutation DeleteProfile(
    $input: DeleteProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    deleteProfile(input: $input, condition: $condition) {
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
export const createRecipe = /* GraphQL */ `
  mutation CreateRecipe(
    $input: CreateRecipeInput!
    $condition: ModelRecipeConditionInput
  ) {
    createRecipe(input: $input, condition: $condition) {
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
export const updateRecipe = /* GraphQL */ `
  mutation UpdateRecipe(
    $input: UpdateRecipeInput!
    $condition: ModelRecipeConditionInput
  ) {
    updateRecipe(input: $input, condition: $condition) {
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
export const deleteRecipe = /* GraphQL */ `
  mutation DeleteRecipe(
    $input: DeleteRecipeInput!
    $condition: ModelRecipeConditionInput
  ) {
    deleteRecipe(input: $input, condition: $condition) {
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
      ingredientTypeId
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
      ingredientTypeId
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
      ingredientTypeId
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
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
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
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
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
export const createRecipeIngredient = /* GraphQL */ `
  mutation CreateRecipeIngredient(
    $input: CreateRecipeIngredientInput!
    $condition: ModelRecipeIngredientConditionInput
  ) {
    createRecipeIngredient(input: $input, condition: $condition) {
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
export const updateRecipeIngredient = /* GraphQL */ `
  mutation UpdateRecipeIngredient(
    $input: UpdateRecipeIngredientInput!
    $condition: ModelRecipeIngredientConditionInput
  ) {
    updateRecipeIngredient(input: $input, condition: $condition) {
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
export const deleteRecipeIngredient = /* GraphQL */ `
  mutation DeleteRecipeIngredient(
    $input: DeleteRecipeIngredientInput!
    $condition: ModelRecipeIngredientConditionInput
  ) {
    deleteRecipeIngredient(input: $input, condition: $condition) {
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
export const createTag = /* GraphQL */ `
  mutation CreateTag(
    $input: CreateTagInput!
    $condition: ModelTagConditionInput
  ) {
    createTag(input: $input, condition: $condition) {
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
export const updateTag = /* GraphQL */ `
  mutation UpdateTag(
    $input: UpdateTagInput!
    $condition: ModelTagConditionInput
  ) {
    updateTag(input: $input, condition: $condition) {
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
export const deleteTag = /* GraphQL */ `
  mutation DeleteTag(
    $input: DeleteTagInput!
    $condition: ModelTagConditionInput
  ) {
    deleteTag(input: $input, condition: $condition) {
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
export const createTagProfiles = /* GraphQL */ `
  mutation CreateTagProfiles(
    $input: CreateTagProfilesInput!
    $condition: ModelTagProfilesConditionInput
  ) {
    createTagProfiles(input: $input, condition: $condition) {
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
export const updateTagProfiles = /* GraphQL */ `
  mutation UpdateTagProfiles(
    $input: UpdateTagProfilesInput!
    $condition: ModelTagProfilesConditionInput
  ) {
    updateTagProfiles(input: $input, condition: $condition) {
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
export const deleteTagProfiles = /* GraphQL */ `
  mutation DeleteTagProfiles(
    $input: DeleteTagProfilesInput!
    $condition: ModelTagProfilesConditionInput
  ) {
    deleteTagProfiles(input: $input, condition: $condition) {
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
export const createTagRecipes = /* GraphQL */ `
  mutation CreateTagRecipes(
    $input: CreateTagRecipesInput!
    $condition: ModelTagRecipesConditionInput
  ) {
    createTagRecipes(input: $input, condition: $condition) {
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
export const updateTagRecipes = /* GraphQL */ `
  mutation UpdateTagRecipes(
    $input: UpdateTagRecipesInput!
    $condition: ModelTagRecipesConditionInput
  ) {
    updateTagRecipes(input: $input, condition: $condition) {
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
export const deleteTagRecipes = /* GraphQL */ `
  mutation DeleteTagRecipes(
    $input: DeleteTagRecipesInput!
    $condition: ModelTagRecipesConditionInput
  ) {
    deleteTagRecipes(input: $input, condition: $condition) {
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
