import { Prisma } from "@prisma/client";
export type CreateRequestType = Prisma.RequestCreateArgs["data"];

export type TGetRequestResponse = Prisma.RequestGetPayload<{
  select: {
    id: true;
    headerParams: true;
    jsonParams: true;
    label: true;
    queryParams: true;
    requestMethod: true;
    requestUrl: true;
    responseSize: true;
    responseStatus: true;
    responseTime: true;
    title: true;
  };
}>;

export interface IPlayground {
  id: number;
  title: string | null;
  label: string | null;
  headerParams: string | null;
  queryParams: string | null;
  jsonParams: string | null;
  requestUrl: string;
  requestMethod: string;
  responseSize: number | null;
  responseStatus: string | null;
  responseTime: number | null;
}