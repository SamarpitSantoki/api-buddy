"use client";
import axios from "axios";
import { useState } from "react";

interface IRequest {
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
}

const usePlayground = () => {
  const [title, setTitle] = useState("Request");
  const [playgroundState, setPlaygroundSate] = useState({
    isSaved: false,
    isEdited: false,
    isSaving: false,
  });
  const [request, setRequest] = useState<IRequest>({
    id: "",
    url: "",
    method: "",
    headers: [],
    params: [],
    body: "",
  });
  const [response, setResponse] = useState<any>();

  const updateUrl = (url: string) => {
    setRequest((prev) => ({ ...prev, url }));
  };

  const updateMethod = (method: string) => {
    setRequest((prev) => ({ ...prev, method }));
  };

  const addHeader = () => {
    setRequest((prev) => ({
      ...prev,
      headers: [...prev.headers, { key: "", value: "" }],
    }));
  };

  const updateHeader = (index: number, key: string, value: string) => {
    setRequest((prev) => {
      const headers = [...prev.headers];
      headers[index] = { key, value };
      return { ...prev, headers };
    });
  };

  const removeHeader = (index: number) => {
    setRequest((prev) => {
      const headers = [...prev.headers];
      headers.splice(index, 1);
      return { ...prev, headers };
    });
  };

  const addParam = () => {
    setRequest((prev) => ({
      ...prev,
      params: [...prev.params, { key: "", value: "" }],
    }));
  };

  const updateParam = (index: number, key: string, value: string) => {
    setRequest((prev) => {
      const params = [...prev.params];
      params[index] = { key, value };
      return { ...prev, params };
    });
  };

  const removeParam = (index: number) => {
    setRequest((prev) => {
      const params = [...prev.params];
      params.splice(index, 1);
      return { ...prev, params };
    });
  };

  const updateBody = (body: string) => {
    setRequest((prev) => ({ ...prev, body }));
  };

  const makeRequest = async () => {
    //  validate url
    const url = formatUrl(request.url);
    setRequest((prev) => ({ ...prev, url }));

    try {
      const response = await axios.request({
        url,
        method: request.method,
        headers: request.headers.reduce((acc: any, curr) => {
          if (curr.key) {
            acc[curr.key] = curr.value;
          }
          return acc;
        }, {}),
        params: request.params.reduce((acc: any, curr) => {
          if (curr.key) {
            acc[curr.key] = curr.value;
          }
          return acc;
        }, {}),
        data: request.body,
      });
      setResponse(response);
    } catch (error: any) {
      console.log(error.request);

      if(error.request.status === 0){
        setResponse({data: "Network Error"})
      }else{
        setResponse({data: error.request.statusText})
      }

    }
  };

  //  validate request to make sure it has http or https
  const formatUrl = (url: string) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }
    return url;
  };

  return {
    title,
    request,
    response,
    playgroundState,
    updateUrl,
    updateMethod,
    updateBody,
    updateHeader,
    updateParam,
    addHeader,
    addParam,
    removeHeader,
    removeParam,
    makeRequest,
  };
};

export default usePlayground;
