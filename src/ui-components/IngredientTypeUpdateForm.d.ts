/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type IngredientTypeUpdateFormInputValues = {
    name?: string;
};
export declare type IngredientTypeUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type IngredientTypeUpdateFormOverridesProps = {
    IngredientTypeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type IngredientTypeUpdateFormProps = React.PropsWithChildren<{
    overrides?: IngredientTypeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    ingredientType?: any;
    onSubmit?: (fields: IngredientTypeUpdateFormInputValues) => IngredientTypeUpdateFormInputValues;
    onSuccess?: (fields: IngredientTypeUpdateFormInputValues) => void;
    onError?: (fields: IngredientTypeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: IngredientTypeUpdateFormInputValues) => IngredientTypeUpdateFormInputValues;
    onValidate?: IngredientTypeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function IngredientTypeUpdateForm(props: IngredientTypeUpdateFormProps): React.ReactElement;
