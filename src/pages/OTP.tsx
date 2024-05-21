import Button from "components/Design/Button/Button";
import InputOTP from "components/Design/InputOTP/InputOTP";
import Label from "components/Design/Label/Label";
import LandingPage from "components/LandingPage/LandingPage";
import SignInSignUpSide from "static/Image/SignInSignUpSide.svg";

const OTP = () => {
  return (
    <LandingPage>
      <LandingPage.Header />
      <div className="h-[calc(100vh-76px)] flex items-center w-full md:justify-between md:px-16 justify-center">
        <div className="md:mx-44 md:w-96 w-4/5">
          <h2 className="text-h2 pb-3">Verification Required</h2>
          <span className="flex gap-4 flex-col">
            <span className="flex flex-col gap-1">
              <Label>Enter OTP</Label>
              <InputOTP
                formatter={(str) => str.replace(/[^0-9]/g, "")}
                onChange={(e) => console.log(e)}
                length={6}
                inputMode="numeric"
                prefix="otp"
                prefixCls="otp"
              />
            </span>
            <Button size="large" type="primary">
              Continue
            </Button>
            <span className="text-body-regular">
              Didn't receive an OTP?
              <Button type="link">Resend</Button>
            </span>
          </span>
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

export default OTP;
