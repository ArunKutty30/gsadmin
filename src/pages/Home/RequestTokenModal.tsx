import React from "react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import Modal from "../../components/Modal/Modal";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../utils/firebase";
import toast from "react-hot-toast";
import { useChainId, useNetwork, useSwitchNetwork } from "wagmi";

const initialValues = {
  tokenAddress: "",
  chainId: "",
  image: "",
};

const RequestTokenModal: React.FC<{ isOpen: boolean; handleClose: () => void }> = ({
  isOpen,
  handleClose,
}) => {
  const chainId = useChainId();
  const { chains } = useSwitchNetwork();

  const handleSubmit = async (
    values: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>
  ) => {
    try {
      console.log(values);
      await addDoc(collection(db, "Tokens"), {
        tokenAddress: values.tokenAddress,
        image: values.image,
        approved: true,
        chainId: values.chainId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });

      actions.resetForm();
      toast.success("Token added successfully");
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = Yup.object({
    tokenAddress: Yup.string().required("This field is required"),
    chainId: Yup.string().required("This field is required"),
    image: Yup.string().required("Choose image to proceed"),
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
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <div className="form-input">
                <Field name="tokenAddress" className="primary-input" placeholder="Token Address" />
                <ErrorMessage component={"div"} name="tokenAddress" className="error" />
              </div>
              <div className="form-input">
                <Field
                  as="select"
                  name="chainId"
                  className="primary-input"
                  placeholder="Token Address"
                >
                  <option value={""}>select chain</option>
                  {chains.map((m) => (
                    <option value={m.id}>
                      {m.id} ({m.name})
                    </option>
                  ))}
                </Field>
                <ErrorMessage component={"div"} name="chainId" className="error" />
              </div>
              <div className="form-input">
                <label className="image" htmlFor="image">
                  {values.image ? (
                    <img src={values.image} alt="" style={{ width: "48px", height: "48px" }} />
                  ) : (
                    <div style={{ width: "48px", height: "48px" }}></div>
                  )}
                  <p>Choose image</p>
                </label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept=".png,.jpeg,.jpg,.svg"
                  hidden
                  onChange={(e) => {
                    if (!e.target.files) return;
                    const file = e.target.files[0];

                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function () {
                      console.log(reader.result);
                      setFieldValue("image", reader.result);
                    };
                    reader.onerror = function (error) {
                      console.log("Error: ", error);
                    };
                  }}
                />

                <ErrorMessage component={"div"} name="image" className="error" />
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
