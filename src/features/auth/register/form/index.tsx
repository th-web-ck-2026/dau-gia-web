import React from "react";
import { useTranslations } from "next-intl";
import {
    BaseForm,
    BaseInput,
    BaseButton,
    BaseCheckbox,
} from "@/components/common";
import { UserRoleType } from "@/constants";
import { FormInstance } from "antd/lib";
import { CommonFields } from "./CommonFields";
import { Rule } from "antd/es/form";

interface FormRegisterProps {
    type: UserRoleType;
    form: FormInstance;
    onFinish: (values: any) => void;
    validationRules: Record<string, Rule[]>;
    initialValues: any;
    isLoading: boolean;
}

const FormRegister: React.FC<FormRegisterProps> = ({
    type,
    form,
    onFinish,
    validationRules,
    initialValues,
    isLoading,
}) => {
    const t = useTranslations("auth");

    return (
        <BaseForm
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={initialValues}
            validateTrigger="onBlur"
            key={type}
        >
            <CommonFields validationRules={validationRules} type={type} />

            <BaseForm.Item
                name="agreement"
                valuePropName="checked"
                rules={validationRules.agreement}
            >
                <BaseCheckbox>
                    <span style={{ fontSize: 14 }}>{t("agreementText")}</span>
                </BaseCheckbox>
            </BaseForm.Item>

            <BaseForm.Item style={{ marginTop: "12px" }}>
                <BaseButton
                    type="primary"
                    htmlType="submit"
                    size="large"
                    block
                    loading={isLoading}
                >
                    {t("registerButton")}
                </BaseButton>
            </BaseForm.Item>
        </BaseForm>
    );
};

export default FormRegister;
