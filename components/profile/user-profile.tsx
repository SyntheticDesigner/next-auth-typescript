import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
  // // Client side Redirect away if NOT auth
  // // Wound up using server side.
  // const [isLoading, setIsLoading] = useState(true);
  // // const [loadedSession, setLoadedSession] = useState<Session>(null);
  // //useSession will not give us the latest loading and session data?

  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (!session) {
  //       window.location.href = "/auth";
  //       //if we don't have session then we are not authorized so we redirect to the login page
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, []);

  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  const changePasswordHandler = async (passwordData: {
    oldPassword: string;
    newPassword: string;
  }) => {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
