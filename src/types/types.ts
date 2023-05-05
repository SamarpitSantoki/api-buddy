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
