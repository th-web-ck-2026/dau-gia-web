import React, { useCallback } from "react";

import { CopyOutlined } from "@ant-design/icons";

import { useFeedback } from "@/hooks/common";

import { BaseButton } from "../../base-button";
import { BaseInputProps } from "../../base-input";
import { BaseTooltip } from "../../base-tooltip";
import { SuffixInput } from "../suffix-input";

interface ClipboardInputProps extends BaseInputProps {
  valueToCopy?: string;
}

export const ClipboardInput: React.FC<ClipboardInputProps> = ({
  valueToCopy,
  ...props
}) => {
  const { notification } = useFeedback();
  const handleCopy = useCallback(
    () =>
      valueToCopy &&
      navigator.clipboard.writeText(valueToCopy).then(() => {
        notification.info({ message: "copied" });
      }),
    [notification, valueToCopy]
  );

  return (
    <SuffixInput
      suffix={
        <BaseTooltip title="Copy">
          <BaseButton
            size="small"
            disabled={!valueToCopy}
            type="text"
            icon={<CopyOutlined />}
            onClick={handleCopy}
          />
        </BaseTooltip>
      }
      {...props}
    />
  );
};
