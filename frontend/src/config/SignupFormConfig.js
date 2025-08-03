const getFormConfig = (isLogin) => {
  if (isLogin) {
    return {
      heading: "Welcome back",
      headingColor: "text-[#e0def4]",
      subtext: "Join our community and connect instantly.",
      subtextColor: "text-[#c3cdfd]",
      buttonText: "Sign in",
      promptText: "Don't have an account?",
      promptButtonText: "Signup",
    };
  } else {
    return {
      heading: "Create your account",
      headingColor: "text-[#e0def4]",
      subtext: "Join our community and connect instantly.",
      subtextColor: "text-[#c3cdfd]",
      inputs: [
        { label: "Email", type: "email", placeholder: "your@email.com" },
        { label: "Password", type: "password", placeholder: "Create a password" },
      ],
      buttonText: "Sign up",
      promptText: "Already have an account?",
      promptButtonText: "Login",
    };
  }
};

export default getFormConfig;
