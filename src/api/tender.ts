import { ResponseData } from "@/interfaces/common";
import {
  CreateTenderDTO,
  SubmitProposalDTO,
  TenderRankingResponse,
  TenderSession,
  TenderSubmission,
} from "@/interfaces/tender";
import { request } from "@/services/axios";

export const getTenders = (params?: any) =>
  request.get<any, ResponseData<TenderSession[]>>("/tender-sessions", params);

export const getTenderDetail = (id: string) =>
  request.get<undefined, ResponseData<TenderSession>>(`/tender-sessions/${id}`);

export const createTender = (data: CreateTenderDTO) =>
  request.post<
    CreateTenderDTO,
    ResponseData<{ _id: string; trangThai: string }>
  >("/tender-sessions", data);

export const publishTender = (id: string) =>
  request.post<undefined, ResponseData<any>>(`/tender-sessions/${id}/publish`);

export const submitProposal = (id: string, data: SubmitProposalDTO) =>
  request.post<SubmitProposalDTO, ResponseData<TenderSubmission>>(
    `/tender-sessions/${id}/submissions`,
    data
  );

export const getTenderRanking = (id: string) =>
  request.get<undefined, ResponseData<TenderRankingResponse>>(
    `/tender-sessions/${id}/ranking`
  );

export const closeTender = (id: string) =>
  request.post<undefined, ResponseData<any>>(`/tender-sessions/${id}/close`);
