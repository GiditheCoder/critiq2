// src/pages/SsoCallback.jsx
import React from "react";
import { RedirectToSignUp } from "@clerk/clerk-react";

const SsoCallback = () => {
  // Clerk will handle the OAuth result and redirect back here.
  // We simply hand control to Clerk.
  return <RedirectToSignUp />;
};

export default SsoCallback;
