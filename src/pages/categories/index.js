import React, { useState, useEffect, useCallback } from 'react';
import Hero from '@/components/ui/wrapper/Hero';
import Bento from '@/components/ui/wrapper/Bento';
import Head from 'next/head';
import { generateClient } from 'aws-amplify/api';
import { listRecipes, listCategories } from '@/graphql/customQueries';
import IconButton from '@/components/ui/button/IconButton';
import { convertirFormatDate } from '@/utils/convertirFormatDate';
import Column from '@/components/ui/wrapper/Column';
import Container from '@/components/ui/wrapper/Container';
import Stack from '@/components/ui/wrapper/Stack';
import InvisibleLink from '@/components/ui/button/InvisibleLink';
import { getS3Path } from '@/utils/getS3Path';
import { useUser } from '@/utils/UserContext';
import { IoMdAdd } from 'react-icons/io';
import { CiEdit } from 'react-icons/ci';

const client = generateClient();

const Categories = ({ initialCategories = [] }) => {

    return (
        <>
            <Head>
                <title>L&apos;application de recipe Miamze</title>
                <meta name="description" content="Description de la page" />
                <meta property="og:image" content="URL_de_votre_image" />
            </Head>
            <Hero>
                <Stack flexWrap="wrap">
                    {initialCategories.map((categorie, index) => (
                        <IconButton key={index} variant="action" href={`/categories/${categorie.slug}`}>{categorie.name}</IconButton>
                    ))}
                </Stack>
            </Hero>
        </>
    );
};

export const getServerSideProps = async () => {
    try {
        const categoryData = await client.graphql({
            query: listCategories,
            authMode: "identityPool"
        });
        const categoriesList = categoryData.data.listCategories.items;

        return {
            props: {
                initialCategories: categoriesList || []
            }
        };
    } catch (error) {
        console.error("Error fetching recipes or categories:", error);
        return {
            props: {
                initialCategories: []
            }
        };
    }
};

export default Categories;
