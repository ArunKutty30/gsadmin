import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { db } from "../../utils/firebase";

import "./Home.scss";
import toast from "react-hot-toast";
import RequestTokenModal from "./RequestTokenModal";
export interface ITokenData {
  id: string;
  tokenAddress: string;
  approved: boolean;
  chainId: number;
  image: string;
}

const Home = () => {
  const [tokensData, setTokensData] = useState<ITokenData[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleGetData = useCallback(async () => {
    const q = query(collection(db, "Tokens"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const temp: any[] = [];

        snapshot.forEach((doc) => {
          temp.push({ ...doc.data(), id: doc.id });
        });

        setTokensData(temp);
      },
      (error) => console.log(error)
    );

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  const handleApprove = async (docId: string) => {
    try {
      setLoading(true);
      await updateDoc(doc(db, "Tokens", docId), { approved: true });

      toast.success("Approved successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (docId: string) => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, "Tokens", docId));

      toast.success("Token removed successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home pad">
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          className="btn-primary"
          style={{ width: "fit-content" }}
          onClick={() => setOpenModal(true)}
        >
          Add Token
        </button>
      </div>
      <div className="tablewrapper">
        <table>
          <thead>
            <tr>
              <th>S.no</th>
              <th>Logo</th>
              <th>Token Address</th>
              <th>Chain Id</th>
              <th>Actions</th>
            </tr>
          </thead>
          {!tokensData.length ? (
            <tbody>
              <tr>
                <td colSpan={5} align="center">
                  No Data
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {tokensData.map((token, index) => (
                <tr key={token.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={token.image} alt="" style={{ width: "24px", height: "24px" }} />
                  </td>
                  <td>{token.tokenAddress}</td>
                  <td>{token.chainId}</td>
                  <td
                    style={{
                      display: "grid",
                      alignItems: "center",
                      gap: "10px",
                      gridTemplateColumns: "1fr 1fr",
                    }}
                  >
                    {token.approved ? (
                      <>
                        <span>Approved</span>
                      </>
                    ) : (
                      <button disabled={loading} onClick={() => handleApprove(token.id)}>
                        Approve
                      </button>
                    )}
                    <button disabled={loading} onClick={() => handleRemove(token.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <RequestTokenModal isOpen={openModal} handleClose={() => setOpenModal(false)} />
    </div>
  );
};

export default Home;
