"use client";

import React, { useState } from "react";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

import {
  ArrowLeftOutlined,
  FileDoneOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

import { submitProposal } from "@/api/tender";
import {
  BaseButton,
  BaseDivider,
  BaseDrawer,
  BaseInput,
  BaseRadio,
  BaseSelect,
  BaseTable,
  BaseTag,
  BaseTypography,
  Option,
} from "@/components/common";
import { useFeedback } from "@/hooks/common";
import {
  SubmitProposalDTO,
  TenderSession,
  TenderSubmission,
} from "@/interfaces/tender";

import { formatCurrency } from "../../list/index.utils";
import * as S from "./TenderDetail.styles";

const { Paragraph, Text, Title } = BaseTypography;

interface Props {
  session: TenderSession;
}

export default function TenderDetail({ session }: Props) {
  const router = useRouter();
  const locale = useLocale();
  const { message } = useFeedback();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [proposalPrice, setProposalPrice] = useState<number | "">("");
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [submissionResult, setSubmissionResult] =
    useState<TenderSubmission | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isClosed = session.trangThai === "DONG";

  // Build criteria table columns
  const criteriaColumns = [
    {
      title: "Mã tiêu chí",
      dataIndex: "maTieuChi",
      key: "maTieuChi",
      width: 120,
    },
    {
      title: "Tên tiêu chí",
      dataIndex: "tenTieuChi",
      key: "tenTieuChi",
    },
    {
      title: "Nhóm",
      dataIndex: "nhom",
      key: "nhom",
      render: (nhom: string) => {
        const maps: Record<string, string> = {
          sang_loc: "Sàng lọc",
          ky_thuat: "Kỹ thuật",
          thuong_mai: "Thương mại",
          gia_tri: "Giá trị",
          rui_ro: "Rủi ro",
        };
        return <BaseTag color="blue">{maps[nhom] || nhom}</BaseTag>;
      },
    },
    {
      title: "Loại tiêu chí",
      dataIndex: "loai",
      key: "loai",
      width: 120,
    },
    {
      title: "Trọng số",
      dataIndex: "trongSo",
      key: "trongSo",
      width: 100,
      render: (val: number) => `${val * 100}%`,
    },
    {
      title: "Ràng buộc",
      key: "constraints",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap" }}>
          {record.batBuoc && <BaseTag color="red">Bắt buộc</BaseTag>}
          {record.rangBuocCung && (
            <BaseTag color="orange">Ràng buộc cứng</BaseTag>
          )}
        </div>
      ),
    },
  ];

  const handleInputChange = (maTieuChi: string, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [maTieuChi]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!proposalPrice || proposalPrice <= 0) {
      message.error("Vui lòng nhập giá đề xuất hợp lệ lớn hơn 0!");
      return;
    }

    if (session.giaToiDa && proposalPrice > session.giaToiDa) {
      message.error(
        `Giá đề xuất không được vượt quá giá trần: ${formatCurrency(session.giaToiDa, locale)}`
      );
      return;
    }

    // Validate required fields
    const criteriaList = session.tieuChi || [];
    for (const c of criteriaList) {
      if (
        c.batBuoc &&
        (formValues[c.maTieuChi] === undefined ||
          formValues[c.maTieuChi] === "")
      ) {
        message.error(`Tiêu chí "${c.tenTieuChi}" là bắt buộc!`);
        return;
      }
    }

    // Map dynamic fields to submission DTO payload format
    const cacGiaTri = Object.entries(formValues).map(([maTieuChi, val]) => {
      // Cast value to correct type based on criteria definition
      const crit = criteriaList.find((c) => c.maTieuChi === maTieuChi);
      let parsedVal = val;
      if (crit?.loai === "SO" || crit?.loai === "PHAN_TRAM") {
        parsedVal = Number(val);
      } else if (crit?.loai === "DUNG_SAI") {
        parsedVal = val === "true" || val === true;
      }
      return {
        maTieuChi,
        giaTri: parsedVal,
      };
    });

    setIsSubmitting(true);
    try {
      const payload: SubmitProposalDTO = {
        giaDeXuat: Number(proposalPrice),
        cacGiaTri,
      };
      const res = await submitProposal(session._id, payload);
      setSubmissionResult(res.data);
      message.success("Nộp hồ sơ thầu thành công!");
      setDrawerOpen(false);
    } catch (err: any) {
      message.error(
        err.data?.message || "Có lỗi xảy ra khi nộp hồ sơ. Vui lòng thử lại!"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <S.Container>
      <S.BackButtonRow>
        <BaseButton icon={<ArrowLeftOutlined />} onClick={() => router.back()}>
          Quay lại danh sách
        </BaseButton>
      </S.BackButtonRow>

      <S.ContentCard>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
          }}
        >
          <BaseTag color="purple">Phiên Đấu Thầu</BaseTag>
          {isClosed ? (
            <BaseTag color="red">Đã đóng thầu</BaseTag>
          ) : (
            <BaseTag color="green">Đang mở thầu</BaseTag>
          )}
        </div>

        <S.Title>{session.tieuDe}</S.Title>
        <Paragraph
          style={{ color: "#4b5563", fontSize: "1rem", lineHeight: 1.6 }}
        >
          {session.moTa || "Không có mô tả chi tiết cho gói thầu này."}
        </Paragraph>

        <S.MetaGrid>
          <S.MetaItem>
            <span className="label">Giá trần gói thầu</span>
            <span className="value highlight">
              {formatCurrency(session.giaToiDa, locale)}
            </span>
          </S.MetaItem>
          <S.MetaItem>
            <span className="label">Trọng số kỹ thuật</span>
            <span className="value">{session.trongSoKyThuat * 100}%</span>
          </S.MetaItem>
          <S.MetaItem>
            <span className="label">Trọng số giá</span>
            <span className="value">{session.trongSoGia * 100}%</span>
          </S.MetaItem>
          <S.MetaItem>
            <span className="label">Điểm kỹ thuật tối thiểu</span>
            <span className="value">{session.diemKyThuatToiThieu} / 100</span>
          </S.MetaItem>
        </S.MetaGrid>

        {/* Action controls */}
        {!isClosed && !submissionResult && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <BaseButton
              type="primary"
              size="large"
              icon={<FileDoneOutlined />}
              onClick={() => setDrawerOpen(true)}
            >
              Nộp hồ sơ đề xuất
            </BaseButton>
          </div>
        )}

        {/* Submission Result / Scoring Detail breakdown display */}
        {submissionResult && (
          <S.ScoreBreakdown>
            <div className="score-title">
              <TrophyOutlined
                style={{ color: "#047857", marginRight: "0.5rem" }}
              />
              Kết quả hồ sơ đề xuất của bạn
            </div>
            <div className="grid">
              <div className="score-item">
                <span className="lbl">Giá đề xuất</span>
                <span className="val">
                  {formatCurrency(submissionResult.giaDeXuat, locale)}
                </span>
              </div>
              <div className="score-item">
                <span className="lbl">Điểm kỹ thuật</span>
                <span className="val">
                  {submissionResult.diemKyThuat?.toFixed(1) || "---"}
                </span>
              </div>
              <div className="score-item">
                <span className="lbl">Điểm giá</span>
                <span className="val">
                  {submissionResult.diemGia?.toFixed(1) || "---"}
                </span>
              </div>
              <div className="score-item">
                <span className="lbl">Điểm tổng hợp</span>
                <span className="val">
                  {submissionResult.diemTongHop?.toFixed(2) || "---"}
                </span>
              </div>
            </div>
            <div style={{ marginTop: "1rem", textAlign: "right" }}>
              <Text strong style={{ color: "#065f46" }}>
                Thứ hạng đề xuất của bạn: Hạng{" "}
                {submissionResult.thuHang || "---"}
              </Text>
            </div>
          </S.ScoreBreakdown>
        )}

        <S.SectionTitle>Danh mục Tiêu chí kỹ thuật & Thương mại</S.SectionTitle>
        <BaseTable
          columns={criteriaColumns}
          dataSource={session.tieuChi || []}
          rowKey="_id"
          pagination={false}
          bordered
        />
      </S.ContentCard>

      {/* Dynamic proposal drawer */}
      <BaseDrawer
        title="Nộp Hồ Sơ Đề Xuất Thầu"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={520}
        extra={
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <BaseButton onClick={() => setDrawerOpen(false)}>Hủy</BaseButton>
            <BaseButton
              type="primary"
              loading={isSubmitting}
              onClick={handleSubmit}
            >
              Nộp hồ sơ
            </BaseButton>
          </div>
        }
      >
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <div>
            <S.FormLabel>
              Giá đề xuất gói thầu <span className="required">*</span>
            </S.FormLabel>
            <BaseInput
              type="number"
              placeholder="Nhập giá đề xuất (VND)"
              value={proposalPrice}
              onChange={(e) =>
                setProposalPrice(e.target.value ? Number(e.target.value) : "")
              }
            />
            {session.giaToiDa && (
              <S.FormHelpText>
                Giá trần không được vượt quá{" "}
                {formatCurrency(session.giaToiDa, locale)}
              </S.FormHelpText>
            )}
          </div>

          <BaseDivider />

          <Title level={5} style={{ margin: 0 }}>
            Điền giá trị cho các tiêu chí
          </Title>

          {(session.tieuChi || []).map((c) => (
            <div key={c._id}>
              <S.FormLabel>
                {c.tenTieuChi}{" "}
                {c.batBuoc && <span className="required">*</span>}
              </S.FormLabel>

              {c.loai === "SO" && (
                <BaseInput
                  type="number"
                  placeholder={`Nhập giá trị số (Đơn vị: ${c.donVi || "---"})`}
                  value={formValues[c.maTieuChi] ?? ""}
                  onChange={(e) =>
                    handleInputChange(c.maTieuChi, e.target.value)
                  }
                />
              )}

              {c.loai === "PHAN_TRAM" && (
                <BaseInput
                  type="number"
                  placeholder="Nhập phần trăm (%)"
                  value={formValues[c.maTieuChi] ?? ""}
                  onChange={(e) =>
                    handleInputChange(c.maTieuChi, e.target.value)
                  }
                  addonAfter="%"
                />
              )}

              {c.loai === "DUNG_SAI" && (
                <BaseRadio.Group
                  value={formValues[c.maTieuChi]}
                  onChange={(e) =>
                    handleInputChange(c.maTieuChi, e.target.value)
                  }
                >
                  <BaseRadio value="true">Đạt (True)</BaseRadio>
                  <BaseRadio value="false">Không đạt (False)</BaseRadio>
                </BaseRadio.Group>
              )}

              {c.loai === "LUA_CHON" && (
                <BaseSelect
                  placeholder="Chọn đáp án"
                  value={formValues[c.maTieuChi]}
                  onChange={(val) => handleInputChange(c.maTieuChi, val)}
                  style={{ width: "100%" }}
                >
                  {(c.cacLuaChon || []).map((opt) => (
                    <Option key={opt.giaTri} value={opt.giaTri}>
                      {opt.nhan} (Điểm: {opt.diem})
                    </Option>
                  ))}
                </BaseSelect>
              )}

              {c.loai === "TAI_LIEU" && (
                <BaseInput
                  placeholder="Đường dẫn link tài liệu/chứng minh"
                  value={formValues[c.maTieuChi] ?? ""}
                  onChange={(e) =>
                    handleInputChange(c.maTieuChi, e.target.value)
                  }
                />
              )}

              <S.FormHelpText>
                Mã: {c.maTieuChi} | Loại: {c.loai} | Trọng số: {c.trongSo * 100}
                %
              </S.FormHelpText>
            </div>
          ))}
        </div>
      </BaseDrawer>
    </S.Container>
  );
}
