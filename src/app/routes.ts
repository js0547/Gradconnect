import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { AuthPage } from "./pages/AuthPage";
import { OnboardingPage } from "./pages/OnboardingPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ProfilePage } from "./pages/ProfilePage";
import { DiscoveryPage } from "./pages/DiscoveryPage";
import { CollaborationPage } from "./pages/CollaborationPage";
import { MentorshipPage } from "./pages/MentorshipPage";
import { RecruiterPage } from "./pages/RecruiterPage";
import { MessagingPage } from "./pages/MessagingPage";
import { Layout } from "./components/Layout";
import React from "react";

function LoginPage() {
  return React.createElement(AuthPage, { mode: "login" });
}

function SignupPage() {
  return React.createElement(AuthPage, { mode: "signup" });
}

function DashboardWithLayout() {
  return React.createElement(Layout, null, React.createElement(DashboardPage));
}

function ProfileWithLayout() {
  return React.createElement(Layout, null, React.createElement(ProfilePage));
}

function DiscoveryWithLayout() {
  return React.createElement(Layout, null, React.createElement(DiscoveryPage));
}

function CollaborateWithLayout() {
  return React.createElement(Layout, null, React.createElement(CollaborationPage));
}

function MentorshipWithLayout() {
  return React.createElement(Layout, null, React.createElement(MentorshipPage));
}

function RecruiterWithLayout() {
  return React.createElement(Layout, null, React.createElement(RecruiterPage));
}

function MessagingWithLayout() {
  return React.createElement(Layout, null, React.createElement(MessagingPage));
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/signup",
    Component: SignupPage,
  },
  {
    path: "/onboarding",
    Component: OnboardingPage,
  },
  {
    path: "/dashboard",
    Component: DashboardWithLayout,
  },
  {
    path: "/profile",
    Component: ProfileWithLayout,
  },
  {
    path: "/discovery",
    Component: DiscoveryWithLayout,
  },
  {
    path: "/collaborate",
    Component: CollaborateWithLayout,
  },
  {
    path: "/mentorship",
    Component: MentorshipWithLayout,
  },
  {
    path: "/recruiter",
    Component: RecruiterWithLayout,
  },
  {
    path: "/messages",
    Component: MessagingWithLayout,
  },
  {
    path: "*",
    Component: LandingPage,
  },
]);
