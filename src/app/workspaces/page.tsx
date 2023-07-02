'use client';

import ProjectCard from '../../components/Workspace/WorkspaceCard';
import { FolderPlus, Loader2, PlusSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreateDialog from '@/components/Workspace/CreateDialog';
import { TypographyMuted } from '@/components/ui/typography';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import {
  createWorkspace,
  deleteWorkspace,
  getWorkspaces,
} from '@/store/workspaceSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useAuth } from '@clerk/nextjs';
import { Mixpanel } from '@/lib/mixpanel';
import CommandMenu from '@/components/CommandMenu';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';

const commands = [
  {
    id: 'create-workspace',
    label: 'Create Workspace',
    icon: <PlusSquare />,
  },
];

type Inputs = {
  name: string;
  invites: { email: string }[];
};

const Workspaces = () => {
  const { userId } = useAuth();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      invites: [{ email: '' }],
    },
  });

  const {
    fields: inviteFields,
    append: inviteAppend,
    remove: inviteRemove,
  } = useFieldArray({
    control: control,
    name: 'invites',
  });

  const dispatch = useAppDispatch();
  const { workspaces, isCreating, isFetching } = useSelector(
    (state: RootState) => state.workspace
  );

  const handleCreateWorkspaceSubmit: SubmitHandler<Inputs> = (data) => {
    if (!userId) return alert('User not found');

    dispatch(createWorkspace({ ...data, userId }));
    document.getElementById('create-new-workspace')?.click();
    toast({
      title: 'Workspace created',
      description: 'Workspace created successfully',
      duration: 5000,
      variant: 'default',
    });
  };

  //   fetch workspaces on mount
  useEffect(() => {
    Mixpanel.track('workspace_visited');

    dispatch(getWorkspaces());
  }, []);

  const handleCommand = (command: string) => {
    switch (command) {
      case 'create-workspace':
        document.getElementById('create-new-workspace')?.click();
        break;
      default:
        break;
    }
  };

  const handleDeleteWorkspace = (id: string) => {
    dispatch(deleteWorkspace(id));
    toast({
      title: 'Workspace deleted',
      description: 'Workspace deleted successfully',
      duration: 5000,
      variant: 'destructive',
    });
  };

  return (
    <div className="flex flex-col items-center w-screen min-h-full bg-accent">
      <div className="flex flex-col items-center justify-center w-3/5 h-1/5">
        <h1 className="text-4xl font-bold text-center">Workspaces</h1>
        <p className="text-lg font-thin text-center">
          Create a new workspace or select one to start working
        </p>
      </div>

      <div className="flex flex-wrap justify-center w-4/5 gap-8 p-8 rounded-lg 2xl:w-3/5 bg-card">
        {isFetching ? (
          <div className="flex flex-col items-center justify-center gap-4 animate-spin">
            <Loader2 size={48} />
          </div>
        ) : (
          <>
            {workspaces.map((workspace, i) => (
              <ProjectCard
                key={i}
                name={workspace.name}
                type={workspace.type}
                id={workspace.id}
                requestsCount={workspace.requests?.length || 0}
                editedAt={workspace.updatedAt}
                handleDeleteWorkspace={handleDeleteWorkspace}
              />
            ))}
            <CreateDialog
              header="Create a new workspace"
              triggerElement={
                <Button
                  className="flex flex-col items-center justify-center h-full gap-4 text-white w-72 bg-primary rounded-xl"
                  id="create-new-workspace"
                >
                  <FolderPlus size={48} />
                  <p className="text-lg font-medium">Create a new workspace</p>
                </Button>
              }
              contentElement={
                <form
                  className="flex flex-col"
                  onSubmit={handleSubmit(handleCreateWorkspaceSubmit)}
                >
                  <label className="text-sm">Name</label>
                  <input
                    className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                    type="text"
                    placeholder="Workspace Name"
                    {...register('name', {
                      required: true,
                    })}
                  />
                  {errors.name && (
                    <span className="text-red-500">Name is required</span>
                  )}

                  {/* share with option */}

                  {/* coming soon  */}
                  <div className="flex flex-col gap-2">
                    {/* show coming soon text */}

                    <label className="text-sm text-muted-foreground">
                      <TypographyMuted>Coming Soon</TypographyMuted>
                      Share with ( upto 3 members)
                    </label>
                    {inviteFields.map((field, index) => (
                      <div className="flex flex-row gap-2" key={field.id}>
                        <input
                          className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                          type="email"
                          placeholder="Email"
                          {...register(`invites.${index}.email`)}
                        />
                        <button
                          className="flex items-center justify-center w-8 h-8 text-white rounded-full bg-primary"
                          onClick={() => inviteRemove(index)}
                        >
                          -
                        </button>

                        {index === inviteFields.length - 1 && (
                          <button
                            className="flex items-center justify-center w-8 h-8 text-white rounded-full bg-primary"
                            onClick={() => inviteAppend({ email: '' })}
                          >
                            +
                          </button>
                        )}

                        {/* <input
                          className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                          type="text"
                          placeholder="Role"
                          {...register(`invites.${index}.role` as const)}
                        /> */}
                      </div>
                    ))}
                  </div>

                  <Button className="w-full" type="submit">
                    Create
                    {isCreating ? (
                      <div className="w-5 h-5 border-2 border-white rounded-full animate-spin"></div>
                    ) : null}
                  </Button>
                </form>
              }
            />
          </>
        )}
      </div>

      <CommandMenu commands={commands} handleCommand={handleCommand} />
    </div>
  );
};

export default Workspaces;
