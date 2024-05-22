import Button from "components/Design/Button/Button";
import Label from "components/Design/Label/Label";
import OTPInput from "components/Design/OTPInput/OTPInput";
import LandingPage from "components/LandingPage/LandingPage";
import useDocumentTitle from "hooks/useDocumentTitle";
import { useNavigate } from "react-router-dom";
import SignInSignUpSide from "static/Image/SignInSignUpSide.svg";

const OTP = () => {
  useDocumentTitle("OTP Verification");
  const navigate = useNavigate();

  return (
    <LandingPage>
      <LandingPage.Header />
      <LandingPage.Content img={SignInSignUpSide}>
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
      </LandingPage.Content>
    </LandingPage>
  );
};

export default OTP;
