import "./ProfileEditDialogBox.css";
import React, { useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { RxCross2 } from "react-icons/rx";
import { RxCamera } from "react-icons/rx";

export const ProfileEditDialogBox = ({ children, foundUser }) => {
  const formRef = useRef();
  return (
    <Dialog.Root>
      <Dialog.Trigger className="DialogTrigger">{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Edit Your Profile</Dialog.Title>
          <Dialog.Description className="EditDialogDescription">
            <div className="profile">
              <div className="header-bg">
                <img src="https://images.pexels.com/photos/5253574/pexels-photo-5253574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                
                <div className="editBgIcon">
                  <RxCamera />
                </div>

                <div className="profile-avatar editAvatar">
                  <img src={foundUser?.avatar} />
                </div>
                <div className="editAvatarIcon">
                  <RxCamera />
                </div>
              </div>
            </div>
            <form ref={formRef}>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="name">
                  First Name
                </label>
                <input
                  className="Input"
                  name="firstName"
                  placeholder="FirstName"
                  required
                  defaultValue={foundUser?.firstName}
                />
              </fieldset>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="name">
                  Last Name
                </label>
                <input
                  className="Input"
                  name="lastName"
                  placeholder="Last Name"
                  required
                  defaultValue={foundUser?.lastName}
                />
              </fieldset>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="username">
                  Background
                </label>
                <input
                  className="Input"
                  name="bg"
                  placeholder="Background URL"
                  required
                  defaultValue={foundUser?.bg}
                />
              </fieldset>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="username">
                  Avatar
                </label>
                <input
                  className="Input"
                  name="avatar"
                  placeholder="Avatar URL"
                  defaultValue={foundUser?.avatar}
                />
              </fieldset>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="username">
                  Username
                </label>
                <input
                  className="Input"
                  name="username"
                  placeholder="Username"
                  required
                  defaultValue={foundUser?.username}
                />
              </fieldset>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="bio">
                  Bio
                </label>
                <textarea
                  className="Input"
                  name="bio"
                  required
                  defaultValue={foundUser?.bio}
                />
              </fieldset>
              <div
                style={{
                  display: "flex",
                  marginTop: 25,
                  justifyContent: "flex-end",
                }}
              >
                <button className="Button green">Save changes</button>
              </div>
            </form>
          </Dialog.Description>

          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <RxCross2 />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};