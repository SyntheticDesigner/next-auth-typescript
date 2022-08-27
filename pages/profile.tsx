import { GetServerSidePropsContext, NextPage } from "next";
import UserProfile from "../components/profile/user-profile";
import { getSession } from "next-auth/client";

const ProfilePage: NextPage = () => {
  return <UserProfile />;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession({ req: context.req });
  //this way if we are not authenticated we are incapable of getting to the profile page
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}

export default ProfilePage;
