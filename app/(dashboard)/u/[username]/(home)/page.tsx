import { currentUser } from "@clerk/nextjs";

import { getUserByUsername } from "@/lib/service/user-service";
import { StreamPlayer } from "@/components/stream-player";

interface CreatorPageProps {
  params: {
    username: string;
  };
};

const CreatorPage = async ({
  params,
}: CreatorPageProps) => {
  const externalUser = await currentUser();
  const user = await getUserByUsername(params.username);

  if (!user || user.externalUserId !== externalUser?.id || !user.stream ) { //
    throw new Error("Unauthorized");
  }

  return (
    <div className="h-full">
    <StreamPlayer
        user={user}
        stream={user.stream}
        isFollowing
      />
      <p className="text-white">Stream</p>
    </div>
  );
}
 
export default CreatorPage;