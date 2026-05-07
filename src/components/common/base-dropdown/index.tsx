import { Dropdown, DropdownProps } from 'antd';
import React from 'react';

export interface BaseDropDownProps extends DropdownProps { }
export const BaseDropdown: React.FC<BaseDropDownProps> = ({ children, ...props }) => {
    return (
        <Dropdown getPopupContainer={(triggerNode) => triggerNode} {...props}>
            {children}
        </Dropdown>
    );
};