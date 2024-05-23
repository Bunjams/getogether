import Button from "components/Design/Button/Button";
import Label from "components/Design/Label/Label";
import OTPInput from "components/Design/OTPInput/OTPInput";
import OnboardingLayout from "components/Onboarding/OnboardingLayout";
import useDocumentTitle from "hooks/useDocumentTitle";
import { LoaderCircle } from "lucide-react";
import { Suspense, lazy, memo } from "react";
import { useNavigate } from "react-router-dom";
import SignInSignUpSide from "static/Image/SignInSignUpSide.jpg";

const OnbordingSideImage = lazy(
  () => import("components/Onboarding/OnbordingSideImage")
);

const MemoImg = memo(OnbordingSideImage);

const OTP = () => {
  useDocumentTitle("OTP Verification");
  const navigate = useNavigate();

  return (
    <OnboardingLayout>
      <OnboardingLayout.Header />
      <OnboardingLayout.Content>
        <div className="md:mx-44 md:w-96 w-4/5">
          <h2 className="text-h2 pb-3">Verification Required</h2>
          <span className="flex gap-4 flex-col">
            <span className="flex flex-col gap-1">
              <Label>Enter OTP</Label>
              <OTPInput
                formatter={(str) => str.replace(/[^0-9]/g, "")}
                onChange={(e) => console.log(e)}
                length={6}
                inputMode="numeric"
              />
            </span>
            <Button
              size="large"
              type="primary"
              onClick={() => navigate("/profile-setup")}
            >
              Continue
            </Button>
            <span className="text-body-regular">
              Didn't receive an OTP?
              <Button type="link">Resend</Button>
            </span>
          </span>
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

export default OTP;
