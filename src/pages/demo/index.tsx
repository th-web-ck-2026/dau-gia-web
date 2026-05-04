"use client";

import React from "react";

import {
  DeleteOutlined,
  EditOutlined,
  HomeOutlined,
  PlusOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

import {
  BaseAvatar,
  BaseBadge,
  BaseButton,
  BaseCard,
  BaseCheckbox,
  BaseCol,
  BaseCollapse,
  BaseDatePicker,
  BaseDescriptions,
  BaseDivider,
  BaseDrawer,
  BaseEmpty,
  BaseFlex,
  BaseInput,
  BaseModal,
  BasePagination,
  BasePopconfirm,
  BasePopover,
  BaseProgress,
  BaseRadio,
  BaseRate,
  BaseResult,
  BaseRow,
  BaseSelect,
  BaseSkeleton,
  BaseSlider,
  BaseSpace,
  BaseSpin,
  BaseSteps,
  BaseSwitch,
  BaseTable,
  BaseTabs,
  BaseTag,
  BaseTooltip,
  BaseTypography,
  ClipboardInput,
  DeleteModal,
  InputNumber,
  InputPassword,
  Option,
  SearchInput,
  VerificationCodeInput,
} from "@/components/common";

import * as S from "./index.styles";
import { useDemo } from "./index.utils";

const { Title, Paragraph, Text, Link } = BaseTypography;

const tableColumns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Age", dataIndex: "age", key: "age" },
  { title: "Email", dataIndex: "email", key: "email" },
];

const tableData = [
  { key: "1", name: "John Doe", age: 28, email: "john@example.com" },
  { key: "2", name: "Jane Smith", age: 32, email: "jane@example.com" },
  { key: "3", name: "Bob Johnson", age: 45, email: "bob@example.com" },
];

const DemoComponent = () => {
  const {
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
    setDateValue,
    handleShowNotification,
    handleShowMessage,
    handleConfirmModal,
  } = useDemo();

  return (
    <S.DemoContainer>
      <S.PageTitle>Base Components Demo</S.PageTitle>

      <S.ResponsiveInfo>
        <strong>useResponsive:</strong> Breakpoint:{" "}
        <BaseTag color="blue">{responsive.breakpoint}</BaseTag>
        {responsive.mobileOnly && <BaseTag color="red">Mobile Only</BaseTag>}
        {responsive.tabletOnly && <BaseTag color="orange">Tablet Only</BaseTag>}
        {responsive.desktopOnly && (
          <BaseTag color="green">Desktop Only</BaseTag>
        )}
      </S.ResponsiveInfo>

      {/* ================== TYPOGRAPHY ================== */}
      <S.SectionTitle>Typography</S.SectionTitle>
      <S.DemoBlock>
        <Title level={2}>Heading 2</Title>
        <Title level={3}>Heading 3</Title>
        <Title level={4}>Heading 4</Title>
        <Paragraph>
          This is a paragraph component from BaseTypography.
        </Paragraph>
        <Text>Normal Text</Text> &nbsp;
        <Text strong>Bold Text</Text> &nbsp;
        <Text type="secondary">Secondary</Text> &nbsp;
        <Text type="success">Success</Text> &nbsp;
        <Text type="warning">Warning</Text> &nbsp;
        <Text type="danger">Danger</Text> &nbsp;
        <Link href="#">Link Text</Link>
      </S.DemoBlock>

      {/* ================== BUTTONS ================== */}
      <S.SectionTitle>Button</S.SectionTitle>
      <S.DemoBlock>
        <S.Label>Types</S.Label>
        <S.DemoRow>
          <BaseButton type="primary">Primary</BaseButton>
          <BaseButton>Default</BaseButton>
          <BaseButton type="dashed">Dashed</BaseButton>
          <BaseButton type="text">Text</BaseButton>
          <BaseButton type="link">Link</BaseButton>
        </S.DemoRow>
        <S.Label>Severity</S.Label>
        <S.DemoRow>
          <BaseButton type="primary" severity="success">
            Success
          </BaseButton>
          <BaseButton type="primary" severity="warning">
            Warning
          </BaseButton>
          <BaseButton type="primary" severity="error">
            Error
          </BaseButton>
          <BaseButton type="primary" severity="info">
            Info
          </BaseButton>
        </S.DemoRow>
        <S.Label>States</S.Label>
        <S.DemoRow>
          <BaseButton type="primary" loading>
            Loading
          </BaseButton>
          <BaseButton type="primary" disabled>
            Disabled
          </BaseButton>
          <BaseButton type="primary" danger>
            Danger
          </BaseButton>
          <BaseButton type="primary" icon={<PlusOutlined />}>
            With Icon
          </BaseButton>
          <BaseButton type="primary" shape="circle" icon={<SearchOutlined />} />
        </S.DemoRow>
        <S.Label>Sizes</S.Label>
        <S.DemoRow>
          <BaseButton type="primary" size="small">
            Small
          </BaseButton>
          <BaseButton type="primary" size="middle">
            Middle
          </BaseButton>
          <BaseButton type="primary" size="large">
            Large
          </BaseButton>
        </S.DemoRow>
      </S.DemoBlock>

      {/* ================== INPUTS ================== */}
      <S.SectionTitle>Input</S.SectionTitle>
      <S.DemoBlock>
        <BaseRow gutter={[16, 16]}>
          <BaseCol span={8}>
            <S.Label>Base Input</S.Label>
            <BaseInput
              placeholder="Enter text..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              prefix={<UserOutlined />}
            />
          </BaseCol>
          <BaseCol span={8}>
            <S.Label>Password Input</S.Label>
            <InputPassword placeholder="Password" />
          </BaseCol>
          <BaseCol span={8}>
            <S.Label>Search Input</S.Label>
            <SearchInput placeholder="Search..." />
          </BaseCol>
          <BaseCol span={8}>
            <S.Label>Number Input</S.Label>
            <InputNumber
              placeholder="Number"
              min={0}
              max={100}
              style={{ width: "100%" }}
            />
          </BaseCol>
          <BaseCol span={8}>
            <S.Label>Clipboard Input</S.Label>
            <ClipboardInput value="Copy this text" readOnly />
          </BaseCol>
          <BaseCol span={24}>
            <S.Label>Verification Code Input</S.Label>
            <VerificationCodeInput length={6} />
          </BaseCol>
        </BaseRow>
      </S.DemoBlock>

      {/* ================== SELECT ================== */}
      <S.SectionTitle>Select</S.SectionTitle>
      <S.DemoBlock>
        <S.DemoRow>
          <BaseSelect
            value={selectValue}
            onChange={(val) => setSelectValue(val as string)}
            style={{ width: 200 }}
          >
            <Option value="option1">Option 1</Option>
            <Option value="option2">Option 2</Option>
            <Option value="option3">Option 3</Option>
          </BaseSelect>
          <BaseSelect
            mode="multiple"
            placeholder="Multiple Select"
            style={{ width: 300 }}
            defaultValue={["opt1"]}
          >
            <Option value="opt1">Tag 1</Option>
            <Option value="opt2">Tag 2</Option>
            <Option value="opt3">Tag 3</Option>
          </BaseSelect>
        </S.DemoRow>
      </S.DemoBlock>

      {/* ================== DATE PICKER ================== */}
      <S.SectionTitle>DatePicker</S.SectionTitle>
      <S.DemoBlock>
        <S.DemoRow>
          <BaseDatePicker onChange={(d: unknown) => setDateValue(d)} />
          <BaseDatePicker.RangePicker />
          <BaseDatePicker.TimePicker />
        </S.DemoRow>
      </S.DemoBlock>

      {/* ================== CHECKBOX & RADIO & SWITCH ================== */}
      <S.SectionTitle>Checkbox / Radio / Switch</S.SectionTitle>
      <S.DemoBlock>
        <BaseRow gutter={[16, 16]}>
          <BaseCol span={8}>
            <S.Label>Checkbox Group</S.Label>
            <BaseCheckbox.Group
              value={checkboxValues}
              onChange={(vals) => setCheckboxValues(vals as string[])}
            >
              <BaseFlex vertical gap={8}>
                <BaseCheckbox value="opt1">Option 1</BaseCheckbox>
                <BaseCheckbox value="opt2">Option 2</BaseCheckbox>
                <BaseCheckbox value="opt3">Option 3</BaseCheckbox>
              </BaseFlex>
            </BaseCheckbox.Group>
          </BaseCol>
          <BaseCol span={8}>
            <S.Label>Radio Group</S.Label>
            <BaseRadio.Group
              value={radioValue}
              onChange={(e) => setRadioValue(e.target.value)}
            >
              <BaseFlex vertical gap={8}>
                <BaseRadio value="option1">Option 1</BaseRadio>
                <BaseRadio value="option2">Option 2</BaseRadio>
                <BaseRadio value="option3">Option 3</BaseRadio>
              </BaseFlex>
            </BaseRadio.Group>
          </BaseCol>
          <BaseCol span={8}>
            <S.Label>Switch</S.Label>
            <BaseFlex gap={16} align="center">
              <BaseSwitch checked={switchChecked} onChange={setSwitchChecked} />
              <Text>{switchChecked ? "ON" : "OFF"}</Text>
            </BaseFlex>
          </BaseCol>
        </BaseRow>
      </S.DemoBlock>

      {/* ================== SLIDER & RATE ================== */}
      <S.SectionTitle>Slider / Rate</S.SectionTitle>
      <S.DemoBlock>
        <BaseRow gutter={[16, 16]}>
          <BaseCol span={12}>
            <S.Label>Slider: {sliderValue}</S.Label>
            <BaseSlider value={sliderValue} onChange={setSliderValue} />
          </BaseCol>
          <BaseCol span={12}>
            <S.Label>Rate</S.Label>
            <BaseRate value={rateValue} onChange={setRateValue} allowHalf />
          </BaseCol>
        </BaseRow>
      </S.DemoBlock>

      {/* ================== TAGS & BADGES & AVATARS ================== */}
      <S.SectionTitle>Tag / Badge / Avatar / Tooltip</S.SectionTitle>
      <S.DemoBlock>
        <S.Label>Tags</S.Label>
        <S.DemoRow>
          <BaseTag color="magenta">magenta</BaseTag>
          <BaseTag color="red">red</BaseTag>
          <BaseTag color="volcano">volcano</BaseTag>
          <BaseTag color="orange">orange</BaseTag>
          <BaseTag color="gold">gold</BaseTag>
          <BaseTag color="lime">lime</BaseTag>
          <BaseTag color="green">green</BaseTag>
          <BaseTag color="cyan">cyan</BaseTag>
          <BaseTag color="blue">blue</BaseTag>
          <BaseTag color="purple">purple</BaseTag>
        </S.DemoRow>
        <S.Label>Badges</S.Label>
        <S.DemoRow>
          <BaseBadge count={5}>
            <BaseAvatar shape="square" icon={<UserOutlined />} />
          </BaseBadge>
          <BaseBadge count={0} showZero>
            <BaseAvatar shape="square" icon={<UserOutlined />} />
          </BaseBadge>
          <BaseBadge dot>
            <BaseAvatar shape="square" icon={<UserOutlined />} />
          </BaseBadge>
          <BaseBadge count={99} overflowCount={10}>
            <BaseAvatar shape="square" icon={<UserOutlined />} />
          </BaseBadge>
        </S.DemoRow>
        <S.Label>Avatars</S.Label>
        <S.DemoRow>
          <BaseAvatar size="small" icon={<UserOutlined />} />
          <BaseAvatar icon={<UserOutlined />} />
          <BaseAvatar size="large" icon={<UserOutlined />} />
          <BaseAvatar style={{ backgroundColor: "#1890ff" }}>U</BaseAvatar>
          <BaseAvatar style={{ backgroundColor: "#87d068" }}>AB</BaseAvatar>
        </S.DemoRow>
        <S.Label>Tooltips</S.Label>
        <S.DemoRow>
          <BaseTooltip title="Top tooltip">
            <BaseButton>Hover me (Top)</BaseButton>
          </BaseTooltip>
          <BaseTooltip title="Right tooltip" placement="right">
            <BaseButton>Hover me (Right)</BaseButton>
          </BaseTooltip>
        </S.DemoRow>
      </S.DemoBlock>

      {/* ================== CARD ================== */}
      <S.SectionTitle>Card</S.SectionTitle>
      <S.DemoBlock>
        <BaseRow gutter={[16, 16]}>
          <BaseCol span={8}>
            <BaseCard title="Card Title" extra={<a href="#">More</a>}>
              <p>Card content</p>
              <p>Card content</p>
            </BaseCard>
          </BaseCol>
          <BaseCol span={8}>
            <BaseCard
              title="With Actions"
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <DeleteOutlined key="delete" />,
              ]}
            >
              <p>Card with action buttons</p>
            </BaseCard>
          </BaseCol>
          <BaseCol span={8}>
            <BaseCard loading title="Loading Card">
              <p>This won&apos;t show</p>
            </BaseCard>
          </BaseCol>
        </BaseRow>
      </S.DemoBlock>

      {/* ================== PROGRESS ================== */}
      <S.SectionTitle>Progress</S.SectionTitle>
      <S.DemoBlock>
        <BaseFlex gap={24} align="center">
          <div style={{ flex: 1 }}>
            <BaseProgress percent={30} />
            <BaseProgress percent={70} status="active" />
            <BaseProgress percent={100} />
            <BaseProgress percent={50} status="exception" />
          </div>
          <BaseProgress type="circle" percent={75} size={80} />
          <BaseProgress type="dashboard" percent={88} size={80} />
        </BaseFlex>
      </S.DemoBlock>

      {/* ================== STEPS ================== */}
      <S.SectionTitle>Steps</S.SectionTitle>
      <S.DemoBlock>
        <BaseSteps
          current={currentStep}
          onChange={setCurrentStep}
          items={[
            { title: "Step 1", description: "First step" },
            { title: "Step 2", description: "Second step" },
            { title: "Step 3", description: "Third step" },
            { title: "Done", description: "Completed" },
          ]}
        />
        <BaseFlex gap={8} justify="center" style={{ marginTop: 16 }}>
          <BaseButton
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </BaseButton>
          <BaseButton
            type="primary"
            onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
            disabled={currentStep === 3}
          >
            Next
          </BaseButton>
        </BaseFlex>
      </S.DemoBlock>

      {/* ================== TABS ================== */}
      <S.SectionTitle>Tabs</S.SectionTitle>
      <S.DemoBlock>
        <BaseTabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            { key: "1", label: "Tab 1", children: <p>Content of Tab 1</p> },
            { key: "2", label: "Tab 2", children: <p>Content of Tab 2</p> },
            { key: "3", label: "Tab 3", children: <p>Content of Tab 3</p> },
          ]}
        />
      </S.DemoBlock>

      {/* ================== COLLAPSE ================== */}
      <S.SectionTitle>Collapse</S.SectionTitle>
      <S.DemoBlock>
        <BaseCollapse
          items={[
            { key: "1", label: "Panel 1", children: <p>Content of panel 1</p> },
            { key: "2", label: "Panel 2", children: <p>Content of panel 2</p> },
            { key: "3", label: "Panel 3", children: <p>Content of panel 3</p> },
          ]}
        />
      </S.DemoBlock>

      {/* ================== DESCRIPTIONS ================== */}
      <S.SectionTitle>Descriptions</S.SectionTitle>
      <S.DemoBlock>
        <BaseDescriptions title="User Info" bordered>
          <BaseDescriptions.Item label="Name">John Doe</BaseDescriptions.Item>
          <BaseDescriptions.Item label="Phone">
            1810000000
          </BaseDescriptions.Item>
          <BaseDescriptions.Item label="Email">
            john@example.com
          </BaseDescriptions.Item>
          <BaseDescriptions.Item label="Address">
            No. 18, Wantang Road
          </BaseDescriptions.Item>
        </BaseDescriptions>
      </S.DemoBlock>

      {/* ================== TABLE & PAGINATION ================== */}
      <S.SectionTitle>Table & Pagination</S.SectionTitle>
      <S.DemoBlock>
        <BaseTable
          columns={tableColumns}
          dataSource={tableData}
          pagination={false}
          bordered
        />
        <BasePagination
          size="default"
          defaultCurrent={1}
          total={50}
          showSizeChanger
        />
      </S.DemoBlock>

      {/* ================== POPOVER & POPCONFIRM ================== */}
      <S.SectionTitle>Popover / Popconfirm</S.SectionTitle>
      <S.DemoBlock>
        <S.DemoRow>
          <BasePopover
            content={
              <div>
                <p>Popover content line 1</p>
                <p>Popover content line 2</p>
              </div>
            }
            title="Popover Title"
          >
            <BaseButton>Hover for Popover</BaseButton>
          </BasePopover>
          <BasePopconfirm
            title="Are you sure?"
            onConfirm={() => handleShowMessage("success")}
            okText="Yes"
            cancelText="No"
          >
            <BaseButton danger>Click to Confirm</BaseButton>
          </BasePopconfirm>
        </S.DemoRow>
      </S.DemoBlock>

      {/* ================== FEEDBACK: NOTIFICATION / MESSAGE ================== */}
      <S.SectionTitle>
        useFeedback: Notification / Message / Modal
      </S.SectionTitle>
      <S.DemoBlock>
        <S.Label>Notifications</S.Label>
        <S.DemoRow>
          <BaseButton onClick={() => handleShowNotification("success")}>
            Success
          </BaseButton>
          <BaseButton onClick={() => handleShowNotification("info")}>
            Info
          </BaseButton>
          <BaseButton onClick={() => handleShowNotification("warning")}>
            Warning
          </BaseButton>
          <BaseButton onClick={() => handleShowNotification("error")}>
            Error
          </BaseButton>
        </S.DemoRow>
        <S.Label>Messages</S.Label>
        <S.DemoRow>
          <BaseButton onClick={() => handleShowMessage("success")}>
            Success Msg
          </BaseButton>
          <BaseButton onClick={() => handleShowMessage("info")}>
            Info Msg
          </BaseButton>
          <BaseButton onClick={() => handleShowMessage("warning")}>
            Warning Msg
          </BaseButton>
          <BaseButton onClick={() => handleShowMessage("error")}>
            Error Msg
          </BaseButton>
        </S.DemoRow>
        <S.Label>Modal</S.Label>
        <S.DemoRow>
          <BaseButton onClick={handleConfirmModal}>Confirm Modal</BaseButton>
          <BaseButton onClick={() => setModalOpen(true)}>Open Modal</BaseButton>
          <BaseButton onClick={() => setDrawerOpen(true)}>
            Open Drawer
          </BaseButton>
          <BaseButton danger onClick={() => setDeleteModalOpen(true)}>
            Delete Modal
          </BaseButton>
        </S.DemoRow>
      </S.DemoBlock>

      {/* ================== LOADING STATES ================== */}
      <S.SectionTitle>Spin / Skeleton / Empty / Result</S.SectionTitle>
      <S.DemoBlock>
        <BaseRow gutter={[16, 16]}>
          <BaseCol span={6}>
            <S.Label>Spin</S.Label>
            <BaseFlex justify="center">
              <BaseSpin />
            </BaseFlex>
          </BaseCol>
          <BaseCol span={18}>
            <S.Label>Skeleton</S.Label>
            <BaseSkeleton active paragraph={{ rows: 2 }} />
          </BaseCol>
          <BaseCol span={12}>
            <S.Label>Empty</S.Label>
            <BaseEmpty description="No data available" />
          </BaseCol>
          <BaseCol span={12}>
            <S.Label>Result</S.Label>
            <BaseResult
              status="success"
              title="Operation Successful"
              subTitle="Demo result component"
            />
          </BaseCol>
        </BaseRow>
      </S.DemoBlock>

      <BaseDivider />

      {/* ================== LAYOUT: ROW / COL / SPACE / FLEX ================== */}
      <S.SectionTitle>
        Layout: Row / Col / Space / Flex / Divider
      </S.SectionTitle>
      <S.DemoBlock>
        <S.Label>Row + Col Grid</S.Label>
        <BaseRow gutter={[8, 8]}>
          <BaseCol span={6}>
            <div
              style={{
                background: "rgba(0,120,212,0.1)",
                padding: "8px",
                textAlign: "center",
              }}
            >
              Col-6
            </div>
          </BaseCol>
          <BaseCol span={6}>
            <div
              style={{
                background: "rgba(0,120,212,0.2)",
                padding: "8px",
                textAlign: "center",
              }}
            >
              Col-6
            </div>
          </BaseCol>
          <BaseCol span={6}>
            <div
              style={{
                background: "rgba(0,120,212,0.1)",
                padding: "8px",
                textAlign: "center",
              }}
            >
              Col-6
            </div>
          </BaseCol>
          <BaseCol span={6}>
            <div
              style={{
                background: "rgba(0,120,212,0.2)",
                padding: "8px",
                textAlign: "center",
              }}
            >
              Col-6
            </div>
          </BaseCol>
        </BaseRow>
        <BaseDivider />
        <S.Label>Space</S.Label>
        <BaseSpace size="large">
          <BaseButton>Item 1</BaseButton>
          <BaseButton>Item 2</BaseButton>
          <BaseButton>Item 3</BaseButton>
        </BaseSpace>
        <BaseDivider />
        <S.Label>Flex</S.Label>
        <BaseFlex gap={8} wrap>
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              style={{
                background: "rgba(0,120,212,0.15)",
                padding: "12px 24px",
                borderRadius: 6,
              }}
            >
              Flex Item {i}
            </div>
          ))}
        </BaseFlex>
      </S.DemoBlock>

      {/* ================== FORM ================== */}
      <S.SectionTitle>Form (Demo Layout)</S.SectionTitle>
      <S.DemoBlock>
        <BaseFlex vertical gap={16} style={{ maxWidth: 400 }}>
          <div>
            <S.Label>Username</S.Label>
            <BaseInput prefix={<UserOutlined />} placeholder="Username" />
          </div>
          <div>
            <S.Label>Password</S.Label>
            <InputPassword placeholder="Password" />
          </div>
          <div>
            <S.Label>Role</S.Label>
            <BaseSelect style={{ width: "100%" }} defaultValue="admin">
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
              <Option value="editor">Editor</Option>
            </BaseSelect>
          </div>
          <BaseButton type="primary" block icon={<HomeOutlined />}>
            Submit
          </BaseButton>
        </BaseFlex>
      </S.DemoBlock>

      {/* ================== MODAL ================== */}
      <BaseModal
        title="Demo Modal"
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <p>This is a demo modal content.</p>
        <p>You can put any component here.</p>
        <BaseInput placeholder="Input inside modal" />
      </BaseModal>

      {/* ================== DRAWER ================== */}
      <BaseDrawer
        title="Demo Drawer"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <p>This is a demo drawer content.</p>
        <BaseDivider />
        <BaseDescriptions column={1} bordered>
          <BaseDescriptions.Item label="Status">Active</BaseDescriptions.Item>
          <BaseDescriptions.Item label="Created">
            2024-01-01
          </BaseDescriptions.Item>
        </BaseDescriptions>
      </BaseDrawer>

      {/* ================== DELETE MODAL ================== */}
      <DeleteModal
        open={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          setDeleteModalOpen(false);
          handleShowMessage("success");
        }}
        description="Are you sure you want to delete this item? This action cannot be undone."
      />
    </S.DemoContainer>
  );
};

export default DemoComponent;
