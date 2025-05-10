// src/pages/Profile.jsx
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { LikeContext } from "../context/LikeContext";
import ProfileCard from "../components/profile/ProfileCard";
import ProfileListings from "../components/profile/ProfileListings";
import BackButton from "../components/common/BackButton";
import { mockUsers } from "../data/users";

function Profile() {
  const { userId } = useParams();
  const { user, toggleFollow } = useContext(AuthContext);
  const { products } = useContext(LikeContext);
  const foundUser = mockUsers.find(
        (u) => u.id === userId
  );
  const profileUser = foundUser;
  const userProducts = products.filter((p) => p.sellerId === profileUser.id);

  return (
    <div className="min-h-screen bg-primary-white p-4">
      <BackButton />
      <div className="container mx-auto max-w-4xl">
        <ProfileCard user={profileUser} onFollowToggle={toggleFollow} />
        <ProfileListings products={userProducts} />
      </div>
    </div>
  );
}

export default Profile;