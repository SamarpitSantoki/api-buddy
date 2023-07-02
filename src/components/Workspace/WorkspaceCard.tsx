import { Badge } from '@/components/ui/badge';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Delete, FileInput, Trash } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';

interface ProjectCardProps {
  id: string;
  name: string;
  type: string;
  requestsCount: number;
  editedAt: string;
  onClick?: () => void;
  handleDeleteWorkspace?: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  name,
  type,
  requestsCount,
  editedAt,
  onClick,
  handleDeleteWorkspace,
}) => {
  return (
    <Link href={`/workspaces/${id}`}>
      <Card
        className="transition duration-300 ease-in-out cursor-pointer select-none group w-72 bg-card rounded-xl hover:shadow-lg h-min"
        onClick={onClick}
      >
        <CardHeader className="flex flex-row items-center justify-between px-4 py-5">
          <div
            className="z-10 p-2 rounded-full hover:text-destructive"
            onClick={(e) => {
              e.preventDefault();
              if (handleDeleteWorkspace) handleDeleteWorkspace(id);
            }}
          >
            <Trash size={24} />
          </div>
          <div>
            <h1 className="text-xl font-medium text-right">{name}</h1>
            <Badge
              className="text-xs font-thin text-white bg-primary w-min"
              title="Not Shared"
            >
              {type}
            </Badge>
          </div>
        </CardHeader>

        <CardFooter className="items-center justify-between py-5 text-sm ">
          <div>
            <p>Requests: {requestsCount}</p>
            <p>EditedAt: {moment(editedAt).format('ll')}</p>
          </div>
          <div className="flex items-center justify-center w-10 h-8 text-white rounded-full bg-primary">
            <FileInput size={16} />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProjectCard;
