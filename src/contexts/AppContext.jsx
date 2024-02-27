import React, { createContext, useContext, useEffect, useReducer } from "react";
import AppReducer from "../reducers/AppReducer";
import { toast } from "react-toastify";
import { api } from "../utils/Api";
import { useNavigate } from "react-router-dom";

const Context = createContext();
const initialState = {
  user: {},
  companies: [],
  jobs: [],
  bookmarks: [],
  applications: [],
};

const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const navigate = useNavigate();

  /* AUTHENTICATION */
  const registerUser = async (details) => {
    try {
      const res = await fetch(`${api}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });

      const data = await res.json();
      return data;
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const loginUser = async (details) => {
    try {
      const res = await fetch(`${api}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });

      const data = await res.json();
      return data;
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const updateProfile = async (details) => {
    try {
      const res = await fetch(`${api}/api/user/updateProfile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
        body: JSON.stringify(details),
      });

      const data = await res.json();
      return data;
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("indeed-clone-user");
    navigate("../auth");
    toast.info("You have been logged out", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  /* COMPANIES */
  const fetchCompanies = async () => {
    try {
      const res = await fetch(`${api}/api/company/companies`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success)
        dispatch({ type: "SET_COMPANIES", payload: data.companies });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const addCompany = async (details, setLoading, initialState, setDetails) => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/company/addCompany`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
        body: JSON.stringify({
          ...details,
          strength: parseInt(details.strength),
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Company Added", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setDetails(initialState);
        dispatch({ type: "ADD_COMPANY", payload: data.company });
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  const editCompany = async (
    details,
    setLoading,
    setEdit,
    setDetails,
    initialState,
    id
  ) => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/company/editCompany/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
        body: JSON.stringify(details),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Company Details Updated", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setEdit(false);
        setDetails(initialState);
        dispatch({
          type: "EDIT_COMPANY",
          payload: { company: data.company, id },
        });
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteCompany = async (id) => {
    try {
      const res = await fetch(`${api}/api/company/deleteCompany/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Company Deleted", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        dispatch({
          type: "DELETE_COMPANY",
          payload: id,
        });
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  /* JOBS */
  const fetchJobs = async () => {
    try {
      const res = await fetch(`${api}/api/job/jobs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success) dispatch({ type: "SET_JOBS", payload: data.jobs });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const postJob = async (
    jobDetails,
    skills,
    setJobDetails,
    setLoading,
    initialState
  ) => {
    setLoading(true);
    console.log(jobDetails);
    try {
      const res = await fetch(`${api}/api/job/postJob`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
        body: JSON.stringify({
          ...jobDetails,
          skillsRequired: skills,
          salary: parseInt(jobDetails.salary),
          experience: parseInt(jobDetails.experience),
          jobPosted: new Date().toLocaleString(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Job Posted", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setJobDetails(initialState);
        dispatch({ type: "ADD_JOB", payload: data.job });
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setJobDetails({ ...jobDetails, skillsRequired: "" });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  const editJob = async (id, skills, jobDetails, setLoading) => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/job/editJobPost/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
        body: JSON.stringify({
          ...jobDetails,
          skillsRequired: skills,
          salary: parseInt(jobDetails.salary),
          experience: parseInt(jobDetails.experience),
          jobPosted: new Date().toLocaleString(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Job Details Updated", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        dispatch({ type: "EDIT_JOB", payload: { id, job: data.job } });
        navigate("/");
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id) => {
    try {
      const res = await fetch(`${api}/api/job/deleteJobPost/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Job Post Deleted", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        dispatch({ type: "DELETE_JOB", payload: id });
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  /* APPLY TO JOB */
  const fetchApplications = async () => {
    try {
      const res = await fetch(`${api}/api/application/applications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success)
        dispatch({ type: "SET_APPLICATIONS", payload: data.applications });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const applyToJob = async (
    id,
    applicationDetails,
    skills,
    experience,
    initialState,
    setApplicationDetails,
    setLoading,
    setOpen
  ) => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/application/applyToJob/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
        body: JSON.stringify({ ...applicationDetails, skills, experience }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Application Submitted", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setApplicationDetails(initialState);
        setOpen(false);
        dispatch({ type: "ADD_APPLICATION", payload: data.application });
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  /* BOOKMARK JOB */
  const fetchBookmarks = async () => {
    try {
      const res = await fetch(`${api}/api/user/bookmarks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success)
        dispatch({ type: "SET_BOOKMARKS", payload: data.bookmarks });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const bookmarkJob = async (id) => {
    try {
      const res = await fetch(`${api}/api/user/bookmark/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Job Bookmarked", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        dispatch({
          type: "ADD_BOOKMARK",
          payload: state.jobs.filter((item) => item?._id === id)[0],
        });
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const removeBookmark = async (id) => {
    try {
      const res = await fetch(`${api}/api/user/removeBookmark/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Job removed from bookmarked jobs", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        dispatch({ type: "REMOVE_BOOKMARK", payload: id });
        navigate("../myBookmarks");
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem("indeed-clone-user"));
    if (authUser) dispatch({ type: "SET_USER", payload: authUser });
    else dispatch({ type: "REMOVE_USER" });
  }, [navigate]);

  useEffect(() => {
    fetchCompanies();
    fetchJobs();
    fetchApplications();
    fetchBookmarks();
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        updateProfile,
        handleLogout,
        addCompany,
        editCompany,
        deleteCompany,
        postJob,
        editJob,
        deleteJob,
        applyToJob,
        bookmarkJob,
        removeBookmark,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useGlobalContext = () => useContext(Context);
export { useGlobalContext, AppContext };
