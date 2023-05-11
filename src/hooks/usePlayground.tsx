// create a custom hook to handle the playground state

import { API_REQUEST_TYPE } from "@/constants/constants";
import {
  getPlaygrounds,
  removeActivePlayground,
} from "@/redux/features/playground/playgroundSlice";
import { useAppDispatch } from "@/redux/hooks";
import { CreateRequestType } from "@/types/types";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { type } from "os";
import { useState } from "react";

export const usePlayground = () => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string>("");
  const [lable, setLabel] = useState<string>("");

  const [playgroundState, setPlaygroundState] = useState({
    isSaved: false,
    isEdited: false,
    isActive: false,
  });

  const [requestId, setRequestId] = useState<number>(-1);
  const [requestType, setRequestType] = useState(API_REQUEST_TYPE.GET);
  const [requestUrl, setrequestUrl] = useState<string>("");
  const [jsonParams, setJsonParams] = useState<string>("");
  const [response, setResponse] = useState<AxiosResponse>();
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [queryParams, setQueryParams] = useState<
    Array<{ key: string; value: string }>
  >([]);

  const [requestHeaders, setRequestHeaders] = useState<
    Array<{ key: string; value: string }>
  >([]);

  const setPlaygroundToDefault = () => {
    setRequestType(API_REQUEST_TYPE.GET);
    setrequestUrl("");
    setJsonParams("");
    setResponse(undefined);
    setQueryParams([]);
    setRequestHeaders([]);
  };

  const setPlaygroundStateFromRemote = (data: any) => {
    console.log("data", data);

    setRequestType(data.requestType);
    setrequestUrl(data.requestUrl);
    setJsonParams(data.jsonParams);
    setResponse(data.response);
    setQueryParams(
      typeof data.queryParams === "string"
        ? JSON.parse(data.queryParams)
        : data.queryParams
    );
    setRequestHeaders(
      typeof data.requestHeaders === "string"
        ? JSON.parse(data.requestHeaders)
        : data.requestHeaders
    );
    setTitle(data.title);
    setRequestId(data.id);
    setLabel(data.label);
  };

  const handleRequestTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRequestType(e.target.value);
  };

  const handleRequestUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setrequestUrl(e.target.value);
  };

  const handleRequestBodyChange = (value: string | undefined) => {
    console.log("value", value);

    setJsonParams(value || "");
  };

  const addQueryParam = () => {
    if (!!!queryParams) {
      setQueryParams([{ key: "", value: "" }]);
      return;
    }

    setQueryParams([...queryParams, { key: "", value: "" }]);
  };

  const removeQueryParam = (index: number) => {
    setQueryParams(queryParams.filter((_, i) => i !== index));
  };

  const onQueryParamChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    name: string
  ) => {
    const { value } = e.target;

    setQueryParams(
      queryParams?.map((param, i) => {
        if (i === index) {
          if (name === "key") {
            return { ...param, key: value };
          }
          return { ...param, value };
        }
        return param;
      })
    );
  };

  const addRequestHeaders = () => {
    setRequestHeaders([...requestHeaders, { key: "", value: "" }]);
  };

  const removeRequestHeaders = (index: number) => {
    setRequestHeaders(requestHeaders.filter((_, i) => i !== index));
  };

  const onRequestHeadersChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    name: string
  ) => {
    const { value } = e.target;

    setRequestHeaders(
      requestHeaders?.map((param, i) => {
        if (i === index) {
          if (name === "key") {
            return { ...param, key: value };
          }

          return { ...param, value };
        }
        return param;
      })
    );
  };

  const sendRequest = async () => {
    let data = {};

    console.log(requestUrl);

    if (!requestUrl.includes("http://") && !requestUrl.includes("https://")) {
      console.log("came here");
      setrequestUrl(`https://${requestUrl}`);
    }

    queryParams?.forEach((param) => {
      data = {
        ...data,
        [param.key]: param.value,
      };
    });

    const settings: AxiosRequestConfig = {
      method: requestType,
      url: `${requestUrl}${
        queryParams?.length > 0
          ? "?" +
            queryParams?.map((param) => `${param.key}=${param.value}`).join("&")
          : ""
      }`,
      data: JSON.parse(jsonParams),
    };

    console.log(settings);

    try {
      const response = await axios.request(settings);
      setResponse(response);
    } catch (error: any) {
      console.log("error", error);

      setResponse(error);
    }
  };

  const saveRequest = async () => {
    setIsSaving(true);
    const payload: CreateRequestType = {
      id: requestId,
      label: title.split(" ").join("-").toLowerCase(),
      title: title,
      headerParams: JSON.stringify(requestHeaders),
      queryParams: JSON.stringify(queryParams),
      jsonParams: jsonParams,
      requestMethod: requestType,
      requestUrl: requestUrl,
    };

    const { data } = await axios.post("/api/request", payload);

    if (data.status) {
      setPlaygroundState({
        isSaved: true,
        isEdited: false,
        isActive: false,
      });

      setPlaygroundStateFromRemote(data.data);

      console.log(data);
    }

    setIsSaving(false);
  };

  const deleteRequest = async () => {
    const { data } = await axios.delete(`/api/request?id=${requestId}`);

    if (data.status) {
      setPlaygroundState({
        isSaved: false,
        isEdited: false,
        isActive: false,
      });
      dispatch(removeActivePlayground(requestId));
      dispatch(getPlaygrounds());
      document.getElementById("deleteModal")?.click();

      setPlaygroundToDefault();
    }

    setIsSaving(false);
  };

  return {
    requestType,
    requestUrl,
    jsonParams,
    queryParams,
    requestHeaders,
    response,
    playgroundState,
    setPlaygroundToDefault,
    setPlaygroundStateFromRemote,
    handleRequestTypeChange,
    handleRequestUrlChange,
    handleRequestBodyChange,
    addQueryParam,
    removeQueryParam,
    onQueryParamChange,
    addRequestHeaders,
    removeRequestHeaders,
    onRequestHeadersChange,
    sendRequest,
    saveRequest,
    title,
    setTitle,
    isSaving,
    lable,
    setLabel,
    deleteRequest,
  };
};
