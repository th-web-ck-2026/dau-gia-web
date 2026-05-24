"use client";

import React, { useEffect, useState } from "react";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

import {
  ArrowLeftOutlined,
  ClockCircleOutlined,
  HistoryOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { AnimatePresence, motion } from "framer-motion";

import { getAuctionDetail, getAuctionStatus, placeBid } from "@/api/auction";
import {
  BaseButton,
  BaseCol,
  BaseRow,
  BaseTag,
  BaseTypography,
  InputNumber,
} from "@/components/common";
import { useFeedback } from "@/hooks/common";
import { AuctionSession } from "@/interfaces/auction";
import { TrangThaiPhien } from "@/interfaces/tender";

import {
  calculateTimeLeft,
  formatCurrency,
  formatTimeLeft,
} from "../../list/index.utils";
import * as S from "./AuctionDetail.styles";

const { Text } = BaseTypography;

interface Props {
  session: AuctionSession;
}

export default function AuctionDetail({ session }: Props) {
  const router = useRouter();
  const locale = useLocale();
  const { message, notification } = useFeedback();

  // Dynamic Auction States
  const [currentPrice, setCurrentPrice] = useState(session.giaHienTai);
  const [nextValidBid, setNextValidBid] = useState(
    session.giaHienTai + session.buocGia
  );
  const [bidValue, setBidValue] = useState<number>(
    session.giaHienTai + session.buocGia
  );
  const [status, setStatus] = useState<TrangThaiPhien>(session.trangThai);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverTimeOffset, setServerTimeOffset] = useState(0);

  // Leaderboard & History Simulation/State
  // In real backend, bids can be retrieved from status API or details API.
  // We'll maintain a state for the top bidders and update it via polling.
  const [leaderboard, setLeaderboard] = useState<
    Array<{
      rank: number;
      bidder: string;
      amount: number;
      time: string;
      key: string;
    }>
  >([]);

  // Time Sync / Countdown state
  const [timeLeft, setTimeLeft] = useState(() =>
    calculateTimeLeft(session.thoiGianKetThuc)
  );

  // Sync Timer every second
  useEffect(() => {
    if (status !== TrangThaiPhien.MO) return;

    const timer = setInterval(() => {
      // Adjusted now time with offset: now + offset
      const adjustedNow = Date.now() + serverTimeOffset;
      const targetTime = new Date(session.thoiGianKetThuc).getTime();
      const diff = targetTime - adjustedNow;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, ended: true });
        setStatus(TrangThaiPhien.DONG);
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
          ended: false,
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [session.thoiGianKetThuc, status, serverTimeOffset]);

  // Polling Auction Status every 3 seconds
  useEffect(() => {
    if (status !== TrangThaiPhien.MO) return;

    const pollInterval = setInterval(async () => {
      try {
        const res = await getAuctionStatus(session._id);
        const data = res.data;

        // Calculate time offset if server time is returned
        if (data.thoiGianServer) {
          const clientTime = Date.now();
          const serverTime = new Date(data.thoiGianServer).getTime();
          setServerTimeOffset(serverTime - clientTime);
        }

        setCurrentPrice(data.giaHienTai);
        setNextValidBid(data.giaHopLeKeTiep);
        setStatus(data.trangThai);

        // Dynamically update simulated leaderboard based on current leader
        setLeaderboard((prev) => {
          const leaderBietDanh = data.bietDanhNguoiDanDau || "Chưa có";
          const leaderExist = prev.find(
            (item) => item.bidder === leaderBietDanh
          );

          let newLeaderboard = [...prev];
          if (leaderBietDanh !== "Chưa có") {
            if (leaderExist) {
              // Update leader price
              newLeaderboard = newLeaderboard.map((item) =>
                item.bidder === leaderBietDanh
                  ? {
                      ...item,
                      amount: data.giaHienTai,
                      time: new Date().toLocaleTimeString(),
                    }
                  : item
              );
            } else {
              // Add new leader
              newLeaderboard.push({
                key: leaderBietDanh,
                rank: 1,
                bidder: leaderBietDanh,
                amount: data.giaHienTai,
                time: new Date().toLocaleTimeString(),
              });
            }
          }

          // Sort and assign ranks
          return newLeaderboard
            .sort((a, b) => b.amount - a.amount)
            .map((item, idx) => ({ ...item, rank: idx + 1 }))
            .slice(0, 5); // top 5
        });
      } catch (err) {
        console.error("Lỗi polling status: ", err);
      }
    }, 3000);

    return () => clearInterval(pollInterval);
  }, [session._id, status]);

  // Load initial leaderboard state based on details if available
  useEffect(() => {
    const fetchInitDetail = async () => {
      try {
        const res = await getAuctionDetail(session._id);
        // If the details returned bids, populate the leaderboard
        const details = res.data as any;
        if (details.nguoiDanDauId) {
          setLeaderboard([
            {
              key: "leader",
              rank: 1,
              bidder: details.anDanh ? "Người dùng ẩn danh" : "Nhà đấu giá A",
              amount: details.giaHienTai,
              time: new Date(details.updatedAt).toLocaleTimeString(),
            },
          ]);
        }
      } catch {
        // Fallback to empty
      }
    };
    fetchInitDetail();
  }, [session._id]);

  const handlePlaceBid = async () => {
    if (bidValue < nextValidBid) {
      message.warning(
        `Giá đặt tối thiểu phải là ${formatCurrency(nextValidBid, locale)}`
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await placeBid(session._id, { giaTrao: bidValue });
      if (res.data.thanhCong) {
        message.success("Đặt giá thành công!");
        setCurrentPrice(res.data.giaCaoNhat);
        setNextValidBid(res.data.giaToiThieuKeTiep);
        setBidValue(res.data.giaToiThieuKeTiep);

        // Add yours directly to leaderboard for instant feedback
        setLeaderboard((prev) => {
          const userBid = {
            key: "me",
            rank: 1,
            bidder: "Bạn (Người dùng)",
            amount: res.data.giaCaoNhat,
            time: new Date().toLocaleTimeString(),
          };
          const filtered = prev.filter(
            (item) => item.bidder !== "Bạn (Người dùng)"
          );
          return [userBid, ...filtered]
            .sort((a, b) => b.amount - a.amount)
            .map((item, idx) => ({ ...item, rank: idx + 1 }));
        });
      }
    } catch (err: any) {
      if (err.statusCode === 409) {
        const conflictData = err.data;
        notification.error({
          message: "Giá thầu thay đổi!",
          description: `Đã có người đặt giá cao hơn là ${formatCurrency(conflictData.giaCaoNhat, locale)}. Hệ thống đã tự động cập nhật giá đề xuất tiếp theo.`,
        });
        // Graceful update: fill next valid bid & inputs
        setCurrentPrice(conflictData.giaCaoNhat);
        setNextValidBid(conflictData.giaToiThieuKeTiep);
        setBidValue(conflictData.giaToiThieuKeTiep);
      } else {
        message.error("Có lỗi xảy ra khi đặt giá. Vui lòng thử lại!");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isUrgent = !timeLeft.ended && timeLeft.days === 0 && timeLeft.hours < 2;
  const isClosed = status === TrangThaiPhien.DONG;

  return (
    <S.Container>
      <S.BackButtonRow>
        <BaseButton icon={<ArrowLeftOutlined />} onClick={() => router.back()}>
          Quay lại danh sách
        </BaseButton>
      </S.BackButtonRow>

      <S.GridContainer>
        {/* Left Side: Session details and Bid actions */}
        <S.MainPanel>
          <S.InfoCard>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              }}
            >
              <BaseTag color="blue">Phiên Đấu Giá</BaseTag>
              {isClosed ? (
                <BaseTag color="red">Đã kết thúc</BaseTag>
              ) : (
                <BaseTag color="green">Đang diễn ra</BaseTag>
              )}
            </div>

            <S.Title>{session.tieuDe}</S.Title>
            <S.Description>
              {session.moTa || "Không có mô tả cho phiên đấu giá này."}
            </S.Description>

            {!isClosed && (
              <S.CountdownRow $isUrgent={isUrgent}>
                <ClockCircleOutlined className="clock-icon" />
                <span>Thời gian còn lại: </span>
                <span className="time-text">
                  {formatTimeLeft(timeLeft, (key: string) => {
                    const map: Record<string, string> = {
                      days: "d",
                      hours: "h",
                      minutes: "m",
                      seconds: "s",
                      ended: "Ended",
                    };
                    return map[key] || key;
                  })}
                </span>
              </S.CountdownRow>
            )}

            <S.StatGrid>
              <S.StatBox>
                <span className="label">Giá khởi điểm</span>
                <span className="value">
                  {formatCurrency(session.giaKhoiDiem, locale)}
                </span>
              </S.StatBox>
              <S.StatBox>
                <span className="label">Bước giá tối thiểu</span>
                <span className="value">
                  +{formatCurrency(session.buocGia, locale)}
                </span>
              </S.StatBox>
            </S.StatGrid>

            {isClosed ? (
              <S.ClosedBanner>
                <div className="closed-title">Phiên đấu giá đã khép lại</div>
                <div className="winner-info">
                  Nhà thắng cuộc:{" "}
                  <strong>{leaderboard[0]?.bidder || "Chưa xác định"}</strong>
                  <br />
                  Mức giá chung cuộc:{" "}
                  <strong>{formatCurrency(currentPrice, locale)}</strong>
                </div>
                <BaseRow justify="center" gutter={16}>
                  <BaseCol>
                    <BaseButton type="primary" icon={<HistoryOutlined />}>
                      Xem lịch sử hợp đồng
                    </BaseButton>
                  </BaseCol>
                  <BaseCol>
                    <BaseButton
                      ghost
                      style={{ color: "#ffffff", borderColor: "#ffffff" }}
                    >
                      Tải Biên Bản (PDF)
                    </BaseButton>
                  </BaseCol>
                </BaseRow>
              </S.ClosedBanner>
            ) : (
              <S.BiddingCard>
                <div style={{ marginBottom: "1rem" }}>
                  <Text
                    type="secondary"
                    style={{ display: "block", marginBottom: "0.25rem" }}
                  >
                    Giá cao nhất hiện tại
                  </Text>
                  <span
                    style={{
                      fontSize: "2rem",
                      fontWeight: 800,
                      color: "#2563eb",
                    }}
                  >
                    {formatCurrency(currentPrice, locale)}
                  </span>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <Text type="secondary" style={{ marginRight: "0.5rem" }}>
                    Mức giá hợp lệ tiếp theo:
                  </Text>
                  <S.NextValidTag onClick={() => setBidValue(nextValidBid)}>
                    {formatCurrency(nextValidBid, locale)}
                  </S.NextValidTag>
                </div>

                <S.BidInputGroup>
                  <InputNumber
                    style={{ flex: 1, height: "42px", fontSize: "1.125rem" }}
                    min={nextValidBid}
                    value={bidValue}
                    onChange={(val) =>
                      setBidValue(val ? Number(val) : nextValidBid)
                    }
                    addonAfter={locale === "vi" ? "VND" : "USD"}
                  />
                  <BaseButton
                    type="primary"
                    size="large"
                    loading={isSubmitting}
                    onClick={handlePlaceBid}
                    style={{
                      height: "42px",
                      paddingLeft: "2rem",
                      paddingRight: "2rem",
                    }}
                  >
                    Đặt giá
                  </BaseButton>
                </S.BidInputGroup>
              </S.BiddingCard>
            )}
          </S.InfoCard>
        </S.MainPanel>

        {/* Right Side: Leaderboard */}
        <S.SidePanel>
          <S.TableContainer>
            <div className="table-title">
              <span>
                <TrophyOutlined
                  style={{ color: "#eab308", marginRight: "0.5rem" }}
                />
                Bảng xếp hạng (Leaderboard)
              </span>
              <BaseTag color="blue">Cập nhật 3s/lần</BaseTag>
            </div>

            {leaderboard.length === 0 ? (
              <div
                style={{
                  padding: "2rem",
                  textAlign: "center",
                  color: "#6b7280",
                }}
              >
                Chưa có lượt đấu giá nào. Hãy là người đầu tiên đặt giá!
              </div>
            ) : (
              <S.AnimatedTable>
                <thead>
                  <tr>
                    <th style={{ width: "60px" }}>Hạng</th>
                    <th>Người tham gia</th>
                    <th style={{ textAlign: "right" }}>Giá đặt</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence initial={false}>
                    {leaderboard.map((item) => {
                      const isMe = item.bidder.includes("Bạn");
                      const isLeader = item.rank === 1;

                      return (
                        <motion.tr
                          key={item.key}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                          className={`${isMe ? "you-row" : ""} ${isLeader ? "leader-row" : ""}`}
                        >
                          <td>
                            {isLeader ? (
                              <TrophyOutlined style={{ color: "#eab308" }} />
                            ) : (
                              item.rank
                            )}
                          </td>
                          <td style={{ fontWeight: isMe ? 700 : 500 }}>
                            {item.bidder}
                            {isMe && (
                              <span
                                style={{
                                  fontSize: "0.75rem",
                                  color: "#6b7280",
                                  fontWeight: 400,
                                }}
                              >
                                {" "}
                                (Bạn)
                              </span>
                            )}
                          </td>
                          <td
                            style={{
                              textAlign: "right",
                              fontWeight: 700,
                              color: isLeader ? "#10b981" : "#1f2937",
                            }}
                          >
                            {formatCurrency(item.amount, locale)}
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </S.AnimatedTable>
            )}
          </S.TableContainer>
        </S.SidePanel>
      </S.GridContainer>
    </S.Container>
  );
}
