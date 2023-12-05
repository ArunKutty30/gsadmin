import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useChainId, useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";
import { SWAP_ADDRESS } from "../../utils/address";
import { swapABI } from "../../utils/abis/swapABI";
import { parseEther } from "viem";
import "./Dashboard.scss";
const initialValues = { rewardFee: "" };
const initialValues1 = { fee: "" };

const Dashboard = () => {
  const chainId = useChainId();

  const { data: fee } = useContractRead({
    address: SWAP_ADDRESS[chainId as keyof typeof SWAP_ADDRESS] as any,
    abi: swapABI,
    functionName: "fee",
  });
  const { data: rewardAmount } = useContractRead({
    address: SWAP_ADDRESS[chainId as keyof typeof SWAP_ADDRESS] as any,
    abi: swapABI,
    functionName: "rewardAmount",
  });

  const {
    write,
    isLoading: rewardAmountLoading,
    data: changeRewardData,
  } = useContractWrite({
    address: SWAP_ADDRESS[chainId as keyof typeof SWAP_ADDRESS] as any,
    abi: swapABI,
    functionName: "changeRewardAmount",
  });
  const { isSuccess: changeRewardSuccess } = useWaitForTransaction({
    hash: changeRewardData?.hash,
  });

  const {
    write: feeChangeWrite,
    isLoading: feeChangeLoading,
    data: changeFeeData,
  } = useContractWrite({
    address: SWAP_ADDRESS[chainId as keyof typeof SWAP_ADDRESS] as any,
    abi: swapABI,
    functionName: "changeFee",
  });
  const { isSuccess: changeFeeSuccess } = useWaitForTransaction({
    hash: changeFeeData?.hash,
  });

  useEffect(() => {
    if (changeRewardSuccess) {
      window.location.reload();
    }
    if (changeFeeSuccess) {
      window.location.reload();
    }
  }, [changeRewardSuccess, changeFeeSuccess]);

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      console.log(values);
      write({ args: [parseEther(values.rewardFee as any, "wei")] });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit2 = async (values: typeof initialValues1) => {
    try {
      console.log(values);
      feeChangeWrite({ args: [parseEther(values.fee as any, "wei")] });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-form">
      <Formik
        initialValues={fee ? { rewardFee: fee.toString() } : initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {() => (
          <Form>
            <label htmlFor="rewardFee">Reward Fee</label>
            <Field name="rewardFee" id="rewardFee" className="primary-input" />
            <button disabled={rewardAmountLoading} className="btn-primary" type="submit">
              Update Reward Fee
            </button>
          </Form>
        )}
      </Formik>
      <Formik
        initialValues={rewardAmount ? { fee: rewardAmount.toString() } : initialValues1}
        onSubmit={handleSubmit2}
        enableReinitialize
      >
        {() => (
          <Form>
            <label htmlFor="fee">Fee</label>
            <Field name="fee" id="fee" className="primary-input" />
            <button disabled={feeChangeLoading} className="btn-primary" type="submit">
              Update Fee
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Dashboard;
