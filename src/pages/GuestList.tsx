import AnimatedPage from "components/Design/AnimatedPage/AnimatedPage";
import Async from "components/Design/Async/Async";
import Button from "components/Design/Button/Button";
import GuestTable from "components/GuestList/GuestTable";
import useDocumentTitle from "hooks/useDocumentTitle";
import { Link } from "react-router-dom";
import GuestListEmpty from "static/Image/GuestListEmpty.png";

const GuestList = () => {
  useDocumentTitle("Getogether");
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatedPage
      variants={sectionVariants}
      className="flex items-center w-full justify-center flex-col gap-2"
    >
      <Async.Root isEmpty={true} isLoading={false} isSuccess={true}>
        <Async.Empty>
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
        </Async.Empty>
        <Async.Success>
          <GuestTable />
        </Async.Success>
      </Async.Root>
    </AnimatedPage>
  );
};

export default GuestList;
