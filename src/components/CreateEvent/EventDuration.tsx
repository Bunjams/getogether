import { Avatar, RadioChangeEvent } from "antd";
import AnimatedPage from "components/Design/AnimatedPage/AnimatedPage";
import Button from "components/Design/Button/Button";
import DatePciker from "components/Design/DatePicker/DatePicker";
import DateRangePicker from "components/Design/DatePicker/DateRangePicker";
import Input from "components/Design/Input/Input";
import Label from "components/Design/Label/Label";
import RadioButton from "components/Design/Radio/RadioButton";
import RadioGroup from "components/Design/Radio/RadioGroup";
import { EVENT_IMG_LINK } from "dictionaries";
import { Form, Formik, useFormikContext } from "formik";
import { addEventSchema } from "FormSchema/addEventSchema";
import { motion } from "framer-motion";
import useDocumentTitle from "hooks/useDocumentTitle";
import { useToast } from "hooks/useNotification";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import randomBytes from "randombytes";
import { useLocation, useNavigate } from "react-router-dom";
import CreateEventImg from "static/Image/CreateEventStep2.png";
import { useGetEventByIdQuery, useUpdateEventMutation } from "store/api/event";
import { BackendError } from "types/utils/backendError";

type EventType = {
  eventName: string;
  venue: string;
  startDate: string;
  endDate: string;
  id: string;
};

type Event = { duration: string; date: string; eventList: EventType[] };

const MultiDayEvent = ({ title, index }: { title: string; index: number }) => {
  const { values, setFieldValue, handleChange } = useFormikContext<Event>();
  const { eventList } = values;

  const handleDateChange = (dateStrings: [string, string]) => {
    const [startDate, endDate] = dateStrings;
    setFieldValue(`eventList.${index}.startDate`, startDate);
    setFieldValue(`eventList.${index}.endDate`, endDate);
  };

  const onRemove = () => {
    if (eventList.length === 1) {
      return;
    }
    setFieldValue(
      "eventList",
      eventList.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="flex flex-col gap-3 border border-solid border-neutral-100 p-4 rounded">
      <h5 className="text-h5-medium text-neutral-900 flex justify-between">
        {title}

        {eventList.length > 1 && (
          <button
            className="all:unset cursor-pointer text-red-600"
            onClick={onRemove}
          >
            <Trash2 size={20} color="currentColor" />
          </button>
        )}
      </h5>
      <Input
        name={`eventList.${index}.eventName`}
        placeholder="Enter event name"
        label="Event Name"
        required
        size="large"
        onChange={handleChange}
      />
      <Input
        name={`eventList.${index}.venue`}
        placeholder="Location"
        label="Venue"
        required
        size="large"
        onChange={handleChange}
      />
      <DateRangePicker
        required
        label="Event date"
        size="large"
        onChange={(_, dateRange) => handleDateChange(dateRange)}
        name="eventDate"
      />
    </div>
  );
};

const MultiDayEventCards = () => {
  const { values, setFieldValue } = useFormikContext<Event>();
  const { eventList } = values;

  const onAddMore = () => {
    setFieldValue("eventList", [
      ...eventList,
      {
        eventName: "",
        venue: "",
        startDate: "",
        endDate: "",
        id: randomBytes(10).toString("hex"),
      },
    ]);
  };

  return (
    <div className="flex gap-8 flex-col">
      {eventList.map(({ id }, i) => {
        return <MultiDayEvent key={id} title={`Event ${i + 1}`} index={i} />;
      })}
      <div className="mr-auto">
        <Button onClick={onAddMore} className="flex items-center gap-1">
          <Plus size={14} color="currentColor" /> Add sub event
        </Button>
      </div>
    </div>
  );
};

const Duration = () => {
  const { setFieldValue, handleChange } = useFormikContext<Event>();

  const onChange = (e: RadioChangeEvent) => {
    setFieldValue("date", "");
    setFieldValue("eventList", [
      {
        eventName: "",
        venue: "",
        startDate: "",
        endDate: "",
        id: randomBytes(10).toString("hex"),
      },
    ]);
    handleChange(e);
  };

  return (
    <RadioGroup
      size="middle"
      defaultValue="SINGLE_DAY"
      label="Duration"
      name="duration"
      onChange={onChange}
    >
      <RadioButton value="SINGLE_DAY">Single day</RadioButton>
      <RadioButton value="MULTI_DAY">Multi day</RadioButton>
    </RadioGroup>
  );
};
const EventConsole = () => {
  const navigate = useNavigate();
  const { alert } = useToast();
  const [updateEvent] = useUpdateEventMutation();
  const location = useLocation();
  const { eventId } = location.state || {};
  const { data } = useGetEventByIdQuery({ eventId }, { skip: !eventId });
  const { type } = data || {};

  const onCreateEvent = async ({ date, duration, eventList }: Event) => {
    const multiEvent = duration === "MULTI_DAY";
    const firstDate = eventList[0].startDate;
    const lastDate = eventList[eventList.length - 1].endDate;

    const payload = multiEvent
      ? {
          eventId,
          startDate: firstDate,
          endDate: lastDate,
          multiEvent,
          subeventDetails: eventList.map((event) => ({
            name: event.eventName,
            start_date: event.startDate,
            end_date: event.endDate,
            venue: {
              name: event.venue,
              address: {
                street_address: "",
                city: "",
                state: "",
                zipcode: "",
                country: "",
              },
            },
          })),
        }
      : {
          eventId,
          startDate: date,
          endDate: date,
          multiEvent,
        };

    try {
      await updateEvent({
        ...payload,
      }).unwrap();
      navigate("/create-event/invite-co-hosts", { state: { eventId: null } });
    } catch (error) {
      alert({ message: (error as BackendError).data.error.message });
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
          duration: "SINGLE_DAY",
          date: "",
          eventList: [
            {
              eventName: "",
              venue: "",
              startDate: "",
              endDate: "",
              id: randomBytes(10).toString("hex"),
            },
          ],
        }}
        onSubmit={onCreateEvent}
        validateOnChange
        validationSchema={addEventSchema}
      >
        {({
          isSubmitting,
          submitForm,
          values: { duration },
          setFieldValue,
          isValid,
        }) => {
          return (
            <Form className="flex flex-col gap-4 h-full">
              <div className="flex flex-col gap-1">
                <h3 className="text-h3 text-neutral-900">
                  Let's add more details
                </h3>
                <p className="text-body-regular text-neutral-800">
                  Fill ot details to personalize it more.
                </p>
              </div>

              <div>
                <Label>Cover Image</Label>
                <Avatar
                  src={EVENT_IMG_LINK[type as keyof typeof EVENT_IMG_LINK]}
                  className="h-48 w-full object-cover rounded-lg"
                />
              </div>
              <Duration />
              {duration === "SINGLE_DAY" ? (
                <DatePciker
                  label="Event date"
                  size="large"
                  onChange={(_, date) => setFieldValue("date", date)}
                  name="date"
                />
              ) : (
                <MultiDayEventCards />
              )}
              <div className="ml-auto mt-auto">
                <Button
                  type="primary"
                  size="large"
                  disabled={isSubmitting || !isValid}
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

const EventDuration = () => {
  useDocumentTitle("Event Duration");
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

export default EventDuration;
