import { MobileOutlined, UserOutlined } from "@ant-design/icons";
import AnimatedPage from "components/Design/AnimatedPage/AnimatedPage";
import Button from "components/Design/Button/Button";
import Input from "components/Design/Input/Input";
import Label from "components/Design/Label/Label";
import { UploadAvatar } from "components/Design/Upload/Upload";
import OnboardingLayout from "components/Onboarding/OnboardingLayout";
import { Form, Formik } from "formik";
import useDocumentTitle from "hooks/useDocumentTitle";
import { useToast } from "hooks/useNotification";
import { LoaderCircle } from "lucide-react";
import { Suspense, lazy, memo } from "react";
import { useNavigate } from "react-router-dom";
import UserProfileSetup from "static/Image/UserProfileSetup.jpg";
import { useUpdateUserMutation } from "store/api/userProfile";
import { BackendError } from "types/utils/backendError";

const OnbordingSideImage = lazy(
  () => import("components/Onboarding/OnbordingSideImage")
);

const MemoImg = memo(OnbordingSideImage);

const ProfileSetup = () => {
  useDocumentTitle("Profile Setup");
  const navigate = useNavigate();
  const [addUserData] = useUpdateUserMutation();
  const { alert } = useToast();

  const handleAddUserData = async ({
    mobile,
    name,
    profile_url,
  }: {
    name: string;
    mobile: string;
    profile_url: string | null;
  }) => {
    // TODO: ask vikas for profile_url key
    try {
      const user = await addUserData({
        mobile,
        name,
        profile_url,
      }).unwrap();
      localStorage.setItem("authUser", JSON.stringify(user));
      navigate("/persona", { replace: true });
    } catch (error) {
      alert({ message: (error as BackendError).data.error.message });
    }
  };

  return (
    <AnimatedPage>
      <OnboardingLayout>
        <OnboardingLayout.Header />
        <OnboardingLayout.Content>
          <div className="md:mx-44 md:w-96 w-4/5 flex gap-4 flex-col">
            <span>
              <h2 className="text-h2 m-0">Setup your profile</h2>
              <Label>Fill in some details to get started</Label>
            </span>

            <Formik
              initialValues={{ name: "", profile_url: "", mobile: "" }}
              onSubmit={handleAddUserData}
            >
              {({ isSubmitting, submitForm, handleChange, setFieldValue }) => {
                return (
                  <Form className="flex gap-4 flex-col">
                    <UploadAvatar
                      acceptFileType={{
                        "image/*": [".png", ".jpeg", ".jpg", ".webp", ".avif"],
                      }}
                      onDrop={(acceptedFiles: File[]) =>
                        setFieldValue("profile_url", acceptedFiles[0])
                      }
                    />

                    <Input
                      name="name"
                      label="Full name"
                      required
                      placeholder="John doe"
                      size="large"
                      type="text"
                      onChange={handleChange}
                      prefix={<UserOutlined className="text-neutral-300" />}
                    />

                    <Input
                      label="Phone number"
                      required
                      placeholder="00000 00000"
                      size="large"
                      type="number"
                      name="mobile"
                      onChange={handleChange}
                      prefix={<MobileOutlined className="text-neutral-300" />}
                    />

                    <Button
                      size="large"
                      type="primary"
                      onClick={submitForm}
                      loading={isSubmitting}
                      disabled={isSubmitting}
                    >
                      Continue
                    </Button>
                  </Form>
                );
              }}
            </Formik>
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
    </AnimatedPage>
  );
};

export default ProfileSetup;
