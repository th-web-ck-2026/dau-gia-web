"use client";

import { useState } from "react";

import { useFeedback, useResponsive } from "@/hooks/common";

export const useDemo = () => {
  const { notification, message, modal } = useFeedback();
  const responsive = useResponsive();

  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(true);
  const [sliderValue, setSliderValue] = useState(30);
  const [rateValue, setRateValue] = useState(3);
  const [radioValue, setRadioValue] = useState("option1");
  const [checkboxValues, setCheckboxValues] = useState<string[]>(["opt1"]);
  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState("1");
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState<string>("option1");
  const [dateValue, setDateValue] = useState<unknown>(null);

  const handleShowNotification = (
    type: "success" | "info" | "warning" | "error"
  ) => {
    notification[type]({
      message: `${type.charAt(0).toUpperCase() + type.slice(1)} Notification`,
      description: `This is a ${type} notification demo.`,
      duration: 0,
    });
  };

  const handleShowMessage = (
    type: "success" | "info" | "warning" | "error"
  ) => {
    message[type](`This is a ${type} message`);
  };

  const handleConfirmModal = () => {
    modal.warning({
      title: "Confirm Action",
      content: "Are you sure you want to proceed?",
      onOk: () => message.success("Confirmed!"),
    });
  };

  return {
    responsive,
    modalOpen,
    setModalOpen,
    drawerOpen,
    setDrawerOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    switchChecked,
    setSwitchChecked,
    sliderValue,
    setSliderValue,
    rateValue,
    setRateValue,
    radioValue,
    setRadioValue,
    checkboxValues,
    setCheckboxValues,
    currentStep,
    setCurrentStep,
    activeTab,
    setActiveTab,
    inputValue,
    setInputValue,
    selectValue,
    setSelectValue,
    dateValue,
    setDateValue,
    handleShowNotification,
    handleShowMessage,
    handleConfirmModal,
  };
};
