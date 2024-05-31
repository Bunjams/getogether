import AnimatedPage from "components/Design/AnimatedPage/AnimatedPage";
import Async from "components/Design/Async/Async";
import Button from "components/Design/Button/Button";
import Header from "components/Design/Header/Header";
import PageLayout from "components/Design/PageLayout/PageLayout";
import StatusCard from "components/Design/StatusCard/StatusCard";
import GuestTable from "components/GuestList/GuestTable";
import useDocumentTitle from "hooks/useDocumentTitle";
import { Link, useParams } from "react-router-dom";
import GuestListEmpty from "static/Image/GuestListEmpty.png";
import { useGetGuestlistQuery } from "store/api/guest";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const GuestList = () => {
  useDocumentTitle("Guest List");
  const { eventId = "" } = useParams<{ eventId: string }>();
  const { data = [], isLoading, isSuccess } = useGetGuestlistQuery({ eventId });
  const isEmpty = data.length === 0;

  return (
    <AnimatedPage
      variants={sectionVariants}
      className="flex w-full flex-col gap-2"
    >
      <Async.Root isEmpty={false} isLoading={isLoading} isSuccess={isSuccess}>
        <Async.Empty>
          <section className="flex w-full flex-col gap-2 h-full justify-center items-center">
            <img
              src={GuestListEmpty}
              className="rounded-3xl overflow-hidden w-72 h-56"
              loading="lazy"
            />
            <h4 className="text-h4 font-semibold text-neutral-900">
              Send invites
            </h4>
            <p className="text-body-regular text-neutral-900">
              Invite guests and get the party started
            </p>
            <Link to="/guest-list">
              <Button type="primary" size="large">
                Invite
              </Button>
            </Link>
          </section>
        </Async.Empty>
        <Async.Success>
          <PageLayout
            header={
              <Header
                right={
                  <Button type="primary" size="middle">
                    Invite
                  </Button>
                }
                title="Guest List"
              />
            }
          >
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-3 gap-6">
                <StatusCard count={12} lable="Approved" type="success" />
                <StatusCard
                  count={1}
                  lable="Declined"
                  type="rejected"
                  animationDir="bottom"
                />
                <StatusCard count={2} lable="Pending" type="pending" />
              </div>
              <GuestTable />
            </div>
          </PageLayout>
        </Async.Success>
      </Async.Root>
    </AnimatedPage>
  );
};

export default GuestList;
