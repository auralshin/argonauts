import { operationStatuses } from "../configs/config";

function OperationStatus({
  status,
}: {
  status: "pending" | "loading" | "success" | "error";
}) {
  switch (status) {
    case operationStatuses.pending:
      return <small className="text-stone-500">pending</small>;
    case operationStatuses.loading:
      return <small className="text-amber-500">loading...</small>;
    case operationStatuses.success:
      return <small className="text-green-500">success</small>;
    case operationStatuses.error:
      return <small className="text-red-500">error</small>;

    default:
      return <small>error</small>;
  }
}

export default OperationStatus;
