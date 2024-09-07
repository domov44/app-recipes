export const slugify = async (str) => {
    try {
        const slug = str
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        return slug;
    } catch (error) {
        console.error('Error slugify:', error);
        return null;
    }
};
