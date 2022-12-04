/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BigNumber,
  BigNumberish,
  BytesLike,
  ContractReceipt,
} from "ethers";

import { POR__factory } from "../factories";
import { useProvider, useSigner } from "wagmi";
import { useQuery, useMutation } from "@tanstack/react-query";

export default class PORQueries {
  readonly contractAddress: string;
  readonly networkId?: { chainId: number };

  constructor(contractAddress: string, networkId?: number) {
    this.networkId = networkId ? { chainId: networkId } : undefined;
    this.contractAddress = contractAddress;
  }

  useAuditorChallenge = (arg0: BigNumberish, arg1: string) => {
    const provider = useProvider(this.networkId);
    const contract = POR__factory.connect(this.contractAddress, provider);
    return useQuery<string>(
      ["auditorChallenge", "POR", arg0, arg1],
      async () => {
        return await contract.auditorChallenge(arg0, arg1);
      }
    );
  };

  useAuditors = (arg0: string) => {
    const provider = useProvider(this.networkId);
    const contract = POR__factory.connect(this.contractAddress, provider);
    return useQuery<boolean>(["auditors", "POR", arg0], async () => {
      return await contract.auditors(arg0);
    });
  };

  useAuditorsArray = (arg0: BigNumberish) => {
    const provider = useProvider(this.networkId);
    const contract = POR__factory.connect(this.contractAddress, provider);
    return useQuery<string>(["auditorsArray", "POR", arg0], async () => {
      return await contract.auditorsArray(arg0);
    });
  };

  useBalanceToken = () => {
    const provider = useProvider(this.networkId);
    const contract = POR__factory.connect(this.contractAddress, provider);
    return useQuery<string>(["balanceToken", "POR"], async () => {
      return await contract.balanceToken();
    });
  };

  useCurrentEpoch = () => {
    const provider = useProvider(this.networkId);
    const contract = POR__factory.connect(this.contractAddress, provider);
    return useQuery<BigNumber>(["currentEpoch", "POR"], async () => {
      return await contract.currentEpoch();
    });
  };

  useCwaSignatures = (arg0: BigNumberish, arg1: string, arg2: BigNumberish) => {
    const provider = useProvider(this.networkId);
    const contract = POR__factory.connect(this.contractAddress, provider);
    return useQuery<string>(
      ["cwaSignatures", "POR", arg0, arg1, arg2],
      async () => {
        return await contract.cwaSignatures(arg0, arg1, arg2);
      }
    );
  };

  useCwas = (arg0: string) => {
    const provider = useProvider(this.networkId);
    const contract = POR__factory.connect(this.contractAddress, provider);
    return useQuery<boolean>(["cwas", "POR", arg0], async () => {
      return await contract.cwas(arg0);
    });
  };

  useCwasArray = (arg0: BigNumberish) => {
    const provider = useProvider(this.networkId);
    const contract = POR__factory.connect(this.contractAddress, provider);
    return useQuery<string>(["cwasArray", "POR", arg0], async () => {
      return await contract.cwasArray(arg0);
    });
  };

  useGetAllSignaures = (_epoch: BigNumberish) => {
    const provider = useProvider(this.networkId);
    const contract = POR__factory.connect(this.contractAddress, provider);
    return useQuery<string[][]>(
      ["getAllSignaures", "POR", _epoch],
      async () => {
        return await contract.getAllSignaures(_epoch);
      }
    );
  };

  useGetAuditorChallenge = (_auditor: string, _epoch: BigNumberish) => {
    const provider = useProvider(this.networkId);
    const contract = POR__factory.connect(this.contractAddress, provider);
    return useQuery<BigNumber>(
      ["getAuditorChallenge", "POR", _auditor, _epoch],
      async () => {
        return await contract.getAuditorChallenge(_auditor, _epoch);
      }
    );
  };

  useGetAuditorsChallenge = (_epoch: BigNumberish) => {
    const provider = useProvider(this.networkId);
    const contract = POR__factory.connect(this.contractAddress, provider);
    return useQuery<BigNumber[]>(
      ["getAuditorsChallenge", "POR", _epoch],
      async () => {
        return await contract.getAuditorsChallenge(_epoch);
      }
    );
  };

  useGetSignauresForAuditor = (_epoch: BigNumberish, _auditor: string) => {
    const provider = useProvider(this.networkId);
    const contract = POR__factory.connect(this.contractAddress, provider);
    return useQuery<string[]>(
      ["getSignauresForAuditor", "POR", _epoch, _auditor],
      async () => {
        return await contract.getSignauresForAuditor(_epoch, _auditor);
      }
    );
  };

  useGetSignauresForCWA = (_epoch: BigNumberish, _cwa: string) => {
    const provider = useProvider(this.networkId);
    const contract = POR__factory.connect(this.contractAddress, provider);
    return useQuery<string[]>(
      ["getSignauresForCWA", "POR", _epoch, _cwa],
      async () => {
        return await contract.getSignauresForCWA(_epoch, _cwa);
      }
    );
  };

  useGetState = (epoch: BigNumberish) => {
    const provider = useProvider(this.networkId);
    const contract = POR__factory.connect(this.contractAddress, provider);
    return useQuery<number>(["getState", "POR", epoch], async () => {
      return await contract.getState(epoch);
    });
  };

  useNonceUsed = (arg0: BigNumberish) => {
    const provider = useProvider(this.networkId);
    const contract = POR__factory.connect(this.contractAddress, provider);
    return useQuery<boolean>(["nonceUsed", "POR", arg0], async () => {
      return await contract.nonceUsed(arg0);
    });
  };

  useNumberOfAuditorsAndCWAs = () => {
    const provider = useProvider(this.networkId);
    const contract = POR__factory.connect(this.contractAddress, provider);
    return useQuery<BigNumber>(["numberOfAuditorsAndCWAs", "POR"], async () => {
      return await contract.numberOfAuditorsAndCWAs();
    });
  };

  usePushChallenge = (_nonce: BigNumberish) => {
    const { data: signer } = useSigner();
    if (!signer) throw new Error("Signer is not set");
    const contract = POR__factory.connect(this.contractAddress, signer);
    return useMutation<ContractReceipt, Error, { _nonce: BigNumberish }>({
      onMutate: async ({ _nonce }) => {
        const transaction = await contract.pushChallenge(_nonce);
        return transaction.wait();
      },
    });
  };

  useStateCount = (arg0: BigNumberish) => {
    const provider = useProvider(this.networkId);
    const contract = POR__factory.connect(this.contractAddress, provider);
    return useQuery<BigNumber>(["stateCount", "POR", arg0], async () => {
      return await contract.stateCount(arg0);
    });
  };

  useSubmitSignature = (_sigs: BytesLike[]) => {
    const { data: signer } = useSigner();
    if (!signer) throw new Error("Signer is not set");
    const contract = POR__factory.connect(this.contractAddress, signer);
    return useMutation<ContractReceipt, Error, { _sigs: BytesLike[] }>({
      onMutate: async ({ _sigs }) => {
        const transaction = await contract.submitSignature(_sigs);
        return transaction.wait();
      },
    });
  };

  useUpdateEpoch = () => {
    const { data: signer } = useSigner();
    if (!signer) throw new Error("Signer is not set");
    const contract = POR__factory.connect(this.contractAddress, signer);
    return useMutation<ContractReceipt, Error, {}>({
      onMutate: async ({}) => {
        const transaction = await contract.updateEpoch();
        return transaction.wait();
      },
    });
  };

  useVerify = (_votes: boolean[]) => {
    const { data: signer } = useSigner();
    if (!signer) throw new Error("Signer is not set");
    const contract = POR__factory.connect(this.contractAddress, signer);
    return useMutation<ContractReceipt, Error, { _votes: boolean[] }>({
      onMutate: async ({ _votes }) => {
        const transaction = await contract.verify(_votes);
        return transaction.wait();
      },
    });
  };

  useVotes = (arg0: BigNumberish, arg1: string, arg2: string) => {
    const provider = useProvider(this.networkId);
    const contract = POR__factory.connect(this.contractAddress, provider);
    return useQuery<boolean>(["votes", "POR", arg0, arg1, arg2], async () => {
      return await contract.votes(arg0, arg1, arg2);
    });
  };
}
