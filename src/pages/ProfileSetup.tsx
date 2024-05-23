import { MobileOutlined, UserOutlined } from "@ant-design/icons";
import Button from "components/Design/Button/Button";
import Input from "components/Design/Input/Input";
import Label from "components/Design/Label/Label";
import { UploadAvatar } from "components/Design/Upload/Upload";
import OnboardingLayout from "components/Onboarding/OnboardingLayout";
import useDocumentTitle from "hooks/useDocumentTitle";
import { LoaderCircle } from "lucide-react";
import { Suspense, lazy, memo } from "react";
import { useNavigate } from "react-router-dom";
import UserProfileSetup from "static/Image/UserProfileSetup.jpg";

const OnbordingSideImage = lazy(
  () => import("components/Onboarding/OnbordingSideImage")
);

const MemoImg = memo(OnbordingSideImage);

const ProfileSetup = () => {
  useDocumentTitle("Profile Setup");
  const navigate = useNavigate();

  return (
    <OnboardingLayout>
      <OnboardingLayout.Header />
      <OnboardingLayout.Content>
        <div className="md:mx-44 md:w-96 w-4/5 flex gap-4 flex-col">
          <span>
            <h2 className="text-h2 m-0">Setup your profile</h2>
            <Label>Fill in some details to get started</Label>
          </span>
          <UploadAvatar
            acceptFileType={{
              "image/*": [".png", ".jpeg", ".jpg", ".webp", ".avif"],
            }}
            onDrop={(acceptedFiles: File[]) => {}}
          />

          <Input
            label="Full name"
            required
            placeholder="John doe"
            size="large"
            type="text"
            prefix={<UserOutlined className="text-neutral-300" />}
          />

          <Input
            label="Phone number"
            required
            placeholder="00000 00000"
            size="large"
            type="number"
            prefix={<MobileOutlined className="text-neutral-300" />}
          />

          <Button
            size="large"
            type="primary"
            onClick={() => navigate("/persona")}
          >
            Continue
          </Button>
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
            img={UserProfileSetup}
            fallbackimg="LFS|B1ngp{tPuOU_ajobipiwjXjX"
          />
        </Suspense>
      </OnboardingLayout.Content>
    </OnboardingLayout>
  );
};

export default ProfileSetup;
