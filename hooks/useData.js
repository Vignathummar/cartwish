import React, { useEffect, useState } from "react";
import apiClient from "../utils/api-client";

const useData = (endpoint, customconfig, deps) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    () => {
      setIsLoading(true);
      apiClient
        .get(endpoint, customconfig)
        .then((res) => {
          if (
            endpoint === "/products" &&
            data &&
            data.products &&
            customconfig.params.page !== 1
          ) {
            setData((prev) => ({
              ...prev,
              products: [...prev.products, ...res.data.products],
            }));
          } else {
            setData(res.data);
          }

          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    },
    deps ? deps : []
  );
  return { data, error, setIsLoading };
};

export default useData;
