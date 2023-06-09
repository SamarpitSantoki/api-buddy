'use client';
import { Mixpanel } from '@/lib/mixpanel';
import { useAppDispatch } from '@/store/hooks';
import { getPlaygrounds } from '@/store/playgroundSlice';
import { IPlayground } from '@/types/playgroundTypes';
import {
  IRequest,
  TCreateRequestType,
  TGetRequestResponse,
} from '@/types/types';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const usePlayground = (workspaceId: string) => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const [id, setId] = useState<string>('-1');
  const [title, setTitle] = useState('Request');
  const [playgroundState, setPlaygroundSate] = useState({
    isSaved: false,
    isEdited: false,
    isSaving: false,
    isSending: false,
  });

  const [request, setRequest] = useState<IRequest>({
    id: '-1',
    url: '',
    method: '',
    headers: [],
    params: [],
    body: '',
    workspaceId: workspaceId,
    hasExamples: false,
  });
  const [response, setResponse] = useState<any>();

  const updateTitle = (title: string) => {
    setTitle(title);
  };

  const updateUrl = (url: string) => {
    setRequest((prev) => ({ ...prev, url }));
  };

  const updateMethod = (method: string) => {
    setRequest((prev) => ({ ...prev, method }));
  };

  const addHeader = () => {
    setRequest((prev) => ({
      ...prev,
      headers: prev.headers
        ? [...prev.headers, { key: '', value: '' }]
        : [{ key: '', value: '' }],
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
      params: prev.params
        ? [...prev.params, { key: '', value: '' }]
        : [{ key: '', value: '' }],
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
    setPlaygroundSate((prev) => ({ ...prev, isSending: true }));

    //  validate url
    const url = formatUrl(request.url);
    setRequest((prev) => ({ ...prev, url }));

    try {
      let whereToRequest = 'server';

      let payload = {
        url,
        method: request.method,
        headers: request?.headers?.reduce?.((acc: any, curr) => {
          if (curr.key) {
            acc[curr.key] = curr.value;
          }
          return acc;
        }, {}),
        params: request?.params?.reduce?.((acc: any, curr) => {
          if (curr.key) {
            acc[curr.key] = curr.value;
          }
          return acc;
        }, {}),
        data: request.body,
      };

      if (url.includes('localhost')) {
        whereToRequest = 'local';
      }

      const { data } = await axios.request(
        whereToRequest === 'server'
          ? {
              url: '/api/proxy',
              method: 'post',
              data: payload,
            }
          : (payload as InternalAxiosRequestConfig<any>)
      );

      setResponse(data.data);
    } catch (error: any) {
      if (error.response) setResponse(error.response);
      else if (error.request) {
        if (error.request.status === 0) {
          setResponse({ data: 'Network Error' });
        } else {
          setResponse({ data: error.request.response });
        }
      } else setResponse({ data: `Request Field ${error.message}` });
    }
    setPlaygroundSate((prev) => ({ ...prev, isSending: false }));
  };

  //  validate request to make sure it has http or https
  const formatUrl = (url: string) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  };

  const setPlaygroundStateFromRemote = (data: IPlayground) => {
    setId(data.request.id);
    setTitle(data.title);
    setRequest(data.request);
    if (data.response) setResponse(data.response);
    setPlaygroundSate(data.playgroundState);
  };

  const saveRequest = async () => {
    setPlaygroundSate((prev) => ({ ...prev, isSaving: true }));

    const payload: TCreateRequestType = {
      id: id,
      title,
      requestUrl: request.url,
      requestMethod: request.method,
      headerParams: JSON.stringify(request.headers),
      queryParams: JSON.stringify(request.params),
      jsonParams: request.body,
      workspaceId,
    };

    try {
      const { data } = await axios.post('/api/request', payload);

      if (data.status) {
        if (!!!request.id) {
          Mixpanel.track('request_created');
        }

        setPlaygroundSate((prev) => ({ ...prev, isSaved: true }));

        const remoteData: TGetRequestResponse = data.data;

        const formatedData: IPlayground = {
          id: remoteData.id,
          title: remoteData.title!,
          request: {
            id: remoteData.id,
            url: remoteData.requestUrl!,
            method: remoteData.requestMethod!,
            headers: remoteData.headerParams
              ? JSON.parse(remoteData.headerParams)
              : [],
            params: remoteData.queryParams
              ? JSON.parse(remoteData.queryParams)
              : [],
            body: remoteData.jsonParams!,
            hasExamples: false,
            workspaceId,
          },
          response: null,
          playgroundState: {
            isSaved: true,
            isEdited: false,
            isSaving: false,
            isSending: false,
          },
        };

        setPlaygroundStateFromRemote(formatedData as any);
      }

      setPlaygroundSate((prev) => ({ ...prev, isSaving: false }));

      dispatch(getPlaygrounds(workspaceId));
    } catch (error: any) {
      if (error.response.status === 401) {
        router.push('/sign-in?redirectUrl=' + window.location.pathname);
      }
    }
  };

  return {
    id,
    title,
    request,
    response,
    playgroundState,
    updateTitle,
    saveRequest,
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
    setPlaygroundStateFromRemote,
  };
};

export default usePlayground;

// function updateEndTime(response: AxiosResponse) {
//   if (response) response.headers.startTime = response?.headers?.startTime || {};
//   response.headers.time =
//     new Date().getTime() - response?.config?.headers?.startTime;
//   return response;
// }
