import { notFound } from "next/navigation";

import { getUserByUsername } from "@/lib/service/user-service";
import { isFollowingUser } from "@/lib/service/follow-service";
import { isBlockedByUser } from "@/lib/service/block-service";
import { StreamPlayer } from "@/components/stream-player";
import { Actions } from "./_components/actions";

interface UserPageProps {
  params: {
    username: string;
  };
};

const UserPage = async ({
  params
}: UserPageProps) => {
  const user = await getUserByUsername(params.username);

  if (!user || !user.stream) {  //
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) {
    notFound();
  }

  return ( 
    <div>
    <StreamPlayer
      user={user}
      stream={user.stream}
      isFollowing={isFollowing}
    />
    {/* <Actions isFollowing={isFollowing} userId={user.id}/>
    User: {user.username}
    <p>UserId: {user.id}</p>
    <p>following: {`${isFollowing}`}</p> */}
    </div>
  );
}
 
export default UserPage;