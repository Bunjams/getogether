import { GoogleLogin } from "@react-oauth/google";
import { Divider } from "antd";
import Button from "components/Design/Button/Button";
import Input from "components/Design/Input/Input";
import LandingPage from "components/LandingPage/LandingPage";
import { useTokenDecode } from "hooks/useTokenDecode";
import { useNavigate } from "react-router-dom";
import SignInSignUpSide from "static/Image/SignInSignUpSide.svg";

const SignIn = () => {
  const { getDecodedHeader } = useTokenDecode();
  const navigate = useNavigate();
  return (
    <LandingPage>
      <LandingPage.Header />
      <div className="h-[calc(100vh-76px)] flex items-center w-full md:justify-between md:px-16 justify-center">
        <div className="md:mx-44 md:w-96 w-4/5">
          <h2 className="text-h2 pb-3">Create your account</h2>
          <span className="flex gap-4 flex-col">
            <Input
              label="Email address"
              required
              placeholder="johndoe@email.com"
              size="large"
              type="email"
            />
            <Button size="large" type="primary">
              Continue
            </Button>
          </span>
          <Divider className="my-6">or</Divider>
          <div className="w-full justify-center items-center flex flex-col gap-4">
            <GoogleLogin
              theme="outline"
              locale="en"
              size="large"
              onSuccess={(credentialResponse) => {
                const user = getDecodedHeader({
                  token: credentialResponse.credential,
                });

                localStorage.setItem("user", JSON.stringify(user));
                navigate("/otp");
              }}
              onError={() => {
                console.log("Login Faied");
              }}
              useOneTap
            />
            <span className="text-body-regular">
              Don't have an account yet?
              <Button type="link">Sign Up</Button>
            </span>
          </div>
        </div>
        <img
          src={SignInSignUpSide}
          alt="SignInSignUpSide"
          className="md:block hidden"
        />
      </div>
    </LandingPage>
  );
};

export default SignIn;
