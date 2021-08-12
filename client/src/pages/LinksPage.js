import React, { useState, useContext, useCallback, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader/Loader";
import LinksList from "../components/LinksList/LinksList";

const LinksPage = () => {
  const [links, setLinks] = useState([]);
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchedLinks = useCallback(async () => {
    try {
      const links = await request("/api/links/", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setLinks(links);
    } catch (error) {
      console.log(error);
    }
  }, [token, request]);

  useEffect(() => {
    fetchedLinks();
  }, [fetchedLinks]);

  if (loading) return <Loader />;
  return <div>{!loading && <LinksList links={links} />}</div>;
};

export default LinksPage;
