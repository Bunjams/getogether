import Button from "components/Design/Button/Button";
import ImageLazy from "components/Design/Image/ImageLazy";
import Loader from "components/Design/Loader/Loader";
import useDocumentTitle from "hooks/useDocumentTitle";
import EventEmpty from "static/Image/EventEmpty.jpg";
import { useGetUserProfileQuery } from "store/api/userProfile";

const Home = () => {
  useDocumentTitle("Getogether");
  const { data, isLoading } = useGetUserProfileQuery();
  const { profile_url, first_name, last_name } = data || {};

  if (isLoading) {
    return (
      <section className="flex items-center w-full justify-center flex-col">
        <Loader size="large" />
      </section>
    );
  }

  return (
    <section className="flex items-center w-full justify-center flex-col gap-2">
      <ImageLazy
        src={EventEmpty}
        fallbackimg="LLHn1~?1EME@%yx[w|Rj0ftJ-UM-"
        alt="SignInSignUpSide"
        fallbackClassName="rounded-3xl overflow-hidden !w-72 !h-56"
        className="rounded-3xl overflow-hidden w-72 h-56"
      />
      <h4 className="text-h4 font-semibold text-neutral-900">Get Started</h4>
      <p className="text-body-regular text-neutral-900">
        Start by adding your first event.
      </p>
      <Button type="primary" size="large">
        Create Event
      </Button>
    </section>
  );
};

export default Home;
