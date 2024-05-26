import classNames from "classnames";
import Button from "components/Design/Button/Button";
import Input from "components/Design/Input/Input";
import TextArea from "components/Design/TextArea/TextArea";
import { Form, Formik, useFormikContext } from "formik";
import { useToast } from "hooks/useNotification";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import CreateEventImg from "static/Image/CreateEvent.png";
import { motion } from "framer-motion";

const eventList = [
  "WEDDING",
  "PARTY",
  "BIRTHDAY",
  "SEMINAR",
  "CONCERT",
  "STANDUP",
  "ENGAGEMENT",
  "OFFICE EVENT",
  "DINNER",
  "LUNCH",
  "BREAKFAST",
  "MIXER",
  "MEETUP",
  "CONFERENCE",
  "WORKSHOP",
  "TRAINING",
];

type Event = { eventType: string; eventName: string; venue: string };

const EventType = ({ event }: { event: string }) => {
  const { values, setFieldValue } = useFormikContext<Event>();
  const { eventType } = values;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setFieldValue("eventType", name);
  };

  const isActive = event === eventType;

  return (
    <label
      className={classNames(
        "rounded-full px-3 py-1 first-letter:uppercase lowercase text-footnote border border-solid w-max cursor-pointer",
        {
          "border-red-200 bg-red-100 text-red-600": isActive,
          "border-neutral-100 bg-neutral-0 text-neutral-700": !isActive,
        }
      )}
      htmlFor={event}
    >
      {event}
      <Input
        type="radio"
        className="hidden"
        name={event}
        id={event}
        onChange={handleChange}
        checked={isActive}
      />
    </label>
  );
};

const EventConsole = () => {
  const { success } = useToast();
  const onCreateEvent = async ({ eventName, eventType, venue }: Event) => {
    try {
      success({
        message: `Event name ${eventName}, Event type ${eventType}, Venue ${venue}`,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className="h-full self-start grid grid-flow-row w-full md:pb-3 md:py-10 md:pl-20 md:pr-32 p-10 gap-12 md:col-span-2 col-span-3">
      <Link to="/" className="flex text-h4 gap-2.5 items-center">
        <ArrowLeft />
        Go Back
      </Link>
      <Formik
        initialValues={{ eventType: "", eventName: "", venue: "" }}
        onSubmit={onCreateEvent}
      >
        {({ isSubmitting, submitForm, handleChange }) => {
          return (
            <Form className="flex flex-col gap-8">
              <div className="flex flex-col gap-1">
                <h3 className="text-h3 text-neutral-900">
                  What kind of event do you wanna host?
                </h3>
                <p className="text-body-regular text-neutral-800">
                  Tell us what kind of event you wanna host so we can prepare a
                  template for you
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h5 className="text-h5 font-bold text-neutral-900">
                  Select from the options below:
                </h5>
                <div className="flex flex-wrap gap-3">
                  {eventList.map((event) => (
                    <EventType event={event} />
                  ))}
                </div>
              </div>

              <div className="flex flex-col self-start gap-4 w-full">
                <h5 className="text-h5 font-bold text-neutral-900">
                  Fill in the following details:
                </h5>
                <Input
                  onChange={handleChange}
                  name="eventName"
                  label="Event Name"
                  required
                  size="large"
                />
                <TextArea
                  onChange={handleChange}
                  label="Venue"
                  name="venue"
                  required
                  size="large"
                  autoSize={{ minRows: 3, maxRows: 3 }}
                />
              </div>

              <div className="ml-auto mt-auto">
                <Button
                  type="primary"
                  size="large"
                  disabled={isSubmitting}
                  onClick={submitForm}
                  loading={isSubmitting}
                  typeof="submit"
                >
                  Continue
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

const CreateEvent = () => {
  const sectionVariants = {
    hidden: { opacity: 0, x: -200 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 200 },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={sectionVariants}
      transition={{ duration: 0.5 }}
      className="grid grid-flow-col w-full justify-between h-screen grid-cols-3"
    >
      <EventConsole />
      <motion.aside className="bg-red-200 h-full items-center px-9 md:flex hidden md:col-span-1">
        <img
          src={CreateEventImg}
          alt="placeholder"
          className="h-auto w-[450px]"
        />
      </motion.aside>
    </motion.section>
  );
};

export default CreateEvent;
