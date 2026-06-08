import { TransactionQueryParams, getTransactionsMe } from "@/api/transactions";
import { useAppQuery } from "@/hooks/common";
import { ResponseData } from "@/interfaces/common";
import { PageableResponse } from "@/interfaces/sessions";
import { GiaoDich } from "@/interfaces/transaction";

export const useGetTransactionsMe = (params: TransactionQueryParams) => {
  return useAppQuery<ResponseData<PageableResponse<GiaoDich>>>({
    queryKey: ["transactionsMe", params],
    queryFn: () => getTransactionsMe(params),
  });
};
