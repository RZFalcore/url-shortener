import React, { useCallback, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import Loader from "../components/Loader/Loader";
import LinkCart from "../components/LinkCart/LinkCart";

const LinkDetailsPage = () => {
  const [link, setLink] = useState(null);
  const { request, loading } = useHttp();
  const params = useParams();
  const { token } = useContext(AuthContext);

  const getLink = useCallback(async () => {
    try {
      console.log(params);
      const fetchedLink = await request(
        `/api/links/${params.id}`,
        "GET",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log(fetchedLink);
      setLink(fetchedLink);
    } catch (error) {}
  }, [request, params.id, token]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) return <Loader />;

  return <>{!loading && link && <LinkCart link={link} />}</>;
};

export default LinkDetailsPage;
