import { Prisma } from "@prisma/client";

export interface IRequest {
  workspaceId: number;
  id: number;
  url: string;
  method: string;
  headers: {
    key: string;
    value: string;
  }[];
  params: {
    key: string;
    value: string;
  }[];
  body: string;

}

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

export type TCreateRequestType = Prisma.RequestCreateArgs["data"];
