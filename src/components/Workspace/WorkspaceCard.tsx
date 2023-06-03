import { Badge } from "@/components/ui/badge";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { FileInput } from "lucide-react";
import React from "react";

interface ProjectCardProps {
  name: string;
  type: string;
  requestsCount: number;
  editedAt: string;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  type,
  requestsCount,
  editedAt,
  onClick,
}) => {
  return (
    <Card
      className="group w-72 bg-card rounded-xl hover:shadow-lg transition duration-300 ease-in-out cursor-pointer select-none h-min"
      onClick={onClick}
    >
      <CardHeader className="flex flex-col items-end px-4 py-5">
        <h1 className="text-xl font-medium text-right">{name}</h1>
        <Badge
          className="bg-primary text-white text-xs w-min font-thin"
          title="Not Shared"
        >
          {type}
        </Badge>
      </CardHeader>

      <CardFooter className=" justify-between items-center text-sm py-5">
        <div>
          <p>Requests: {requestsCount}</p>
          <p>EditedAt: {editedAt}</p>
        </div>
        <div className="flex justify-center items-center rounded-full bg-primary text-white w-10 h-8">
          <FileInput size={16} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
