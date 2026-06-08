import { useTranslations } from "next-intl";

import { useQueryClient } from "@tanstack/react-query";

import {
  getAuctionSessionDetail,
  getTenderSessionDetail,
} from "@/api/sessions";
import * as api from "@/api/transactions";
import { LoaiPhien } from "@/constants";
import { useAppMutation, useAppQuery, useFeedback } from "@/hooks/common";
import { ResponseData } from "@/interfaces/common";
import { AuctionSession, TenderSession } from "@/interfaces/sessions";

export const useGetTransactionDetail = (id: string) => {
  return useAppQuery({
    queryKey: ["transactionDetail", id],
    queryFn: () => api.getTransactionDetail(id),
    enabled: !!id,
  });
};

export const useGetSessionDetail = (
  phienId?: string,
  loaiPhien?: LoaiPhien
) => {
  return useAppQuery<ResponseData<AuctionSession | TenderSession>>({
    queryKey: ["sessionDetail", phienId, loaiPhien],
    queryFn: () => {
      if (loaiPhien === LoaiPhien.DAU_GIA) {
        return getAuctionSessionDetail(phienId!);
      } else {
        return getTenderSessionDetail(phienId!);
      }
    },
    enabled: !!phienId && !!loaiPhien,
  });
};

export const useTransactionMutations = (id: string) => {
  const queryClient = useQueryClient();
  const { message } = useFeedback();
  const t = useTranslations("myTransactions");

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["transactionDetail", id] });
  };

  const confirm = useAppMutation(() => api.confirmTransaction(id), {
    onSuccess: () => {
      message.success(t("actions.confirmSuccess"));
      invalidate();
    },
  });

  const reject = useAppMutation(() => api.rejectTransaction(id), {
    onSuccess: () => {
      message.success(t("actions.rejectSuccess"));
      invalidate();
    },
  });

  const updateNote = useAppMutation(
    (data: { ghiChu: string }) => api.updateContactNote(id, data),
    {
      onSuccess: () => {
        message.success(t("actions.updateNoteSuccess"));
        invalidate();
      },
    }
  );

  const reportPaid = useAppMutation(
    (data: { anhChungTu: string[] }) => api.reportPaid(id, data),
    {
      onSuccess: () => {
        message.success(t("actions.reportPaidSuccess"));
        invalidate();
      },
    }
  );

  const confirmPayment = useAppMutation(() => api.confirmPaymentReceived(id), {
    onSuccess: () => {
      message.success(t("actions.confirmPaymentSuccess"));
      invalidate();
    },
  });

  const complete = useAppMutation(() => api.completeTransaction(id), {
    onSuccess: () => {
      message.success(t("actions.completeSuccess"));
      invalidate();
    },
  });

  const sign = useAppMutation(() => api.signContract(id), {
    onSuccess: () => {
      message.success(t("actions.signSuccess"));
      invalidate();
    },
  });

  const handover = useAppMutation(() => api.handoverTender(id), {
    onSuccess: () => {
      message.success(t("actions.handoverSuccess"));
      invalidate();
    },
  });

  const confirmReceipt = useAppMutation(() => api.confirmTenderReceipt(id), {
    onSuccess: () => {
      message.success(t("actions.confirmReceiptSuccess"));
      invalidate();
    },
  });

  const cancel = useAppMutation(() => api.cancelTransaction(id), {
    onSuccess: () => {
      message.success(t("actions.cancelSuccess"));
      invalidate();
    },
  });

  return {
    confirm,
    reject,
    updateNote,
    reportPaid,
    confirmPayment,
    complete,
    sign,
    handover,
    confirmReceipt,
    cancel,
  };
};
