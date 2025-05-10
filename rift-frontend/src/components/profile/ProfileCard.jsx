// src/components/profile/ProfileCard.jsx
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Button from "../common/Button";

function ProfileCard({ user, onFollowToggle }) {
  const { user: currentUser } = useContext(AuthContext);
  const isFollowing = currentUser?.following?.includes(user.id);

  return (
    <div className="bg-zinc-200 backdrop-blur-3xl p-6 rounded-lg shadow-md">
      <img
        src={user.avatar || "src/assets/images/placeholder.jpg"}
        alt={user.username}
        className="w-24 h-24 rounded-full mx-auto"
      />
      <h2 className="font-heading text-2xl text-center mt-4">{user.username}</h2>
      <p className="text-primary-gray-dark text-center">{user.bio}</p>
      <p className="text-center mt-2">
        {user.followers?.length || 0} Followers | {user.following?.length || 0} Following
      </p>
      {currentUser?.id !== user.id && (
        <Button
          onClick={() => onFollowToggle(user.id)}
          className={`${ isFollowing ? "bg-white text-black outline-solid" : 
            "bg-yellow-500 text-white hover:bg-white hover:text-black hover:outline-solid" }
            transition-colors
            mt-4 mx-auto block`}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}
    </div>
  );
}

export default ProfileCard;