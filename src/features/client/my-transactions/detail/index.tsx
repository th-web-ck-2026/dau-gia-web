"use client";

import React, { useEffect, useMemo, useState } from "react";

import { useTranslations } from "next-intl";

import {
  ArrowLeftOutlined,
  ExclamationCircleOutlined,
  SaveOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Descriptions,
  Divider,
  Input,
  Popconfirm,
  Space,
  Spin,
  Steps,
  Upload,
  message,
} from "antd";

import { LoaiPhien, TrangThaiGiaoDich } from "@/constants";
import { formatCurrency, formatDate } from "@/constants/common";
import { useAuth, useUpload } from "@/hooks/common";
import { Link } from "@/i18n/routing";

import { ReportUserModal } from "../components/ReportUserModal";
import {
  useGetSessionDetail,
  useGetTransactionDetail,
  useTransactionMutations,
} from "./index.hooks";
import * as S from "./index.styles";

interface TransactionDetailProps {
  id: string;
}

const TransactionDetail: React.FC<TransactionDetailProps> = ({ id }) => {
  const t = useTranslations("myTransactions");
  const { user } = useAuth();
  const { uploadPublic } = useUpload();

  const [noteText, setNoteText] = useState("");
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);
  const [lastTransactionId, setLastTransactionId] = useState<
    string | undefined
  >(undefined);

  const { data: transactionRes, isLoading: loadingTransaction } =
    useGetTransactionDetail(id);
  const transaction = transactionRes?.data;

  const { data: sessionRes, isLoading: loadingSession } = useGetSessionDetail(
    transaction?.phienId,
    transaction?.loaiPhien
  );
  const session = sessionRes?.data;

  const mutations = useTransactionMutations(id);

  const isHost = useMemo(() => {
    return user && transaction && transaction.chuPhienId === user._id;
  }, [user, transaction]);

  const isWinner = useMemo(() => {
    return user && transaction && transaction.nguoiThangId === user._id;
  }, [user, transaction]);

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (transaction?.trangThai !== TrangThaiGiaoDich.CHO_XAC_NHAN) return;
    if (!transaction.hanXacNhan) return;

    const deadline = new Date(transaction.hanXacNhan).getTime();
    const calcRemaining = () => Math.max(0, deadline - Date.now());

    const timer = setInterval(() => {
      const remaining = calcRemaining();
      setTimeLeft(remaining);
      if (remaining <= 0) clearInterval(timer);
    }, 1000);

    const init = setTimeout(() => {
      setTimeLeft(calcRemaining());
    }, 0);

    return () => {
      clearInterval(timer);
      clearTimeout(init);
    };
  }, [transaction?.trangThai, transaction?.hanXacNhan]);

  const countdownDisplay = useMemo(() => {
    if (timeLeft <= 0) return null;
    const totalSec = Math.floor(timeLeft / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  }, [timeLeft]);

  if (transaction && transaction._id !== lastTransactionId) {
    setLastTransactionId(transaction._id);
    const note = isHost
      ? transaction.ghiChuLienHeChuPhien
      : transaction.ghiChuLienHeNguoiThang;
    setNoteText(note || "");
    setReceiptUrl(transaction.anhChungTu?.[0] ?? null);
  }

  if (loadingTransaction || loadingSession) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "100px 0",
        }}
      >
        <Spin size="large" tip={t("loading") || "Đang tải dữ liệu..."} />
      </div>
    );
  }

  if (!transaction) {
    return (
      <S.Container>
        <Alert
          message={t("error.notFoundTitle") || "Lỗi"}
          description={t("error.notFoundDesc") || "Giao dịch không tồn tại."}
          type="error"
          showIcon
        />
        <div style={{ marginTop: 16 }}>
          <Link href="/my-transactions">
            <Button icon={<ArrowLeftOutlined />}>{t("backToList")}</Button>
          </Link>
        </div>
      </S.Container>
    );
  }

  const isAuction = transaction.loaiPhien === LoaiPhien.DAU_GIA;

  let currentStep = 0;
  let stepsItems = [];

  if (isAuction) {
    stepsItems = [
      { title: t("steps.confirm") },
      { title: t("steps.payment") },
      { title: t("steps.complete") },
    ];
    if (transaction.trangThai === TrangThaiGiaoDich.CHO_XAC_NHAN) {
      currentStep = 0;
    } else if (
      transaction.trangThai === TrangThaiGiaoDich.CHO_THANH_TOAN ||
      transaction.trangThai === TrangThaiGiaoDich.DA_THANH_TOAN
    ) {
      currentStep = 1;
    } else if (
      transaction.trangThai === TrangThaiGiaoDich.HOAN_TAT ||
      transaction.trangThai === TrangThaiGiaoDich.THAT_BAI ||
      transaction.trangThai === TrangThaiGiaoDich.DA_HUY
    ) {
      currentStep = 2;
    }
  } else {
    stepsItems = [
      { title: t("steps.confirm") },
      { title: t("steps.signContract") },
      { title: t("steps.handover") },
      { title: t("steps.complete") },
    ];
    if (transaction.trangThai === TrangThaiGiaoDich.CHO_XAC_NHAN) {
      currentStep = 0;
    } else if (
      transaction.trangThai === TrangThaiGiaoDich.CHO_KY_HOP_DONG ||
      transaction.trangThai === TrangThaiGiaoDich.DA_KY_HOP_DONG
    ) {
      currentStep = 1;
    } else if (transaction.trangThai === TrangThaiGiaoDich.DANG_BAN_GIAO) {
      currentStep = 2;
    } else if (
      transaction.trangThai === TrangThaiGiaoDich.HOAN_TAT ||
      transaction.trangThai === TrangThaiGiaoDich.THAT_BAI ||
      transaction.trangThai === TrangThaiGiaoDich.DA_HUY
    ) {
      currentStep = 3;
    }
  }

  const isTerminalState = [
    TrangThaiGiaoDich.HOAN_TAT,
    TrangThaiGiaoDich.THAT_BAI,
    TrangThaiGiaoDich.DA_HUY,
  ].includes(transaction.trangThai);

  const hasContactInfo = !!transaction.lienHe;

  const handleSaveNote = () => {
    mutations.updateNote.mutate({ ghiChu: noteText });
  };

  const handleCustomUpload = async (options: any) => {
    const { file, onSuccess, onError } = options;
    try {
      const res = await uploadPublic.mutateAsync({ file: file as File });
      if (res.success && res.data) {
        setReceiptUrl(res.data);
        onSuccess("Ok");
      } else {
        onError(new Error("Upload failed"));
      }
    } catch (err) {
      onError(err);
    }
  };

  const handleReportPaid = () => {
    if (!receiptUrl) {
      message.error(t("payment.receiptRequired"));
      return;
    }
    mutations.reportPaid.mutate({ anhChungTu: [receiptUrl] });
  };

  const otherUserContact = isHost
    ? transaction.lienHe?.nguoiThang
    : transaction.lienHe?.chuPhien;

  const otherRoleText = isHost ? t("role.winner") : t("role.host");

  return (
    <S.Container>
      <S.Header>
        <Space>
          <Link href="/my-transactions">
            <Button icon={<ArrowLeftOutlined />} type="text" />
          </Link>
          <S.Title>{session?.tieuDe || t("detailTitle")}</S.Title>
        </Space>
        {isHost && !isTerminalState && (
          <Popconfirm
            title={t("actions.cancelConfirmTitle")}
            description={t("actions.cancelConfirmDesc")}
            okText={t("actions.yes")}
            cancelText={t("actions.no")}
            onConfirm={() => mutations.cancel.mutate()}
          >
            <Button danger loading={mutations.cancel.isPending}>
              {t("actions.cancelBtn")}
            </Button>
          </Popconfirm>
        )}
      </S.Header>

      {/* Steps timeline */}
      <S.TimelineCard>
        <Steps
          current={currentStep}
          status={
            transaction.trangThai === TrangThaiGiaoDich.THAT_BAI
              ? "error"
              : transaction.trangThai === TrangThaiGiaoDich.DA_HUY
                ? "wait"
                : "process"
          }
          items={stepsItems}
        />
      </S.TimelineCard>

      <S.ContentGrid>
        {/* Left column: State-based Action Panels */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Main info panel */}
          <S.PanelWrapper>
            <S.PanelTitle>{t("info.title")}</S.PanelTitle>
            <Descriptions bordered column={1}>
              <Descriptions.Item label={t("info.sessionId")}>
                <span style={{ fontFamily: "monospace" }}>
                  {transaction.phienId}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label={t("info.sessionType")}>
                {isAuction ? t("sessionType.auction") : t("sessionType.tender")}
              </Descriptions.Item>
              <Descriptions.Item label={t("info.finalPrice")}>
                <span
                  style={{ fontWeight: 600, color: "#1f3aa0", fontSize: 16 }}
                >
                  {transaction.giaChot
                    ? formatCurrency(transaction.giaChot, "VND")
                    : "-"}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label={t("info.createdAt")}>
                {formatDate(transaction.createdAt)}
              </Descriptions.Item>
              {transaction.trangThai === TrangThaiGiaoDich.CHO_XAC_NHAN && (
                <Descriptions.Item label={t("info.deadline")}>
                  <span style={{ color: "#faad14", fontWeight: 600 }}>
                    {formatDate(transaction.hanXacNhan)}
                  </span>
                </Descriptions.Item>
              )}
            </Descriptions>
          </S.PanelWrapper>

          {/* Dynamic Action Panel */}
          <S.PanelWrapper>
            <S.PanelTitle>{t("actions.panelTitle")}</S.PanelTitle>

            {/* CHO_XAC_NHAN */}
            {transaction.trangThai === TrangThaiGiaoDich.CHO_XAC_NHAN && (
              <>
                {/* Countdown bar — visible to both sides */}
                {countdownDisplay !== null ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      background:
                        timeLeft < 3 * 60 * 60 * 1000 ? "#fff1f0" : "#fffbe6",
                      border: `1px solid ${timeLeft < 3 * 60 * 60 * 1000 ? "#ffccc7" : "#ffe58f"}`,
                      borderRadius: 8,
                      padding: "10px 16px",
                    }}
                  >
                    <span style={{ fontSize: 13, color: "#78716c" }}>
                      {t("info.deadline")}:
                    </span>
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: 20,
                        fontWeight: 700,
                        color:
                          timeLeft < 3 * 60 * 60 * 1000 ? "#cf1322" : "#d97706",
                        letterSpacing: 2,
                      }}
                    >
                      {countdownDisplay}
                    </span>
                  </div>
                ) : (
                  <Alert
                    message={t("status.failExpireBanner")}
                    type="error"
                    showIcon
                  />
                )}
                {isWinner ? (
                  <div>
                    <Alert
                      message={t("actions.winnerConfirmMessage")}
                      type="info"
                      showIcon
                      style={{ marginBottom: 20 }}
                    />
                    <Space size="middle">
                      <Button
                        type="primary"
                        size="large"
                        loading={mutations.confirm.isPending}
                        onClick={() => mutations.confirm.mutate()}
                      >
                        {t("actions.confirmBtn")}
                      </Button>
                      <Popconfirm
                        title={t("actions.rejectConfirmTitle")}
                        description={t("actions.rejectConfirmDesc")}
                        okText={t("actions.yes")}
                        cancelText={t("actions.no")}
                        onConfirm={() => mutations.reject.mutate()}
                      >
                        <Button
                          danger
                          size="large"
                          loading={mutations.reject.isPending}
                        >
                          {t("actions.rejectBtn")}
                        </Button>
                      </Popconfirm>
                    </Space>
                  </div>
                ) : (
                  <Alert
                    message={t("actions.waitingWinnerConfirm")}
                    type="warning"
                    showIcon
                  />
                )}
              </>
            )}

            {/* CHO_THANH_TOAN (Auction Only) */}
            {transaction.trangThai === TrangThaiGiaoDich.CHO_THANH_TOAN && (
              <>
                {isWinner ? (
                  <div>
                    {transaction.thongTinChuyenKhoan && (
                      <S.BankInfoContainer>
                        <h4 style={{ margin: "0 0 12px 0", color: "#1e3a8a" }}>
                          {t("payment.bankTitle")}
                        </h4>
                        <Space direction="vertical" style={{ width: "100%" }}>
                          <div>
                            <strong>{t("payment.bankName")}:</strong>{" "}
                            {transaction.thongTinChuyenKhoan.tenNganHang}
                          </div>
                          <div>
                            <strong>{t("payment.accountNo")}:</strong>{" "}
                            {transaction.thongTinChuyenKhoan.soTaiKhoan}
                          </div>
                          <div>
                            <strong>{t("payment.accountName")}:</strong>{" "}
                            {transaction.thongTinChuyenKhoan.tenTaiKhoan}
                          </div>
                          <div>
                            <strong>{t("payment.amount")}:</strong>{" "}
                            <span style={{ color: "#b91c1c", fontWeight: 600 }}>
                              {formatCurrency(
                                transaction.thongTinChuyenKhoan.soTien || 0,
                                "VND"
                              )}
                            </span>
                          </div>
                          <div>
                            <strong>{t("payment.content")}:</strong>{" "}
                            <span
                              style={{
                                fontFamily: "monospace",
                                background: "#dbeafe",
                                padding: "2px 6px",
                                borderRadius: 4,
                              }}
                            >
                              {transaction.thongTinChuyenKhoan.noiDungCK}
                            </span>
                          </div>
                        </Space>
                      </S.BankInfoContainer>
                    )}

                    <div style={{ marginBottom: 20 }}>
                      <label
                        style={{
                          display: "block",
                          marginBottom: 8,
                          fontWeight: 500,
                        }}
                      >
                        {t("payment.uploadLabel")}
                      </label>
                      <Upload
                        customRequest={handleCustomUpload}
                        showUploadList={false}
                        accept="image/*"
                      >
                        <S.UploadBox>
                          {receiptUrl ? (
                            <S.ImagePreview
                              src={receiptUrl}
                              alt="Transfer slip"
                            />
                          ) : (
                            <div>
                              <UploadOutlined
                                style={{
                                  fontSize: 32,
                                  color: "#1f3aa0",
                                  marginBottom: 8,
                                }}
                              />
                              <p style={{ margin: 0 }}>
                                {t("payment.uploadPlaceholder")}
                              </p>
                            </div>
                          )}
                        </S.UploadBox>
                      </Upload>
                    </div>

                    <Button
                      type="primary"
                      size="large"
                      onClick={handleReportPaid}
                      disabled={!receiptUrl}
                      loading={mutations.reportPaid.isPending}
                    >
                      {t("payment.submitBtn")}
                    </Button>
                  </div>
                ) : (
                  <Alert
                    message={t("payment.waitingWinnerPayment")}
                    type="warning"
                    showIcon
                  />
                )}
              </>
            )}

            {/* DA_THANH_TOAN (Auction Only) */}
            {transaction.trangThai === TrangThaiGiaoDich.DA_THANH_TOAN && (
              <>
                {isHost ? (
                  <div>
                    <Alert
                      message={t("payment.hostVerifyTitle")}
                      description={t("payment.hostVerifyDesc")}
                      type="info"
                      showIcon
                      style={{ marginBottom: 20 }}
                    />

                    {transaction.anhChungTu &&
                      transaction.anhChungTu.length > 0 && (
                        <div style={{ marginBottom: 20 }}>
                          <strong style={{ display: "block", marginBottom: 8 }}>
                            {t("payment.receiptPreview")}:
                          </strong>
                          <S.ImagePreview
                            src={transaction.anhChungTu[0]}
                            alt="Receipt"
                          />
                        </div>
                      )}

                    <Space size="middle">
                      {!transaction.thoiDiemChuPhienXacNhanTien ? (
                        <Button
                          type="primary"
                          loading={mutations.confirmPayment.isPending}
                          onClick={() => mutations.confirmPayment.mutate()}
                        >
                          {t("payment.confirmReceivedBtn")}
                        </Button>
                      ) : (
                        <Button
                          type="primary"
                          loading={mutations.complete.isPending}
                          onClick={() => mutations.complete.mutate()}
                        >
                          {t("payment.completeTransactionBtn")}
                        </Button>
                      )}
                    </Space>
                  </div>
                ) : (
                  <div>
                    <Alert
                      message={t("payment.waitingHostVerify")}
                      type="info"
                      showIcon
                      style={{ marginBottom: 20 }}
                    />
                    {transaction.anhChungTu &&
                      transaction.anhChungTu.length > 0 && (
                        <S.ImagePreview
                          src={transaction.anhChungTu[0]}
                          alt="Receipt"
                        />
                      )}
                  </div>
                )}
              </>
            )}

            {/* CHO_KY_HOP_DONG (Tender Only) */}
            {transaction.trangThai === TrangThaiGiaoDich.CHO_KY_HOP_DONG && (
              <div>
                <Alert
                  message={t("contract.signingTitle")}
                  description={t("contract.signingDesc")}
                  type="info"
                  showIcon
                  style={{ marginBottom: 20 }}
                />

                <Space
                  direction="vertical"
                  style={{ width: "100%", marginBottom: 20 }}
                >
                  <S.ChecklistRow>
                    <span>
                      {t("role.host")}:{" "}
                      {(session as any)?.chuPhien?.toChucProfile?.tenToChuc ||
                        session?.chuPhien?.fullname ||
                        t("role.host")}
                    </span>
                    {transaction.chuPhienDaKy ? (
                      <span style={{ color: "#22c55e", fontWeight: 600 }}>
                        {t("contract.signed")}
                      </span>
                    ) : (
                      <span style={{ color: "#9ca3af" }}>
                        {t("contract.unsigned")}
                      </span>
                    )}
                  </S.ChecklistRow>
                  <S.ChecklistRow>
                    <span>
                      {t("role.winner")}:{" "}
                      {transaction.lienHe?.nguoiThang?.fullname ||
                        t("role.winner")}
                    </span>
                    {transaction.nguoiThangDaKy ? (
                      <span style={{ color: "#22c55e", fontWeight: 600 }}>
                        {t("contract.signed")}
                      </span>
                    ) : (
                      <span style={{ color: "#9ca3af" }}>
                        {t("contract.unsigned")}
                      </span>
                    )}
                  </S.ChecklistRow>
                </Space>

                {((isHost && !transaction.chuPhienDaKy) ||
                  (isWinner && !transaction.nguoiThangDaKy)) && (
                  <Button
                    type="primary"
                    size="large"
                    loading={mutations.sign.isPending}
                    onClick={() => mutations.sign.mutate()}
                  >
                    {t("contract.signBtn")}
                  </Button>
                )}
              </div>
            )}

            {/* DA_KY_HOP_DONG (Tender Only) */}
            {transaction.trangThai === TrangThaiGiaoDich.DA_KY_HOP_DONG && (
              <>
                {isHost ? (
                  <div>
                    <Alert
                      message={t("handover.hostTitle")}
                      description={t("handover.hostDesc")}
                      type="info"
                      showIcon
                      style={{ marginBottom: 20 }}
                    />
                    <Button
                      type="primary"
                      size="large"
                      loading={mutations.handover.isPending}
                      onClick={() => mutations.handover.mutate()}
                    >
                      {t("handover.handoverBtn")}
                    </Button>
                  </div>
                ) : (
                  <Alert
                    message={t("handover.waitingHostHandover")}
                    type="warning"
                    showIcon
                  />
                )}
              </>
            )}

            {/* DANG_BAN_GIAO (Tender Only) */}
            {transaction.trangThai === TrangThaiGiaoDich.DANG_BAN_GIAO && (
              <>
                {isWinner ? (
                  <div>
                    <Alert
                      message={t("handover.winnerTitle")}
                      description={t("handover.winnerDesc")}
                      type="info"
                      showIcon
                      style={{ marginBottom: 20 }}
                    />
                    <Button
                      type="primary"
                      size="large"
                      loading={mutations.confirmReceipt.isPending}
                      onClick={() => mutations.confirmReceipt.mutate()}
                    >
                      {t("handover.confirmReceiptBtn")}
                    </Button>
                  </div>
                ) : (
                  <Alert
                    message={t("handover.waitingWinnerConfirm")}
                    type="warning"
                    showIcon
                  />
                )}
              </>
            )}

            {/* HOAN_TAT */}
            {transaction.trangThai === TrangThaiGiaoDich.HOAN_TAT && (
              <Alert
                message={t("status.completeBanner")}
                type="success"
                showIcon
              />
            )}

            {/* THAT_BAI */}
            {transaction.trangThai === TrangThaiGiaoDich.THAT_BAI && (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <Alert
                  message={
                    transaction.lyDoThatBai === "TU_CHOI"
                      ? t("status.failRejectBanner")
                      : t("status.failExpireBanner")
                  }
                  type="error"
                  showIcon
                />

                {isHost && (
                  <div style={{ marginTop: 8 }}>
                    <Button
                      type="primary"
                      danger
                      onClick={() => setReportModalOpen(true)}
                    >
                      {t("report.reportWinnerBtn")}
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* DA_HUY */}
            {transaction.trangThai === TrangThaiGiaoDich.DA_HUY && (
              <Alert
                message={t("status.canceledBanner")}
                type="error"
                showIcon
              />
            )}
          </S.PanelWrapper>
        </div>

        {/* Right column: Contact & Notes */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {hasContactInfo ? (
            <S.PanelWrapper>
              <S.PanelTitle>
                {t("contact.title", { role: otherRoleText })}
              </S.PanelTitle>
              {otherUserContact ? (
                <Space direction="vertical" style={{ width: "100%" }}>
                  <div>
                    <strong>{t("contact.name")}:</strong>{" "}
                    {otherUserContact.fullname}
                  </div>
                  <div>
                    <strong>{t("contact.phone")}:</strong>{" "}
                    {otherUserContact.phone}
                  </div>
                  <div>
                    <strong>{t("contact.email")}:</strong>{" "}
                    {otherUserContact.email}
                  </div>
                  {otherUserContact.diaChi && (
                    <div>
                      <strong>{t("contact.address")}:</strong>{" "}
                      {otherUserContact.diaChi}
                    </div>
                  )}

                  <Divider style={{ margin: "12px 0" }} />

                  <div>
                    <label
                      style={{
                        fontWeight: 500,
                        display: "block",
                        marginBottom: 8,
                      }}
                    >
                      {t("contact.noteLabel")}
                    </label>
                    <Input.TextArea
                      rows={3}
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder={t("contact.notePlaceholder")}
                      disabled={isTerminalState}
                    />
                    {!isTerminalState && (
                      <Button
                        type="primary"
                        icon={<SaveOutlined />}
                        style={{ marginTop: 12 }}
                        loading={mutations.updateNote.isPending}
                        onClick={handleSaveNote}
                      >
                        {t("contact.saveNoteBtn")}
                      </Button>
                    )}
                  </div>
                </Space>
              ) : (
                <div>-</div>
              )}
            </S.PanelWrapper>
          ) : (
            <S.PanelWrapper>
              <S.PanelTitle>{t("contact.titleLocked")}</S.PanelTitle>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "flex-start",
                  color: "#6b7280",
                }}
              >
                <ExclamationCircleOutlined style={{ marginTop: 3 }} />
                <span>{t("contact.lockedMessage")}</span>
              </div>
            </S.PanelWrapper>
          )}
        </div>
      </S.ContentGrid>

      {/* Report Modal */}
      {transaction && (
        <ReportUserModal
          open={reportModalOpen}
          onClose={() => setReportModalOpen(false)}
          targetUserId={transaction.nguoiThangId}
          targetUsername={
            transaction.lienHe?.nguoiThang?.fullname || "Người thắng"
          }
        />
      )}
    </S.Container>
  );
};

export default TransactionDetail;
