export function handleTypeIngredientVariant(type) {
    let variant = 'success';
    switch (type) {
        case 'Viande':
            variant = 'danger';
            break;
        case 'Légume':
            variant = 'success';
            break;
        case 'Fruit':
            variant = 'success';
            break;
        case 'Condiment':
            variant = 'primary';
            break;
        default:
            variant = 'primary';
            break;
    }

    return variant;
}
