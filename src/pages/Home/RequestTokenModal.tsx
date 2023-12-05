import React from "react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import Modal from "../../components/Modal/Modal";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../utils/firebase";
import toast from "react-hot-toast";
import { useChainId } from "wagmi";

const initialValues = {
  tokenAddress: "",
};

const RequestTokenModal: React.FC<{ isOpen: boolean; handleClose: () => void }> = ({
  isOpen,
  handleClose,
}) => {
  const chainId = useChainId();

  const handleSubmit = async (
    values: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>
  ) => {
    try {
      console.log(values);
      await addDoc(collection(db, "Tokens"), {
        tokenAddress: values.tokenAddress,
        approved: true,
        chainId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });

      toast.success("Token added successfully");
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = Yup.object({
    tokenAddress: Yup.string().required("This field is required"),
  });

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <div className="request-token-modal">
        <h3>Add Token To List</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-input">
                <Field name="tokenAddress" className="primary-input" placeholder="Token Address" />
                <ErrorMessage component={"div"} name="tokenAddress" className="error" />
              </div>
              <button disabled={isSubmitting} type="submit" className="btn-primary">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default RequestTokenModal;
