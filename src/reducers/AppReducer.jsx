const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };

    case "REMOVE_USER":
      return { ...state, user: {} };

    case "SET_COMPANIES":
      return { ...state, companies: [...action.payload] };

    case "ADD_COMPANY":
      return { ...state, companies: [...state.companies, action.payload] };

    case "EDIT_COMPANY":
      var tempComps = state.companies;
      tempComps = tempComps?.map((item) => {
        if (item?._id === action.payload.id) return action.payload.company;
        return item;
      });

      return { ...state, companies: tempComps };

    case "DELETE_COMPANY":
      return {
        ...state,
        companies: state.companies.filter(
          (item) => item._id !== action.payload
        ),
      };

    case "SET_JOBS":
      return { ...state, jobs: [...action.payload] };

    case "ADD_JOB":
      return { ...state, jobs: [...state.jobs, action.payload] };

    case "EDIT_JOB":
      var tempJobs = state.jobs;
      tempJobs = tempJobs.map((item) => {
        if (item?._id === action.payload.id) return action.payload.job;
        return item;
      });

      return { ...state, jobs: tempJobs };

    case "DELETE_JOB":
      return {
        ...state,
        jobs: state.jobs.filter((item) => item._id !== action.payload),
      };

    case "SET_APPLICATIONS":
      return { ...state, applications: [...action.payload] };

    case "ADD_APPLICATION":
      return {
        ...state,
        applications: [...state.applications, action.payload],
      };

    case "SET_BOOKMARKS":
      return { ...state, bookmarks: [...action.payload] };

    case "ADD_BOOKMARK":
      return { ...state, bookmarks: [...state.bookmarks, action.payload] };

    case "REMOVE_BOOKMARK":
      return {
        ...state,
        bookmarks: state.bookmarks.filter(
          (item) => item?._id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default AppReducer;
