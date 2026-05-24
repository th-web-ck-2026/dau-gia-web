"use client";

import React, { useEffect, useState } from "react";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

import {
  AlertOutlined,
  ArrowLeftOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { createAuction } from "@/api/auction";
import { createTender } from "@/api/tender";
import {
  BaseButton,
  BaseCard,
  BaseCol,
  BaseDatePicker,
  BaseInput,
  BaseRow,
  BaseSelect,
  BaseSwitch,
  BaseTypography,
  Option,
} from "@/components/common";
import { useFeedback } from "@/hooks/common";
import { HuongToiUu, LoaiTieuChi, TenderCriteria } from "@/interfaces/tender";

const { Title, Paragraph, Text } = BaseTypography;

export function HostCreateSessionFeature() {
  const router = useRouter();
  const locale = useLocale();
  const { message } = useFeedback();

  // Basic Form States
  const [sessionType, setSessionType] = useState<"tender" | "auction">(
    "tender"
  );
  const [tieuDe, setTieuDe] = useState("");
  const [moTa, setMoTa] = useState("");
  const [batDau, setBatDau] = useState<string>("");
  const [ketThuc, setKetThuc] = useState<string>("");
  const [anDanh, setAnDanh] = useState(true);

  // Auction specific
  const [giaKhoiDiem, setGiaKhoiDiem] = useState<number>(0);
  const [buocGia, setBuocGia] = useState<number>(0);
  const [datCoc, setDatCoc] = useState<number>(0);

  // Tender specific
  const [giaToiDa, setGiaToiDa] = useState<number>(0);
  const [trongSoKT, setTrongSoKT] = useState<number>(60); // %
  const [trongSoGia, setTrongSoGia] = useState<number>(40); // %
  const [diemKTToiThieu, setDiemKTToiThieu] = useState<number>(50);
  const [criteria, setCriteria] = useState<TenderCriteria[]>([
    {
      tenTieuChi: "Kinh nghiệm thực hiện dự án tương tự",
      maTieuChi: "kinh_nghiem",
      nhom: "ky_thuat",
      loai: LoaiTieuChi.SO,
      trongSo: 0.4,
      huongToiUu: HuongToiUu.CAO_HON,
      batBuoc: true,
      rangBuocCung: false,
    },
    {
      tenTieuChi: "Thời gian bảo hành thiết bị",
      maTieuChi: "bao_hanh",
      nhom: "ky_thuat",
      loai: LoaiTieuChi.SO,
      trongSo: 0.6,
      huongToiUu: HuongToiUu.CAO_HON,
      batBuoc: true,
      rangBuocCung: false,
    },
  ]);

  const [isSaving, setIsSaving] = useState(false);

  // Calculate sum of weights for validation warning
  const totalCriteriaWeight = criteria.reduce(
    (sum, item) => sum + (item.trongSo || 0),
    0
  );
  const isWeightValid = Math.abs(totalCriteriaWeight - 1.0) < 0.0001;

  const handleAddCriteria = () => {
    setCriteria((prev) => [
      ...prev,
      {
        tenTieuChi: "",
        maTieuChi: `tieu_chi_${prev.length + 1}`,
        nhom: "ky_thuat",
        loai: LoaiTieuChi.SO,
        trongSo: 0,
        huongToiUu: HuongToiUu.CAO_HON,
        batBuoc: false,
        rangBuocCung: false,
      },
    ]);
  };

  const handleRemoveCriteria = (index: number) => {
    setCriteria((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleCriteriaChange = (
    index: number,
    key: keyof TenderCriteria,
    val: any
  ) => {
    setCriteria((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, [key]: val } : item))
    );
  };

  const handleSave = async () => {
    if (!tieuDe) {
      message.error("Vui lòng điền tiêu đề!");
      return;
    }
    if (!batDau || !ketThuc) {
      message.error("Vui lòng chọn thời gian bắt đầu và kết thúc!");
      return;
    }

    setIsSaving(true);
    try {
      if (sessionType === "tender") {
        if (!isWeightValid) {
          message.error(
            `Tổng trọng số các tiêu chí thầu phải bằng 100% (Hiện tại là ${(totalCriteriaWeight * 100).toFixed(0)}%)`
          );
          setIsSaving(false);
          return;
        }

        await createTender({
          tieuDe,
          moTa,
          thoiGianBatDau: batDau,
          thoiGianKetThuc: ketThuc,
          giaToiDa: giaToiDa || undefined,
          trongSoKyThuat: trongSoKT / 100,
          trongSoGia: trongSoGia / 100,
          diemKyThuatToiThieu: diemKTToiThieu,
          anDanh,
          tieuChi: criteria,
        });
      } else {
        await createAuction({
          tieuDe,
          moTa,
          thoiGianBatDau: batDau,
          thoiGianKetThuc: ketThuc,
          giaKhoiDiem,
          buocGia,
          tienDatCoc: datCoc || undefined,
          trongSoGia: 0.8,
          trongSoUyTin: 0.2,
          anDanh,
        });
      }
      message.success("Tạo phiên thành công!");
      router.push(`/${locale}/host/sessions`);
    } catch (err: any) {
      message.error(err.data?.message || "Có lỗi xảy ra khi tạo phiên!");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "2.25rem 1.5rem" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <BaseButton icon={<ArrowLeftOutlined />} onClick={() => router.back()}>
          Quay lại
        </BaseButton>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <Title level={2}>Tạo phiên Đấu thầu & Đấu giá mới</Title>
        <Paragraph style={{ color: "#6b7280" }}>
          Thiết lập thông tin chung, lịch trình và bộ tiêu chí đánh giá
        </Paragraph>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
        <BaseButton
          type={sessionType === "tender" ? "primary" : "default"}
          onClick={() => setSessionType("tender")}
        >
          Phiên Đấu Thầu (Tendering)
        </BaseButton>
        <BaseButton
          type={sessionType === "auction" ? "primary" : "default"}
          onClick={() => setSessionType("auction")}
        >
          Phiên Đấu Giá (Auction)
        </BaseButton>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <BaseCard title="Thông tin chung">
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            <div>
              <Text strong>Tiêu đề phiên *</Text>
              <BaseInput
                placeholder="Nhập tiêu đề gói thầu/tài sản..."
                value={tieuDe}
                onChange={(e) => setTieuDe(e.target.value)}
                style={{ marginTop: "0.25rem" }}
              />
            </div>
            <div>
              <Text strong>Mô tả chi tiết</Text>
              <BaseInput.TextArea
                placeholder="Mô tả thông số, thông tin chi tiết..."
                value={moTa}
                onChange={(e) => setMoTa(e.target.value)}
                style={{ marginTop: "0.25rem" }}
              />
            </div>
            <BaseRow gutter={16}>
              <BaseCol span={12}>
                <Text strong>Thời gian bắt đầu *</Text>
                <div style={{ marginTop: "0.25rem" }}>
                  <BaseDatePicker
                    showTime
                    style={{ width: "100%" }}
                    onChange={(val: any) =>
                      setBatDau(val ? val.toISOString() : "")
                    }
                  />
                </div>
              </BaseCol>
              <BaseCol span={12}>
                <Text strong>Thời gian kết thúc *</Text>
                <div style={{ marginTop: "0.25rem" }}>
                  <BaseDatePicker
                    showTime
                    style={{ width: "100%" }}
                    onChange={(val: any) =>
                      setKetThuc(val ? val.toISOString() : "")
                    }
                  />
                </div>
              </BaseCol>
            </BaseRow>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Text strong>Ẩn danh người tham gia</Text>
              <BaseSwitch checked={anDanh} onChange={setAnDanh} />
            </div>
          </div>
        </BaseCard>

        {sessionType === "tender" ? (
          <>
            <BaseCard title="Tham số Đấu Thầu (Tendering Parameters)">
              <BaseRow gutter={[16, 16]}>
                <BaseCol span={12}>
                  <Text strong>Giá trần tối đa (VND)</Text>
                  <BaseInput
                    type="number"
                    value={giaToiDa || ""}
                    onChange={(e) => setGiaToiDa(Number(e.target.value))}
                    style={{ marginTop: "0.25rem" }}
                  />
                </BaseCol>
                <BaseCol span={12}>
                  <Text strong>Điểm kỹ thuật tối thiểu (0-100)</Text>
                  <BaseInput
                    type="number"
                    value={diemKTToiThieu}
                    onChange={(e) => setDiemKTToiThieu(Number(e.target.value))}
                    style={{ marginTop: "0.25rem" }}
                  />
                </BaseCol>
                <BaseCol span={12}>
                  <Text strong>Trọng số điểm kỹ thuật (%)</Text>
                  <BaseInput
                    type="number"
                    value={trongSoKT}
                    onChange={(e) => {
                      setTrongSoKT(Number(e.target.value));
                      setTrongSoGia(100 - Number(e.target.value));
                    }}
                    style={{ marginTop: "0.25rem" }}
                  />
                </BaseCol>
                <BaseCol span={12}>
                  <Text strong>Trọng số điểm giá (%)</Text>
                  <BaseInput
                    type="number"
                    value={trongSoGia}
                    onChange={(e) => {
                      setTrongSoGia(Number(e.target.value));
                      setTrongSoKT(100 - Number(e.target.value));
                    }}
                    style={{ marginTop: "0.25rem" }}
                  />
                </BaseCol>
              </BaseRow>
            </BaseCard>

            {/* Criteria Builder */}
            <BaseCard
              title="Trình dựng tiêu chí chấm điểm (Criteria Builder)"
              extra={
                <BaseButton
                  type="dashed"
                  icon={<PlusOutlined />}
                  onClick={handleAddCriteria}
                >
                  Thêm tiêu chí
                </BaseButton>
              }
            >
              {!isWeightValid && (
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                    background: "#fffbe6",
                    border: "1px solid #ffe58f",
                    padding: "0.75rem 1rem",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    color: "#d48806",
                  }}
                >
                  <AlertOutlined />
                  <span>
                    Tổng trọng số các tiêu chí kỹ thuật phải bằng 100% (Hiện tại
                    là {(totalCriteriaWeight * 100).toFixed(0)}%)
                  </span>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {criteria.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "#f9fafb",
                      padding: "1.25rem",
                      borderRadius: "0.75rem",
                      border: "1px solid #f3f4f6",
                    }}
                  >
                    <BaseRow gutter={[16, 16]}>
                      <BaseCol xs={24} md={10}>
                        <Text strong>Tên tiêu chí</Text>
                        <BaseInput
                          value={item.tenTieuChi}
                          placeholder="Ví dụ: Công suất thiết bị"
                          onChange={(e) =>
                            handleCriteriaChange(
                              idx,
                              "tenTieuChi",
                              e.target.value
                            )
                          }
                          style={{ marginTop: "0.25rem" }}
                        />
                      </BaseCol>
                      <BaseCol xs={12} md={5}>
                        <Text strong>Mã tiêu chí (Unique)</Text>
                        <BaseInput
                          value={item.maTieuChi}
                          placeholder="cong_suat"
                          onChange={(e) =>
                            handleCriteriaChange(
                              idx,
                              "maTieuChi",
                              e.target.value
                            )
                          }
                          style={{ marginTop: "0.25rem" }}
                        />
                      </BaseCol>
                      <BaseCol xs={12} md={5}>
                        <Text strong>Loại tiêu chí</Text>
                        <div style={{ marginTop: "0.25rem" }}>
                          <BaseSelect
                            value={item.loai}
                            onChange={(val) =>
                              handleCriteriaChange(idx, "loai", val)
                            }
                            style={{ width: "100%" }}
                          >
                            <Option value={LoaiTieuChi.SO}>Số (Number)</Option>
                            <Option value={LoaiTieuChi.PHAN_TRAM}>
                              Phần trăm (%)
                            </Option>
                            <Option value={LoaiTieuChi.DUNG_SAI}>
                              Đúng/Sai (True/False)
                            </Option>
                            <Option value={LoaiTieuChi.LUA_CHON}>
                              Lựa chọn (Select)
                            </Option>
                            <Option value={LoaiTieuChi.TAI_LIEU}>
                              Tài liệu (File link)
                            </Option>
                          </BaseSelect>
                        </div>
                      </BaseCol>
                      <BaseCol xs={12} md={4}>
                        <Text strong>Trọng số (Hệ số)</Text>
                        <BaseInput
                          type="number"
                          value={item.trongSo}
                          placeholder="0.4"
                          onChange={(e) =>
                            handleCriteriaChange(
                              idx,
                              "trongSo",
                              Number(e.target.value)
                            )
                          }
                          style={{ marginTop: "0.25rem" }}
                        />
                      </BaseCol>

                      <BaseCol xs={12} md={6}>
                        <div
                          style={{
                            display: "flex",
                            gap: "1rem",
                            marginTop: "1rem",
                          }}
                        >
                          <BaseSwitch
                            checked={item.batBuoc}
                            onChange={(val) =>
                              handleCriteriaChange(idx, "batBuoc", val)
                            }
                          />
                          <Text>Bắt buộc</Text>
                        </div>
                      </BaseCol>
                      <BaseCol xs={12} md={6}>
                        <div
                          style={{
                            display: "flex",
                            gap: "1rem",
                            marginTop: "1rem",
                          }}
                        >
                          <BaseSwitch
                            checked={item.rangBuocCung}
                            onChange={(val) =>
                              handleCriteriaChange(idx, "rangBuocCung", val)
                            }
                          />
                          <Text>Ràng buộc cứng</Text>
                        </div>
                      </BaseCol>
                      <BaseCol
                        xs={24}
                        md={12}
                        style={{ textAlign: "right", marginTop: "0.5rem" }}
                      >
                        <BaseButton
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleRemoveCriteria(idx)}
                        >
                          Xóa dòng
                        </BaseButton>
                      </BaseCol>
                    </BaseRow>
                  </div>
                ))}
              </div>
            </BaseCard>
          </>
        ) : (
          <BaseCard title="Tham số Đấu Giá (Auction Parameters)">
            <BaseRow gutter={[16, 16]}>
              <BaseCol span={12}>
                <Text strong>Giá khởi điểm (VND) *</Text>
                <BaseInput
                  type="number"
                  value={giaKhoiDiem || ""}
                  onChange={(e) => setGiaKhoiDiem(Number(e.target.value))}
                  style={{ marginTop: "0.25rem" }}
                />
              </BaseCol>
              <BaseCol span={12}>
                <Text strong>Bước giá tối thiểu (VND) *</Text>
                <BaseInput
                  type="number"
                  value={buocGia || ""}
                  onChange={(e) => setBuocGia(Number(e.target.value))}
                  style={{ marginTop: "0.25rem" }}
                />
              </BaseCol>
              <BaseCol span={24}>
                <Text strong>Tiền đặt cọc trước (VND)</Text>
                <BaseInput
                  type="number"
                  value={datCoc || ""}
                  onChange={(e) => setDatCoc(Number(e.target.value))}
                  style={{ marginTop: "0.25rem" }}
                />
              </BaseCol>
            </BaseRow>
          </BaseCard>
        )}

        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
        >
          <BaseButton onClick={() => router.push(`/${locale}/host/sessions`)}>
            Hủy bỏ
          </BaseButton>
          <BaseButton type="primary" loading={isSaving} onClick={handleSave}>
            Tạo phiên mới
          </BaseButton>
        </div>
      </div>
    </div>
  );
}

export function HostEditSessionFeature({ id }: { id: string }) {
  const router = useRouter();
  const { message } = useFeedback();

  useEffect(() => {
    message.warning(
      "Hiện tại phiên đã công bố hoặc đang hoạt động không được phép chỉnh sửa trực tiếp."
    );
    router.back();
  }, [id, router, message]);

  return null;
}
