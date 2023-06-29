import { IRequest } from './types';
export interface IPlayground {
  id: string;
  title: string;
  playgroundState: {
    isSaved: boolean;
    isEdited: boolean;
    isSaving: boolean;
    isSending: boolean;
  };
  request: IRequest;
  response: Response | null;
}
