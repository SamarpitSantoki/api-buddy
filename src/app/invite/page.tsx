'use client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TypographyP } from '@/components/ui/typography';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';

function Page() {
  const query = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const teamId = query.get('teamId');
  const email = query.get('email');

  if (!teamId || !email) return <div>Invalid invite link</div>;

  const acceptInvite = async () => {
    try {
      const res = await axios.get(
        `/api/invite?teamId=${teamId}&email=${email}`
      );

      if (res.data.status) {
        router.push('/workspaces');
      }
    } catch (err) {
      toast({
        title: 'Some error occured',
        description: 'Some error occured while accepting invite',
        duration: 5000,
        variant: 'destructive',
      });
    }
  };

  const declineInvite = () => {};

  return (
    <>
      <div>
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Team Invite</CardTitle>
          </CardHeader>
          <CardContent>
            <TypographyP>
              You have been invited to join the team {teamId} by {email}
            </TypographyP>
          </CardContent>
          <CardFooter>
            <button className="btn btn-primary" onClick={acceptInvite}>
              Accept
            </button>
            <button className="btn btn-secondary" onClick={declineInvite}>
              Decline
            </button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default Page;
