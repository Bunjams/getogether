import { GoogleLogin } from "@react-oauth/google";
import { Divider } from "antd";
import Button from "components/Design/Button/Button";
import Input from "components/Design/Input/Input";
import LandingPage from "components/LandingPage/LandingPage";
import useDocumentTitle from "hooks/useDocumentTitle";
import { useTokenDecode } from "hooks/useTokenDecode";
import { useNavigate } from "react-router-dom";
import SignInSignUpSide from "static/Image/SignInSignUpSide.svg";

const SignUp = () => {
  useDocumentTitle("Sign up");
  const { getDecodedHeader } = useTokenDecode();
  const navigate = useNavigate();

  return (
    <LandingPage>
      <LandingPage.Header />
      <LandingPage.Content img={SignInSignUpSide}>
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
            <Button
              size="large"
              type="primary"
              onClick={() => navigate("/otp")}
            >
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
              Already have an account?
              <Button type="link" onClick={() => navigate("/login")}>
                Login
              </Button>
            </span>
          </div>
        </div>
      </LandingPage.Content>
    </LandingPage>
  );
};

export default SignUp;
