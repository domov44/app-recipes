import { getUrl } from 'aws-amplify/storage';

export const getS3Path = async (key) => {
    try {
        const imageObject = await getUrl({
            key: key,
            options: {
                level: 'guest'
            }
        });
        return imageObject.url;
    } catch (error) {
        console.error('Error fetching image URL:', error);
        return null;
    }
};
