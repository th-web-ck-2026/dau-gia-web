import { ResponseData } from "@/interfaces";
import { HeroBanner } from "@/interfaces/demo";
import { request } from "@/services/axios";

export const getDemoData = () =>
  request.get<undefined, ResponseData<HeroBanner>>("/hero-banner");
