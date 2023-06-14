"use client";

import ProjectCard from "../../components/Workspace/WorkspaceCard";
import { FolderPlus, Loader2, PlusSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateDialog from "@/components/Workspace/CreateDialog";
import { TypographyMuted } from "@/components/ui/typography";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { createWorkspace, getWorkspaces } from "@/redux/workspaceSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Mixpanel } from "@/lib/mixpanel";
import CommandMenu from "@/components/CommandMenu";

const commands = [
  {
    id: "create-workspace",
    label: "Create Workspace",
    icon: <PlusSquare />,
  },
];

const Workspaces = () => {
  const { userId } = useAuth();

  const dispatch = useAppDispatch();
  const { workspaces, isCreating, isFetching } = useSelector(
    (state: RootState) => state.workspace
  );

  const [createWorkspacePayload, setCreateWorkspacePayload] = useState({
    name: "",
  });

  const handleCreateWorkspaceSubmit = () => {
    if (createWorkspacePayload.name === "")
      return alert("Workspace name cannot be empty");

    if (!userId) return alert("User not found");

    console.log("Create Workspace");
    dispatch(createWorkspace({ ...createWorkspacePayload, userId }));
    document.getElementById("create-new-workspace")?.click();

  };

  //   fetch workspaces on mount
  useEffect(() => {
    Mixpanel.track("workspace_visited");

    dispatch(getWorkspaces());
  }, []);

  const handleCommand = (command: string) => {
    console.log("command", command);

    switch (command) {
      case "create-workspace":
        document.getElementById("create-new-workspace")?.click();
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-screen min-h-full bg-accent flex flex-col items-center">
      <div className="flex flex-col items-center w-3/5 h-1/5 justify-center">
        <h1 className="text-4xl font-bold text-center">Workspaces</h1>
        <p className="text-center text-lg font-thin">
          Create a new workspace or select one to start working
        </p>
      </div>

      <div className="flex justify-center flex-wrap w-4/5 2xl:w-3/5  bg-card rounded-lg p-8 gap-8">
        {isFetching ? (
          <div className="flex flex-col items-center justify-center gap-4 animate-spin">
            <Loader2 size={48} />
          </div>
        ) : (
          <>
            {workspaces.map((workspace, i) => (
              <Link href={`/workspaces/${workspace.id}`} key={i}>
                <ProjectCard
                  key={i}
                  name={workspace.name}
                  type={workspace.type}
                  requestsCount={workspace.requests?.length || 0}
                  editedAt={workspace.updatedAt}
                />
              </Link>
            ))}
            <CreateDialog
              header="Create a new workspace"
              triggerElement={
                <Button
                  className="w-72 h-full bg-primary text-white rounded-xl flex flex-col gap-4  justify-center items-center"
                  id="create-new-workspace"
                >
                  <FolderPlus size={48} />
                  <p className="text-lg font-medium">Create a new workspace</p>
                </Button>
              }
              contentElement={
                <div className="flex flex-col">
                  <label className="text-sm">Name</label>
                  <input
                    className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                    type="text"
                    value={createWorkspacePayload.name}
                    onChange={(e) =>
                      setCreateWorkspacePayload({
                        ...createWorkspacePayload,
                        name: e.target.value,
                      })
                    }
                  />
                  {/* share with option */}

                  {/* coming soon  */}
                  <div className="flex flex-col gap-2">
                    {/* show coming soon text */}

                    <label className="text-muted-foreground text-sm">
                      <TypographyMuted>Coming Soon</TypographyMuted>
                      Share with ( upto 3 members)
                    </label>
                    <input
                      disabled
                      className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                      type="text"
                    />
                    <input
                      disabled
                      className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                      type="text"
                    />
                    <input
                      disabled
                      className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                      type="text"
                    />
                  </div>

                  <Button
                    className="w-full"
                    onClick={handleCreateWorkspaceSubmit}
                  >
                    Create
                    {isCreating ? (
                      <div className="w-5 h-5 border-2 border-white rounded-full animate-spin"></div>
                    ) : null}
                  </Button>
                </div>
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
