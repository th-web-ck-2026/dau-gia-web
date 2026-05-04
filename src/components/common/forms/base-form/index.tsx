import React, { ComponentProps } from "react";

import { Form, FormInstance } from "antd";

import { BaseFormItem } from "@/components/common/forms/components/base-form-item";
import { BaseFormList } from "@/components/common/forms/components/base-form-list";
import { BaseFormTitle } from "@/components/common/forms/components/base-form-title";

export type BaseFormProps = Omit<ComponentProps<typeof Form>, "onFinish"> & {
  onFinish?: (values: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export type BaseFormInstance = FormInstance;

export interface IBaseForm<T> extends React.FC<T> {
  useWatch: typeof Form.useWatch;
  Title: typeof BaseFormTitle;
  Item: typeof BaseFormItem;
  List: typeof BaseFormList;
  useForm: typeof Form.useForm;
  Provider: typeof Form.Provider;
}

export const BaseForm: IBaseForm<BaseFormProps> = ({
  onFinishFailed,
  layout = "vertical",
  ...props
}) => {
  return <Form onFinishFailed={onFinishFailed} layout={layout} {...props} />;
};

BaseForm.Title = BaseFormTitle;
BaseForm.Item = BaseFormItem;
BaseForm.List = BaseFormList;
BaseForm.useForm = Form.useForm;
BaseForm.Provider = Form.Provider;
BaseForm.useWatch = Form.useWatch;
