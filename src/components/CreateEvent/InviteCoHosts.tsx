import AnimatedPage from "components/Design/AnimatedPage/AnimatedPage";
import Button from "components/Design/Button/Button";
import Input from "components/Design/Input/Input";
import { ErrorMessage, Form, Formik } from "formik";
import { emailValidation } from "FormSchema/emailValidation";
import { motion } from "framer-motion";
import useDocumentTitle from "hooks/useDocumentTitle";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CreateEventImg from "static/Image/CreateEventStep3.png";

const EventConsole = () => {
  const navigate = useNavigate();

  const onCreateEvent = async () => {
    try {
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="h-max self-start grid grid-flow-row w-full md:pb-3 md:py-10 md:pl-20 md:pr-32 p-10 gap-12 md:col-span-2 col-span-3">
      <button
        className="all:unset flex text-h4 gap-2.5 items-center cursor-pointer h-max"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft />
        Go Back
      </button>
      <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={onCreateEvent}
        validationSchema={emailValidation}
      >
        {({ isSubmitting, submitForm, handleChange, errors: { email } }) => {
          console.log("email:", email);
          return (
            <Form className="flex flex-col gap-4 h-full">
              <div className="flex flex-col gap-1">
                <h3 className="text-h3 text-neutral-900">
                  Invite Co-hosts.
                  <span className="text-h5-regular text-neutral-400">
                    {" "}
                    (Optional)
                  </span>
                </h3>
                <p className="text-body-regular text-neutral-800">
                  Invite others to co-host this event with you.
                </p>
              </div>
              <div className="flex w-full flex-col">
                <div className="flex gap-4 w-full">
                  <Input
                    name="email"
                    onChange={handleChange}
                    status={email ? "error" : undefined}
                    placeholder="Enter event name"
                    label="Co-host email"
                    required
                    size="large"
                  />
                  <div className="self-end">
                    <Button
                      size="large"
                      disabled={isSubmitting}
                      onClick={submitForm}
                      loading={isSubmitting}
                      typeof="submit"
                    >
                      Invite
                    </Button>
                  </div>
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-footnote"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

const InviteCoHosts = () => {
  useDocumentTitle("Invite Co-hosts");
  const sectionVariants = {
    hidden: { opacity: 0, x: -400 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <AnimatedPage
      variants={sectionVariants}
      transition={{ duration: 0.5 }}
      className="grid grid-flow-col w-full justify-between h-screen grid-cols-3 overflow-auto relative"
    >
      <EventConsole />
      <motion.aside className="bg-red-200 h-screen items-center px-9 md:flex hidden md:col-span-1 sticky top-0">
        <img
          src={CreateEventImg}
          alt="placeholder"
          className="h-auto w-[450px]"
        />
      </motion.aside>
    </AnimatedPage>
  );
};

export default InviteCoHosts;
