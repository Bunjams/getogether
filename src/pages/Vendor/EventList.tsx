import AnimatedPage from "components/Design/AnimatedPage/AnimatedPage";
import Async from "components/Design/Async/Async";
import EmptyScreen from "components/Design/EmptyScreen/EmptyScreen";
import Header from "components/Design/Header/Header";
import PageLayout from "components/Design/PageLayout/PageLayout";
import VendorEventsTable from "components/VendorEvent/VendorEventsTable";
import useDocumentTitle from "hooks/useDocumentTitle";
import VendorListEmpty from "static/Image/VendorListEmpty.png";

const EventList = () => {
  useDocumentTitle("Event");

  //   TODO: add API
  const isLoading = false;
  const isSuccess = true;
  const isEmpty = false;

  return (
    <AnimatedPage animation="fade" className="flex w-full flex-col gap-2">
      <Async.Root isEmpty={isEmpty} isLoading={isLoading} isSuccess={isSuccess}>
        <Async.Empty>
          <EmptyScreen
            img={VendorListEmpty}
            // TODO: copy changes
            title="No event yet!"
            subtitle="Track your event"
            noAction
          />
        </Async.Empty>
        <Async.Success>
          <PageLayout header={<Header title="Event" />}>
            <VendorEventsTable />
          </PageLayout>
        </Async.Success>
      </Async.Root>
    </AnimatedPage>
  );
};

export default EventList;
