import { Prisma } from '@prisma/client';

export interface IRequest {
  workspaceId: string;
  id: string;
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
  hasExamples: boolean;
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
    hasExamples: true;
  };
}>;

export type TCreateRequestType = Prisma.RequestCreateArgs['data'];
