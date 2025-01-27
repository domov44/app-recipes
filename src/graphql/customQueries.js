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
      image
      user {
          id
          pseudo
          name
          surname
          avatar
          description
          birthdate
          createdAt
          updatedAt
          __typename
        }
      slug
      steps
      ingredients {
        items {
          id
          quantity
          ingredient {
            id
            name
            type {
              id
              name
            }
          }
        }
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
      __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getProfile = /* GraphQL */ `
  query GetProfile($pseudo: String!) {
    getProfile(pseudo: $pseudo) {
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
export const CategoryBySlug = /* GraphQL */ `
  query CategoryBySlug(
    $slug: String!
    $sortDirection: ModelSortDirection
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
    $recipesLimit: Int
    $recipesNextToken: String
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
        recipes(limit: $recipesLimit, nextToken: $recipesNextToken) {
          items {
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
            steps
            owner
            createdAt
            updatedAt
            profileRecipesId
            categoryRecipesId
            recipeCategoryId
            __typename
          }
          nextToken
        }
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
        recipes {
          items {
            id
            title
            description
            owner
            createdAt
          }
        }
      }
      nextToken
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
        name
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
          createdAt
          updatedAt
          __typename
        }
      slug
      steps
      ingredients {
        items {
          id
          quantity
          ingredient {
            id
            name
            type {
              id
              name
            }
          }
        }
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
          user {
          id
          pseudo
          name
          surname
          avatar
          description
          birthdate
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
          slug
          name
          createdAt
          updatedAt
          __typename
        }
        steps
        owner
        createdAt
        updatedAt
        profileRecipesId
        recipeCategoryId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const recipesByUserID = /* GraphQL */ `
  query RecipesByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRecipeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    recipesByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        image
        slug
        userID
        steps
        categoryID
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
export const recipesByCategoryID = /* GraphQL */ `
  query RecipesByCategoryID(
    $categoryID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRecipeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    recipesByCategoryID(
      categoryID: $categoryID
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
        userID
        steps
        categoryID
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
        description
        image
        steps
          category {
          id
          name
          createdAt
          updatedAt
          __typename
        }
        owner
          ingredients {
              items{
                id
                quantity
                ingredient {
                  id
                  name
                  type {
                    id
                    name
                    createdAt
                    updatedAt
                    __typename
                  }
                }
              }
          }
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
    $sortDirection: ModelSortDirection
    $filter: ModelRecipeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    RecipeBySlug(
      slug: $slug
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        slug
        description
        image
        steps
          category {
          id
          slug
          name
          createdAt
          updatedAt
          __typename
        }
        owner
          ingredients {
              items{
                id
                quantity
                ingredient {
                  id
                  name
                  type {
                    id
                    name
                    createdAt
                    updatedAt
                    __typename
                  }
                }
              }
          }
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
          type {
          id
          name
          createdAt
          updatedAt
          __typename
        }
        typeID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const ingredientsByTypeID = /* GraphQL */ `
  query IngredientsByTypeID(
    $typeID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelIngredientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ingredientsByTypeID(
      typeID: $typeID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        typeID
        createdAt
        updatedAt
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
        slug
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
      recipeID
      ingredientID
      quantity
      createdAt
      updatedAt
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
        recipeID
        ingredientID
        quantity
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const recipeIngredientsByRecipeID = /* GraphQL */ `
  query RecipeIngredientsByRecipeID(
    $recipeID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRecipeIngredientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    recipeIngredientsByRecipeID(
      recipeID: $recipeID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        recipeID
        ingredientID
        quantity
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
