import { TransactionQueryParams, getTransactionsMe } from "@/api/transactions";
import { useAppQuery } from "@/hooks/common";
import { PageableResponse } from "@/interfaces/sessions";
import { GiaoDich } from "@/interfaces/transaction";

export const useGetTransactionsMe = (params: TransactionQueryParams) => {
  return useAppQuery<PageableResponse<GiaoDich>>({
    queryKey: ["transactionsMe", params],
    queryFn: () => getTransactionsMe(params),
  });
};
