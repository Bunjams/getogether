import AnimatedPage from "components/Design/AnimatedPage/AnimatedPage";
import Async from "components/Design/Async/Async";
import Button from "components/Design/Button/Button";
import EmptyScreen from "components/Design/EmptyScreen/EmptyScreen";
import Header from "components/Design/Header/Header";
import PageLayout from "components/Design/PageLayout/PageLayout";
import StatusCard from "components/Design/StatusCard/StatusCard";
import GuestTable from "components/HostGuestList/GuestTable";
import InviteGuest from "components/HostGuestList/InviteGuestModal";
import useDocumentTitle from "hooks/useDocumentTitle";
import { useModal } from "hooks/useModal";
import { useParams } from "react-router-dom";
import GuestListEmpty from "static/Image/GuestListEmpty.png";
import { useGetGuestlistQuery } from "store/api/hostguest";

const GuestList = () => {
  useDocumentTitle("Guest List");
  const { eventId = "" } = useParams<{ eventId: string }>();
  const {
    data = [],
    isLoading,
    isSuccess,
  } = useGetGuestlistQuery({ eventId }, { skip: !eventId });

  const isEmpty = data.length === 0;
  const { close, isOpen, open } = useModal();

  const { accepted, declined, pending } = data.reduce(
    (acc, { status }) => {
      if (status === "INITIATED") {
        acc.pending++;
      } else if (status === "ACCEPTED") {
        acc.accepted++;
      } else if (status === "REJECTED") {
        acc.declined++;
      }
      return acc;
    },
    { pending: 0, accepted: 0, declined: 0 }
  );

  return (
    <AnimatedPage animation="fade" className="flex w-full flex-col gap-2">
      <Async.Root isEmpty={isEmpty} isLoading={isLoading} isSuccess={isSuccess}>
        <Async.Empty>
          <EmptyScreen
            actionText="Invite"
            img={GuestListEmpty}
            onClick={open}
            subtitle="Invite guests and get the party started"
            title="Send invites"
          />
        </Async.Empty>
        <Async.Success>
          <PageLayout
            header={
              <Header
                right={
                  <Button type="primary" size="middle" onClick={open}>
                    Invite
                  </Button>
                }
                title="Guest List"
              />
            }
          >
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-3 gap-6">
                <StatusCard count={accepted} lable="Approved" type="success" />
                <StatusCard
                  count={declined}
                  lable="Declined"
                  type="rejected"
                  animationDir="bottom"
                />
                <StatusCard count={pending} lable="Pending" type="pending" />
              </div>
              <GuestTable />
            </div>
          </PageLayout>
        </Async.Success>
      </Async.Root>
      {isOpen && <InviteGuest isOpen={isOpen} close={close} />}
    </AnimatedPage>
  );
};

export default GuestList;
