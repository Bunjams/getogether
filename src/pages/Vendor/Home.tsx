import AnimatedPage from "components/Design/AnimatedPage/AnimatedPage";
import Async from "components/Design/Async/Async";
import EmptyScreen from "components/Design/EmptyScreen/EmptyScreen";
import Header from "components/Design/Header/Header";
import PageLayout from "components/Design/PageLayout/PageLayout";
import VendorUpcomingEvents from "components/VendorHomePage/VendorUpcomingEvents";
import useDocumentTitle from "hooks/useDocumentTitle";
import VendorListEmpty from "static/Image/VendorListEmpty.png";
import { useGetAllEventForVendorQuery } from "store/api/vendorEvents";

const Home = () => {
  useDocumentTitle("Upcoming events");

  const { data, isLoading, isSuccess } = useGetAllEventForVendorQuery({
    show_upcoming: true,
  });

  const { events } = data || {};
  const isEmpty = events?.length === 0;

  return (
    <AnimatedPage animation="fade" className="flex w-full flex-col gap-2">
      <Async.Root isEmpty={isEmpty} isLoading={isLoading} isSuccess={isSuccess}>
        <Async.Empty>
          <EmptyScreen
            // TODO: image change
            img={VendorListEmpty}
            // TODO: copy changes
            title="No Upcoming events"
            subtitle=""
            noAction
          />
        </Async.Empty>
        <Async.Success>
          <PageLayout header={<Header title="Welcome" />}>
            <VendorUpcomingEvents />
          </PageLayout>
        </Async.Success>
      </Async.Root>
    </AnimatedPage>
  );
};

export default Home;
