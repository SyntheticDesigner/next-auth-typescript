import { FormEvent, useRef } from "react";
import classes from "./profile-form.module.css";

interface Props {
  onChangePassword: (passwordData: {
    oldPassword: string;
    newPassword: string;
  }) => void;
}

function ProfileForm(props: Props) {
  const oldPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    //optional: check validity
    // console.log({
    //   oldPassword: enteredOldPassword,
    //   newPassword: enteredNewPassword,
    // });
    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input ref={newPasswordRef} type='password' id='new-password' />
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input ref={oldPasswordRef} type='password' id='old-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
