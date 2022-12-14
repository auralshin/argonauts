/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface ProofofReserveInterface extends utils.Interface {
  functions: {
    "auditorChallenge(uint256,address)": FunctionFragment;
    "auditors(address)": FunctionFragment;
    "auditorsArray(uint256)": FunctionFragment;
    "balanceToken()": FunctionFragment;
    "currentEpoch()": FunctionFragment;
    "cwaSignatures(uint256,address,uint256)": FunctionFragment;
    "cwas(address)": FunctionFragment;
    "cwasArray(uint256)": FunctionFragment;
    "getAllSignaures(uint256)": FunctionFragment;
    "getAuditorChallenge(address,uint256)": FunctionFragment;
    "getAuditors()": FunctionFragment;
    "getAuditorsChallenge(uint256)": FunctionFragment;
    "getCWAs()": FunctionFragment;
    "getSignauresForAuditor(uint256,address)": FunctionFragment;
    "getSignauresForCWA(uint256,address)": FunctionFragment;
    "getState(uint256)": FunctionFragment;
    "getTotalSubmittedBalances(uint256)": FunctionFragment;
    "hasAuditorSubmittedBalance(address,uint256)": FunctionFragment;
    "nonceUsed(uint256)": FunctionFragment;
    "numberOfAuditorsAndCWAs()": FunctionFragment;
    "pushChallenge(uint256)": FunctionFragment;
    "stateCount(uint256)": FunctionFragment;
    "submitSignature(bytes[])": FunctionFragment;
    "submitTotalBalance(uint256)": FunctionFragment;
    "totalBalances(uint256,address)": FunctionFragment;
    "totalReserve(uint256)": FunctionFragment;
    "updateEpoch()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "auditorChallenge"
      | "auditors"
      | "auditorsArray"
      | "balanceToken"
      | "currentEpoch"
      | "cwaSignatures"
      | "cwas"
      | "cwasArray"
      | "getAllSignaures"
      | "getAuditorChallenge"
      | "getAuditors"
      | "getAuditorsChallenge"
      | "getCWAs"
      | "getSignauresForAuditor"
      | "getSignauresForCWA"
      | "getState"
      | "getTotalSubmittedBalances"
      | "hasAuditorSubmittedBalance"
      | "nonceUsed"
      | "numberOfAuditorsAndCWAs"
      | "pushChallenge"
      | "stateCount"
      | "submitSignature"
      | "submitTotalBalance"
      | "totalBalances"
      | "totalReserve"
      | "updateEpoch"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "auditorChallenge",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "auditors",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "auditorsArray",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "currentEpoch",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "cwaSignatures",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "cwas",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "cwasArray",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getAllSignaures",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getAuditorChallenge",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getAuditors",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getAuditorsChallenge",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "getCWAs", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getSignauresForAuditor",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getSignauresForCWA",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getState",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalSubmittedBalances",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "hasAuditorSubmittedBalance",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "nonceUsed",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "numberOfAuditorsAndCWAs",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "pushChallenge",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "stateCount",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "submitSignature",
    values: [PromiseOrValue<BytesLike>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "submitTotalBalance",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "totalBalances",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "totalReserve",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateEpoch",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "auditorChallenge",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "auditors", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "auditorsArray",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "balanceToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "currentEpoch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "cwaSignatures",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "cwas", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "cwasArray", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getAllSignaures",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAuditorChallenge",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAuditors",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAuditorsChallenge",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getCWAs", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getSignauresForAuditor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSignauresForCWA",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getState", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getTotalSubmittedBalances",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "hasAuditorSubmittedBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "nonceUsed", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "numberOfAuditorsAndCWAs",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "pushChallenge",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "stateCount", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "submitSignature",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "submitTotalBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalBalances",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalReserve",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateEpoch",
    data: BytesLike
  ): Result;

  events: {};
}

export interface ProofofReserve extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ProofofReserveInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    auditorChallenge(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    auditors(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    auditorsArray(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    balanceToken(overrides?: CallOverrides): Promise<[string]>;

    currentEpoch(overrides?: CallOverrides): Promise<[BigNumber]>;

    cwaSignatures(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    cwas(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    cwasArray(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getAllSignaures(
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string[][]]>;

    getAuditorChallenge(
      _auditor: PromiseOrValue<string>,
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { nonce: BigNumber }>;

    getAuditors(overrides?: CallOverrides): Promise<[string[]]>;

    getAuditorsChallenge(
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]] & { nonces: BigNumber[] }>;

    getCWAs(overrides?: CallOverrides): Promise<[string[]]>;

    getSignauresForAuditor(
      _epoch: PromiseOrValue<BigNumberish>,
      _auditor: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string[]] & { sigs: string[] }>;

    getSignauresForCWA(
      _epoch: PromiseOrValue<BigNumberish>,
      _cwa: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string[]] & { sigs: string[] }>;

    getState(
      epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[number]>;

    getTotalSubmittedBalances(
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]] & { _balances: BigNumber[] }>;

    hasAuditorSubmittedBalance(
      _auditor: PromiseOrValue<string>,
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    nonceUsed(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    numberOfAuditorsAndCWAs(overrides?: CallOverrides): Promise<[BigNumber]>;

    pushChallenge(
      _nonce: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    stateCount(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    submitSignature(
      _sigs: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    submitTotalBalance(
      totalBalance: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    totalBalances(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    totalReserve(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    updateEpoch(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  auditorChallenge(
    arg0: PromiseOrValue<BigNumberish>,
    arg1: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  auditors(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  auditorsArray(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  balanceToken(overrides?: CallOverrides): Promise<string>;

  currentEpoch(overrides?: CallOverrides): Promise<BigNumber>;

  cwaSignatures(
    arg0: PromiseOrValue<BigNumberish>,
    arg1: PromiseOrValue<string>,
    arg2: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  cwas(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  cwasArray(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getAllSignaures(
    _epoch: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string[][]>;

  getAuditorChallenge(
    _auditor: PromiseOrValue<string>,
    _epoch: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getAuditors(overrides?: CallOverrides): Promise<string[]>;

  getAuditorsChallenge(
    _epoch: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  getCWAs(overrides?: CallOverrides): Promise<string[]>;

  getSignauresForAuditor(
    _epoch: PromiseOrValue<BigNumberish>,
    _auditor: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string[]>;

  getSignauresForCWA(
    _epoch: PromiseOrValue<BigNumberish>,
    _cwa: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string[]>;

  getState(
    epoch: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<number>;

  getTotalSubmittedBalances(
    _epoch: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  hasAuditorSubmittedBalance(
    _auditor: PromiseOrValue<string>,
    _epoch: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  nonceUsed(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  numberOfAuditorsAndCWAs(overrides?: CallOverrides): Promise<BigNumber>;

  pushChallenge(
    _nonce: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  stateCount(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  submitSignature(
    _sigs: PromiseOrValue<BytesLike>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  submitTotalBalance(
    totalBalance: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  totalBalances(
    arg0: PromiseOrValue<BigNumberish>,
    arg1: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  totalReserve(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  updateEpoch(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    auditorChallenge(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    auditors(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    auditorsArray(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    balanceToken(overrides?: CallOverrides): Promise<string>;

    currentEpoch(overrides?: CallOverrides): Promise<BigNumber>;

    cwaSignatures(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    cwas(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    cwasArray(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getAllSignaures(
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string[][]>;

    getAuditorChallenge(
      _auditor: PromiseOrValue<string>,
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAuditors(overrides?: CallOverrides): Promise<string[]>;

    getAuditorsChallenge(
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    getCWAs(overrides?: CallOverrides): Promise<string[]>;

    getSignauresForAuditor(
      _epoch: PromiseOrValue<BigNumberish>,
      _auditor: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string[]>;

    getSignauresForCWA(
      _epoch: PromiseOrValue<BigNumberish>,
      _cwa: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string[]>;

    getState(
      epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<number>;

    getTotalSubmittedBalances(
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    hasAuditorSubmittedBalance(
      _auditor: PromiseOrValue<string>,
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    nonceUsed(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    numberOfAuditorsAndCWAs(overrides?: CallOverrides): Promise<BigNumber>;

    pushChallenge(
      _nonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    stateCount(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    submitSignature(
      _sigs: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<void>;

    submitTotalBalance(
      totalBalance: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    totalBalances(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalReserve(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    updateEpoch(overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    auditorChallenge(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    auditors(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    auditorsArray(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    balanceToken(overrides?: CallOverrides): Promise<BigNumber>;

    currentEpoch(overrides?: CallOverrides): Promise<BigNumber>;

    cwaSignatures(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    cwas(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    cwasArray(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAllSignaures(
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAuditorChallenge(
      _auditor: PromiseOrValue<string>,
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAuditors(overrides?: CallOverrides): Promise<BigNumber>;

    getAuditorsChallenge(
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCWAs(overrides?: CallOverrides): Promise<BigNumber>;

    getSignauresForAuditor(
      _epoch: PromiseOrValue<BigNumberish>,
      _auditor: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSignauresForCWA(
      _epoch: PromiseOrValue<BigNumberish>,
      _cwa: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getState(
      epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTotalSubmittedBalances(
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hasAuditorSubmittedBalance(
      _auditor: PromiseOrValue<string>,
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nonceUsed(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    numberOfAuditorsAndCWAs(overrides?: CallOverrides): Promise<BigNumber>;

    pushChallenge(
      _nonce: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    stateCount(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    submitSignature(
      _sigs: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    submitTotalBalance(
      totalBalance: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    totalBalances(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalReserve(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    updateEpoch(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    auditorChallenge(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    auditors(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    auditorsArray(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    balanceToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    currentEpoch(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    cwaSignatures(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    cwas(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    cwasArray(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAllSignaures(
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAuditorChallenge(
      _auditor: PromiseOrValue<string>,
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAuditors(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getAuditorsChallenge(
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCWAs(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getSignauresForAuditor(
      _epoch: PromiseOrValue<BigNumberish>,
      _auditor: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSignauresForCWA(
      _epoch: PromiseOrValue<BigNumberish>,
      _cwa: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getState(
      epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTotalSubmittedBalances(
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    hasAuditorSubmittedBalance(
      _auditor: PromiseOrValue<string>,
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nonceUsed(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    numberOfAuditorsAndCWAs(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    pushChallenge(
      _nonce: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    stateCount(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    submitSignature(
      _sigs: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    submitTotalBalance(
      totalBalance: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    totalBalances(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalReserve(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    updateEpoch(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
