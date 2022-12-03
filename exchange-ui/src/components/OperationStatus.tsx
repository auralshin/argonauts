import { stepStatusKind } from "../services/stepReducer";

function OperationStatus({
  status,
}: {
  status: "PENDING" | "LOADING" | "SUCCESS" | "ERROR";
}) {
  switch (status) {
    case stepStatusKind.PENDING:
      return <small className="text-stone-500">pending</small>;
    case stepStatusKind.LOADING:
      return <small className="text-amber-500">loading...</small>;
    case stepStatusKind.SUCCESS:
      return <small className="text-green-500">success</small>;
    case stepStatusKind.ERROR:
      return <small className="text-red-500">error</small>;
    default:
      return <small className="text-red-500">error</small>;
  }
}

export default OperationStatus;
