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
export declare type ProfileUpdateFormInputValues = {
    name?: string;
    avatar?: string;
    description?: string;
    birthdate?: string;
};
export declare type ProfileUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    avatar?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    birthdate?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProfileUpdateFormOverridesProps = {
    ProfileUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    avatar?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    birthdate?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProfileUpdateFormProps = React.PropsWithChildren<{
    overrides?: ProfileUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    profile?: any;
    onSubmit?: (fields: ProfileUpdateFormInputValues) => ProfileUpdateFormInputValues;
    onSuccess?: (fields: ProfileUpdateFormInputValues) => void;
    onError?: (fields: ProfileUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProfileUpdateFormInputValues) => ProfileUpdateFormInputValues;
    onValidate?: ProfileUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ProfileUpdateForm(props: ProfileUpdateFormProps): React.ReactElement;
