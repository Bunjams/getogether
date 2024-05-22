import { GoogleLogin } from "@react-oauth/google";
import { Divider } from "antd";
import Button from "components/Design/Button/Button";
import Input from "components/Design/Input/Input";
import OnboardingLayout from "components/Onboarding/OnboardingLayout";
import useDocumentTitle from "hooks/useDocumentTitle";
import { useTokenDecode } from "hooks/useTokenDecode";
import { LoaderCircle } from "lucide-react";
import { Suspense, lazy, memo } from "react";
import { useNavigate } from "react-router-dom";
import SignInSignUpSide from "static/Image/SignInSignUpSide.jpg";

const OnbordingSideImage = lazy(
  () => import("components/Onboarding/OnbordingSideImage")
);

const MemoImg = memo(OnbordingSideImage);

const SignUp = () => {
  useDocumentTitle("Sign up");
  const { getDecodedHeader } = useTokenDecode();
  const navigate = useNavigate();

  return (
    <OnboardingLayout>
      <OnboardingLayout.Header />
      <OnboardingLayout.Content>
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
        <Suspense
          fallback={
            <LoaderCircle
              strokeWidth={2}
              className="animate-spin text-red-700"
            />
          }
        >
          <MemoImg
            img={SignInSignUpSide}
            fallbackimg="LZSy%9tko#jGo}cEaLjuuPV[i^j?"
          />
        </Suspense>
      </OnboardingLayout.Content>
    </OnboardingLayout>
  );
};

export default SignUp;
